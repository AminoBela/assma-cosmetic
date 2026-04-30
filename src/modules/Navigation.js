/**
 * Navigation Module
 * Responsibility: Sticky nav scroll behavior + mobile menu toggle + light/dark mode detection.
 */

const DEFAULTS = {
  navId: 'main-nav',
  toggleId: 'nav-toggle',
  menuId: 'nav-menu',
  scrolledClass: 'scrolled',
  lightClass: 'nav--light',
  activeClass: 'active',
  openClass: 'open',
  linkSelector: '.nav__link',
  lightSections: '.services-details, .contact', // sections with white background
  scrollThreshold: 50,
};

export default class Navigation {
  /**
   * @param {Partial<typeof DEFAULTS>} options
   */
  constructor(options = {}) {
    this.config = { ...DEFAULTS, ...options };
    this.nav = document.getElementById(this.config.navId);
    this.toggle = document.getElementById(this.config.toggleId);
    this.menu = document.getElementById(this.config.menuId);
    this._lightSections = [];
  }

  init() {
    if (!this.nav || !this.toggle || !this.menu) return this;

    this._lightSections = [...document.querySelectorAll(this.config.lightSections)];

    this._bindScrollBehavior();
    this._bindToggle();
    this._bindLinkClose();

    return this;
  }

  _bindScrollBehavior() {
    const onScroll = () => {
      const scrollY = window.scrollY;

      // Sticky background
      this.nav.classList.toggle(this.config.scrolledClass, scrollY > this.config.scrollThreshold);

      // Light/dark detection based on which section is under the nav
      this._updateNavTheme();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Run once on init to set correct state
    onScroll();
  }

  _updateNavTheme() {
    const navBottom = this.nav.getBoundingClientRect().bottom;

    const isOverLight = this._lightSections.some(section => {
      const rect = section.getBoundingClientRect();
      return rect.top < navBottom && rect.bottom > 0;
    });

    this.nav.classList.toggle(this.config.lightClass, isOverLight);
    this.nav.classList.toggle('nav--dark', !isOverLight);
  }

  _bindToggle() {
    this.toggle.addEventListener('click', () => {
      const isOpen = this.menu.classList.toggle(this.config.openClass);
      this.toggle.classList.toggle(this.config.activeClass, isOpen);
      this.toggle.setAttribute('aria-expanded', String(isOpen));
      this.toggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  _bindLinkClose() {
    this.menu.querySelectorAll(this.config.linkSelector).forEach(link => {
      link.addEventListener('click', () => this._closeMenu());
    });
  }

  _closeMenu() {
    this.toggle.classList.remove(this.config.activeClass);
    this.menu.classList.remove(this.config.openClass);
    document.body.style.overflow = '';
  }
}
