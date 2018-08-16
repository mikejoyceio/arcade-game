/**
 * @file Overlay
 * @author Mike Joyce [hello@mikejoyce.io]
 */

/**
 * @class Overlay
 * @constructor
 * @param {string} element - id of DOM element
 */
export const Overlay = function(element) {
  this.element = document.getElementById(element);
};

Overlay.prototype.show = function() {
  this.element.style.display = 'block';
};

Overlay.prototype.hide = function() {
  this.element.style.display = 'none';
};

Overlay.prototype.fadeIn = function() {
  this.element.style.opacity = '1';
  setTimeout(()=> {
    this.element.style.display = 'block';
  }, 500)
};

Overlay.prototype.fadeOut = function () {
  this.element.style.opacity = '0';
  setTimeout(()=> {
    this.element.style.display = 'none';
  }, 500)
};
