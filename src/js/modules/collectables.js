/**
 * @file Gems
 * @author Mike Joyce [hello@mikejoyce.io]
 */

import Constants from 'Constants';
import * as Helpers from 'helpers'
import { Gem } from 'gem';
import { Game } from 'game';

/**
 * @class Gems - spawns and removes gems from Engine.canvas
 * @constructor
 */
export const Gems = function() {

  /* Gems generated are pushed into this array
   * before being pushed into the global allGems array
   */
  this.gemsArray = [];

};

/**
 * spawn
 * @memberOf Gems
 * @param {number} total - total number of gems to spawn
 */
Gems.prototype.spawn = function(total) {

  for (let i = 0; i < total; i++) {

    // Call the Helpers.getRandomInt function and set the gems x position on the Engine.canvas.
    const positionX = Helpers.getRandomInt(0, 6);

    // Call the Helpers.getRandomInt function and set the gems y position on the Engine.canvas.
    const positionY = Helpers.getRandomInt(0, 3);

    // Instatiate a new gem object.
    this.gemsArray[Game.allGems.length] = new Gem(Constants.POSITION_X[positionX], Constants.POSITION_Y[positionY]);

    // Push the new gem into the allGems array.
    Game.allGems.push(this.gemsArray[Game.allGems.length]);

  }

};

/**
 * reset - clear all gems from Engine.canvas
 * @memberOf Gems
 */
Gems.prototype.reset = function() {
  const gemsCount = Game.allGems.length;
  for (let i = 0; i < gemsCount; i++) {
    Game.allGems.splice(i, Game.allGems.length);
  }
};
