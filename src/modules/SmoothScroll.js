/**
 * SmoothScroll Module
 * Responsibility: Intercept anchor links and scroll smoothly with nav offset.
 */

const DEFAULTS = {
  selector: 'a[href^="#"]',
  navId: 'main-nav',
};

export default class SmoothScroll {
  /**
   * @param {Partial<typeof DEFAULTS>} options
   */
  constructor(options = {}) {
    this.config = { ...DEFAULTS, ...options };
  }

  init() {
    document.querySelectorAll(this.config.selector).forEach(anchor => {
      anchor.addEventListener('click', (e) => this._handleClick(e, anchor));
    });

    return this;
  }

  _handleClick(e, anchor) {
    const href = anchor.getAttribute('href');
    if (!href || href === '#') return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    const navHeight = document.getElementById(this.config.navId)?.offsetHeight || 0;

    window.scrollTo({
      top: target.offsetTop - navHeight,
      behavior: 'smooth',
    });
  }
}
