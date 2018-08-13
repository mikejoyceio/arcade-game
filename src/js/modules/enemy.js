/**
 * @file Enemy
 * @author Mike Joyce [hello@mikejoyce.io]
 */

import Constants from 'Constants';
import * as Helpers from 'helpers'
import { Engine } from 'engine';
import { Resources } from 'resources';

/**
 * @class Enemy
 * @constructor
 * @param {number} positionY
 * @param {number} speed
 */
export const Enemy = function(positionY, speed) {

  // Set the enemy's image
  this.sprite = 'dist/images/enemy-bug.png';

  // Set a random x position on the canvas
  this.x = Helpers.getRandomInt(-1000, -100);

  // Set the y position. Determined by the positionY argument
  this.y = positionY;

  // Set the enemy's height
  this.height = Constants.ENTITY_HEIGHT;

  // Set the enemy's width
  this.width = Constants.ENTITY_WIDTH;

  // Set the enemy's speed. Determined by the speed argument
  this.speed = speed;

};

/**
 * update - update the enemy's position on Engine.canvas
 * @memberOf Enemy
 * @param {string} deltaTime
 */
Enemy.prototype.update = function(deltaTime) {

  /**
   * Multiply the position and speed the enemy object by delta time
   * to give the illusion of animation.
   */
  this.x = this.x + this.speed * deltaTime;

  /**
   * If the enemy goes off the right most side of the canvas,
   * reset it's position at a random negative position off
   * the left side of Engine.canvas.
  */
  if (this.x > Engine.canvas.width) {
    this.x = Helpers.getRandomInt(-2000, -100);
  }

};

/**
 * render
 * @memberOf Enemy - Draw an enemy on Engine.canvas
 */
Enemy.prototype.render = function() {
  Engine.ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
