/**
 * Modals Module
 * Handles opening and closing of HTML <dialog> elements.
 */

export default class Modals {
  init() {
    this.triggers = document.querySelectorAll('[data-modal-target]');
    this.modals = document.querySelectorAll('.service-modal');

    this._bindEvents();
    return this;
  }

  _bindEvents() {
    // Open modals
    this.triggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = trigger.getAttribute('data-modal-target');
        const modal = document.getElementById(targetId);
        
        if (modal) {
          const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
          document.body.style.paddingRight = `${scrollbarWidth}px`;
          
          const nav = document.getElementById('main-nav');
          if (nav) nav.style.paddingRight = `${scrollbarWidth}px`;

          document.body.style.overflow = 'hidden';
          modal.setAttribute('open', '');
        }
      });
    });

    // Close modals
    this.modals.forEach(modal => {
      // Close on clicking backdrop or close button
      modal.querySelectorAll('[data-modal-close]').forEach(closer => {
        closer.addEventListener('click', () => {
          modal.removeAttribute('open');
          
          // Wait for CSS transition (0.4s) before restoring overflow
          setTimeout(() => {
            // Check if any modal is still open
            if (!document.querySelector('.service-modal[open]')) {
              document.body.style.overflow = '';
              document.body.style.paddingRight = '';
              const nav = document.getElementById('main-nav');
              if (nav) nav.style.paddingRight = '';
            }
          }, 400);
        });
      });
    });
  }
}
