/**
 * @file Enemies
 * @author Mike Joyce [hello@mikejoyce.io]
 */

import Constants from 'Constants';
import * as Helpers from 'helpers'
import { Enemy } from 'enemy';
import { Game } from 'game';

/**
 * @class Enemies - spawns and removes enemies from Engine.canvas
 * @constructor
 */
export const Enemies = function() {

   /**
    * Enemies generated are pushed into this array
    * before being pushed into the global allEnemies array
    */
  this.enemiesArray = [];

};

/**
 * spawn - spawn enemies on Engine.canvas
 * @memberOf Enemies
 * @param {number} total - total number of enemies to spawn
 */
Enemies.prototype.spawn = function(total) {

  for (let i = 0; i < total; i++) {

    // Call the Helpers.getRandomInt function and set the speed of the enemy.
    const speed = Helpers.getRandomInt(Constants.MIN_SPEED, Constants.MAX_SPEED);

    // Call the Helpers.getRandomInt function and set the players y position on the Engine.canvas.
    const position = Helpers.getRandomInt(0, 3);

    // Instatiate a new enemy object.
    this.enemiesArray[Game.allEnemies.length] = new Enemy(Constants.POSITION_Y[position], speed);

    // Push the new enemy into the allEnemies array.
    Game.allEnemies.push(this.enemiesArray[Game.allEnemies.length]);

  }

};

/**
 * reset - clear all enemies from Engine.canvas
 * @memberOf Enemies
 */
Enemies.prototype.reset = function() {
  const enemyCount = Game.allEnemies.length;
  for (let i = 0; i < enemyCount; i++) {
    Game.allEnemies.splice(i, Game.allEnemies.length);
  }
};
