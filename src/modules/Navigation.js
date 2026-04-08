/**
 * Navigation Module
 * Responsibility: Sticky nav scroll behavior + mobile menu toggle.
 */

const DEFAULTS = {
  navId: 'main-nav',
  toggleId: 'nav-toggle',
  menuId: 'nav-menu',
  scrolledClass: 'scrolled',
  activeClass: 'active',
  openClass: 'open',
  linkSelector: '.nav__link',
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
  }

  init() {
    if (!this.nav || !this.toggle || !this.menu) return this;

    this._bindScrollBehavior();
    this._bindToggle();
    this._bindLinkClose();

    return this;
  }

  _bindScrollBehavior() {
    window.addEventListener('scroll', () => {
      this.nav.classList.toggle(
        this.config.scrolledClass,
        window.scrollY > this.config.scrollThreshold
      );
    }, { passive: true });
  }

  _bindToggle() {
    this.toggle.addEventListener('click', () => {
      const isOpen = this.menu.classList.toggle(this.config.openClass);
      this.toggle.classList.toggle(this.config.activeClass, isOpen);
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
