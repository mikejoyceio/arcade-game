/**
 * @file Player
 * @author Mike Joyce [hello@mikejoyce.io]
 */

import Constants from 'Constants';
import * as SFX from 'sfx';
import { Engine } from 'engine';
import { Resources } from 'resources';
import { Game } from 'game';

/**
 * @class Player - responsible for rendering the player, updating the
 * player's position on the canvas and updating the player's lives.
 * @constructor
 */
export const Player = function() {

  // Set the player's image
  this.sprite = 'dist/images/char-boy.png';

  // Set the player's x position on the canvas
  this.x = Constants.PLAYER_START_X;

  // Set the player's y position on the canvas
  this.y = Constants.PLAYER_START_Y;

  // Set the player's height
  this.height = Constants.ENTITY_HEIGHT;

  // Set the player's width
  this.width = Constants.ENTITY_WIDTH;

  /* Set the player's default lives.
   * The player starts the game with 3.
   */
  this.lives = 3;

};

/**
 * update - update the player's position on Engine.canvas
 * @memberOf Player
 */
Player.prototype.update = function() {
  this.xNow = this.x;
  this.yNow = this.y;
};

/**
 * reset - resets the players position on Engine.canvas
 * @memberOf Player
 */
Player.prototype.reset = function() {
  this.x = Constants.PLAYER_START_X;
  this.y = Constants.PLAYER_START_Y;
};

/**
 * hit - called when the player collides with an enemy
 * @memberOf Player
 */
Player.prototype.hit = function() {
  this.x = Constants.PLAYER_START_X;
  this.y = Constants.PLAYER_START_Y;
  $("#collision").show().fadeOut();
  SFX.playerHit.play();
};

/**
 * updateLives - updates the player's lives
 * @memberOf Player
 * @param  {string} action - add/remove
 * @param  {number} value  - value to add/remove
 */
Player.prototype.updateLives = function(action, value) {

  // Add a life
  if (action === 'add') {
    this.lives = this.lives + value;
  }

  // Remove a life
  if (action === 'remove') {
    this.lives = this.lives - value;
  }

  // Update the lives stats
  Game.stats.updateLives(this.lives);

};

/**
 * render - draw the player on Engine.canvas
 * @memberOf Player
 */
Player.prototype.render = function() {
  Engine.ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * handleInput - handle the left, up, right and down keyboard arrow keys input
 * @memberOf Player
 * @param  {number} key [description]
 */
Player.prototype.handleInput = function(key) {

  /* If the left arrow key is pressed and the
   * player is within the left boundary of the
   * canvas, allow the player to go move left.
   */
  if (key === 'left' && this.x != Constants.LEFT_BOUNDARY) {
   this.x = this.xNow + -Constants.PLAYER_MOVEMENT;
  }

  /* If the up arrow key is pressed and the
   * player is within the top boundary of the
   * canvas, allow the player to move upwards.
   */
  if (key === 'up' && this.y != Constants.TOP_BOUNDARY) {
   this.y = this.yNow + -Constants.PLAYER_MOVEMENT;
  }

  /* If the right arrow key is pressed and the
   * player is within the right boundary of the
   * canvas, allow the player to move right.
   */
  if (key === 'right' && this.x != Constants.RIGHT_BOUNDARY) {
   this.x = this.xNow + Constants.PLAYER_MOVEMENT;
  }

  /* If the down arrow key is pressed and the
   * player is within the bottom boundary of the
   * canvas, allow the player to move down.
   */
  if (key === 'down' && this.y != Constants.BOTTOM_BOUNDARY) {
   this.y = this.yNow + Constants.PLAYER_MOVEMENT;
  }

};
