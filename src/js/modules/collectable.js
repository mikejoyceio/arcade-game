/**
 * @file Collectable
 * @author Mike Joyce [hello@mikejoyce.io]
 */

import Constants from 'Constants';
import * as Helpers from 'helpers'
import * as SFX from 'sfx';
import { Engine } from 'engine';
import { Resources } from 'resources';

/**
 * @class Collectable - generates, clears and resets a collectable gem
 * @param {number} positionX - x position of the gem
 * @param {number} positionY - y position of the gem
 */
export const Collectable = function(positionX, positionY) {

  // Include the blue, green and orange gem images in an array
  const gemArray = ['gem-blue.png', 'gem-green.png', 'gem-orange.png'];

  // Set a random gem image from the gemArray
  this.sprite = `${Resources.path}/${gemArray[Helpers.getRandomInt(0,2)]}`;

  // Set the gem's height
  this.height = Constants.ENTITY_HEIGHT;

  // Set the gem's width
  this.width = Constants.ENTITY_WIDTH;

  // Set a the x position of the gem
  this.x = positionX;

  // Set a the y position of the gem
  this.y = positionY;

};

/**
 * render - draw a gem on Engine.canvas. Position is determined by random
 * positions generated from the POSITION_X and POSITION_y constant arrays.
 * @memberOf Gem
 */
Collectable.prototype.render = function() {
  Engine.ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * clear - hide the gem by setting it's x position to a negative value on Engine.canvas
 * @memberOf Gem
 */
Collectable.prototype.clear = function() {

  this.x = -100;

  // Play gem collect sound effect
  SFX.gemCollect.play();

};

/**
 * reset - instantiates a new Gem, which in turn resets it's color and position on Engine.canvas
 * @memberOf Gem
 */
Collectable.prototype.reset = function() {
  collectable = new Collectable();
};
