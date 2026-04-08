/**
 * Loader Module
 * Responsibility: Page loading animation and hero reveal on dismiss.
 */

const DEFAULTS = {
  loaderId: 'page-loader',
  hiddenClass: 'hidden',
  visibleClass: 'visible',
  heroRevealSelector: '.hero .reveal-text, .hero .reveal-scale, .hero .reveal-fade',
  loadDelay: 2000,
  failsafeDelay: 3500,
  staggerMs: 250,
};

export default class Loader {
  /**
   * @param {Partial<typeof DEFAULTS>} options
   */
  constructor(options = {}) {
    this.config = { ...DEFAULTS, ...options };
    this.el = document.getElementById(this.config.loaderId);
    this._dismissed = false;
  }

  init() {
    if (!this.el) return this;

    window.addEventListener('load', () => {
      setTimeout(() => this._dismiss(), this.config.loadDelay);
    });

    // Failsafe: dismiss even if `load` fires late
    setTimeout(() => this._dismiss(), this.config.failsafeDelay);

    return this;
  }

  _dismiss() {
    if (this._dismissed) return;
    this._dismissed = true;

    this.el.classList.add(this.config.hiddenClass);
    this._revealHero();
  }

  _revealHero() {
    const elements = document.querySelectorAll(this.config.heroRevealSelector);
    elements.forEach((el, i) => {
      setTimeout(() => el.classList.add(this.config.visibleClass), i * this.config.staggerMs);
    });
  }
}
