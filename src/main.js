/**
 * Main Entry Point — Brows by Assma Cosmetics
 *
 * This file acts as the composition root (Dependency Inversion):
 * it imports concrete modules and wires them together without
 * any of them knowing about each other (loose coupling).
 *
 * Each module follows the Single Responsibility Principle:
 *   - Loader       → page-load animation + hero reveal
 *   - Navigation   → sticky nav + mobile menu
 *   - SmoothScroll → anchor link scrolling
 *   - ScrollReveal → viewport-based element reveals
 *   - CustomCursor → decorative cursor with trail
 */

import './styles/main.css';

import Loader       from './modules/Loader.js';
import Navigation   from './modules/Navigation.js';
import SmoothScroll from './modules/SmoothScroll.js';
import ScrollReveal from './modules/ScrollReveal.js';
import CustomCursor from './modules/CustomCursor.js';

document.addEventListener('DOMContentLoaded', () => {
  new Loader().init();
  new Navigation().init();
  new SmoothScroll().init();
  new ScrollReveal().init();
  new CustomCursor().init();
});
