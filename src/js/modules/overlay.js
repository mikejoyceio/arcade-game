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
  this.element = $('#' + element);
};

Overlay.prototype.show = function() {
  this.element.show();
};

Overlay.prototype.hide = function() {
  this.element.hide();
};

Overlay.prototype.fadeIn = function() {
  this.element.fadeIn('fast');
};

Overlay.prototype.fadeOut = function () {
  this.element.fadeOut('fast');
};
