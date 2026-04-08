/**
 * CustomCursor Module
 * Responsibility: Render a custom decorative cursor with a trailing dot.
 * Only activates on devices with a fine pointer (mouse).
 */

const DEFAULTS = {
  cursorId: 'cursor',
  trailId: 'cursor-trail',
  hoverClass: 'hover',
  hoverTargets: 'a, button, .treatment-card',
  trailLerp: 0.15,  // Interpolation factor for trail smoothness
};

export default class CustomCursor {
  /**
   * @param {Partial<typeof DEFAULTS>} options
   */
  constructor(options = {}) {
    this.config = { ...DEFAULTS, ...options };
    this.cursor = document.getElementById(this.config.cursorId);
    this.trail = document.getElementById(this.config.trailId);

    this._cx = 0;
    this._cy = 0;
    this._tx = 0;
    this._ty = 0;
    this._rafId = null;
  }

  init() {
    if (!this.cursor || !this.trail) return this;
    if (!window.matchMedia('(pointer: fine)').matches) return this;

    this._bindMouseMove();
    this._startTrailLoop();
    this._bindHoverTargets();

    return this;
  }

  _bindMouseMove() {
    document.addEventListener('mousemove', (e) => {
      this._cx = e.clientX;
      this._cy = e.clientY;
      this.cursor.style.left = `${this._cx}px`;
      this.cursor.style.top = `${this._cy}px`;
    });
  }

  _startTrailLoop() {
    const loop = () => {
      this._tx += (this._cx - this._tx) * this.config.trailLerp;
      this._ty += (this._cy - this._ty) * this.config.trailLerp;
      this.trail.style.left = `${this._tx}px`;
      this.trail.style.top = `${this._ty}px`;
      this._rafId = requestAnimationFrame(loop);
    };
    loop();
  }

  _bindHoverTargets() {
    document.querySelectorAll(this.config.hoverTargets).forEach(el => {
      el.addEventListener('mouseenter', () => this.cursor.classList.add(this.config.hoverClass));
      el.addEventListener('mouseleave', () => this.cursor.classList.remove(this.config.hoverClass));
    });
  }

  /** Stop the animation loop (useful for cleanup). */
  destroy() {
    if (this._rafId) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }
  }
}
