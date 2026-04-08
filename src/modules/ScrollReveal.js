/**
 * ScrollReveal Module
 * Responsibility: Observe elements entering the viewport and add a visibility class.
 * Uses IntersectionObserver for performant scroll-based reveals.
 */

const DEFAULTS = {
  selector: '.reveal-text, .reveal-fade, .reveal-slide, .reveal-scale',
  excludeSelector: '.hero',
  visibleClass: 'visible',
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px',
};

export default class ScrollReveal {
  /**
   * @param {Partial<typeof DEFAULTS>} options
   */
  constructor(options = {}) {
    this.config = { ...DEFAULTS, ...options };
    this._observer = null;
  }

  init() {
    const elements = this._getElements();
    if (!elements.length) return this;

    this._observer = new IntersectionObserver(
      (entries) => this._onIntersect(entries),
      {
        threshold: this.config.threshold,
        rootMargin: this.config.rootMargin,
      }
    );

    elements.forEach(el => this._observer.observe(el));

    return this;
  }

  /**
   * Collect all revealable elements, excluding those inside the hero
   * (which are revealed by the Loader module instead).
   */
  _getElements() {
    const all = document.querySelectorAll(this.config.selector);
    const excludeContainer = document.querySelector(this.config.excludeSelector);

    return Array.from(all).filter(el => {
      return !excludeContainer || !excludeContainer.contains(el);
    });
  }

  _onIntersect(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add(this.config.visibleClass);
        this._observer.unobserve(entry.target);
      }
    });
  }

  /** Disconnect the observer (useful for cleanup / SPA navigation). */
  destroy() {
    this._observer?.disconnect();
    this._observer = null;
  }
}
