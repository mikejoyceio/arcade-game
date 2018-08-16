/**
 * @file Level
 * @author Mike Joyce [hello@mikejoyce.io]
 */

import { Game } from 'game';
import * as Helpers from 'helpers';
import * as Music from 'music';
import * as Overlays from 'overlays';
import * as SFX from 'sfx';

/**
 * @class Level - responsible for keeping track of and reseting the level
 * @constructor
 */
export const Level = function() {
  this.level = 1;
};

/**
 * update - updates the level
 * @memberOf Level
 */
Level.prototype.update = function() {

  // Increase level
  this.level++;

  // Span enemies when the level is divisable by 2
  if (this.level % 2) {
    Game.enemies.spawn(1);
  }

  // Reset gems
  Game.collectables.reset();

  // Spawn a random amount of collectable gems
  Game.collectables.spawn(Helpers.getRandomInt(2,4));

  // Reset player's position
  Game.player.reset();

  // Update level stat
  Game.stats.updateLevel(this.level);

  // Update the score
  Game.stats.updateScore();

  //  Play level up sound
  SFX.levelUp.play();

};

/**
 * reset
 * @memberOf Level
 */
Level.prototype.reset = function() {

  // Reset to level 1
  this.level = 1;

  // Reset player's position
  Game.player.reset();

  // Reset enemies
  Game.enemies.reset();

  // Reset stats
  Game.stats.reset();

  // Update player lives
  Game.player.updateLives('add', 2);

  // Spawn enemies
  Game.enemies.spawn(2);

  // Play game over sound
  SFX.gameOver.play();

  // Fade out the game music slightly
  Music.track.fade(1.0, 0.3, 1000);

  // Pause the game to prevent player movement
  Game.setState('pause');

  // Show game over screen
  Overlays.gameOver.show();

};
