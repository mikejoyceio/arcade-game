/**
 * @file Stats
 * @author Mike Joyce [hello@mikejoyce.io]
 */

import Constants from 'Constants';
import { Engine } from 'engine';
import { Resources } from 'resources';

/**
 * @class Stats - responsible for rendering, updating and reseting the game statisitcs,
 * namely the current level and score.
 * @constructor
 */
export const Stats = function() {
  this.font = Constants.FONT;
  this.fontColor = Constants.FONT_COLOR;
  this.currentLevel = 1;
  this.currentLives = 3;
  this.currentScore = 0;
  this.currentGems = 0;
};

/**
 * render
 * @memberOf Stats - renders stat bar, level text, score text, lives count and gems count.
 */
Stats.prototype.render = function() {
  Engine.ctx.fillStyle = 'rgba(0,0,0,0.5)';
  Engine.ctx.fillRect(0,50, 707, 45);
  this.level();
  this.score();
  this.lives();
  this.gems();
};

/**
 * level - draws level text
 * @memberOf Stats
 */
Stats.prototype.level = function() {
  Engine.ctx.font = this.font;
  Engine.ctx.fillStyle = this.fontColor;
  Engine.ctx.textAlign = 'start';
  Engine.ctx.fillText('Level '+ this.currentLevel, 10, 82);
};

/**
 * updateLevel - update current level stat
 * @memberOf Stats
 * @param {number} level - current level
 */
Stats.prototype.updateLevel = function(level) {
  this.currentLevel = level;
};

/**
 * score - set current score text
 * @memberOf Stats
 */
Stats.prototype.score = function() {
  Engine.ctx.font = this.font;
  Engine.ctx.fillStyle = this.fontColor;
  Engine.ctx.textAlign = 'end';
  Engine.ctx.fillText(this.currentScore, 700, 82);
};

/**
 * updateScore - update current score stat
 * @memberOf Stats
 */
Stats.prototype.updateScore = function() {
  this.currentScore = this.currentScore + 600;
};

/**
 * lives - draws lives icon & text
 * @memberOf Stats
 */
Stats.prototype.lives = function() {
  Engine.ctx.drawImage(Resources.get(`${Resources.path}/stat-heart.png`), 430, 62);
  Engine.ctx.font = this.font;
  Engine.ctx.fontStyle = this.fontColor;
  Engine.ctx.textAlign = 'start';
  Engine.ctx.fillText('x '+ this.currentLives, 465, 82);
};

/**
 * updateLives - update current lives stat
 * @memberOf Stats
 * @param {number} lives - current number of lives
 */
Stats.prototype.updateLives = function(lives) {
  this.currentLives = lives;
};

/**
 * gems - draws gems icon & text
 * @memberOf Stats
 */
Stats.prototype.gems = function() {
  Engine.ctx.drawImage(Resources.get(`${Resources.path}/stat-gem.png`), 340, 62);
  Engine.ctx.font = this.font;
  Engine.ctx.fontStyle = this.fontColor;
  Engine.ctx.textAlign = 'start';
  Engine.ctx.fillText('x '+ this.currentGems, 370, 82);
};

/**
 * updateGems - update current gem stat
 * @memberOf Stats
 */
Stats.prototype.updateGems = function() {
  this.currentGems++;
  this.currentScore = this.currentScore + 300;
};

/**
 * reset - reset stats
 * @memberOf Stats
 * @return {[type]} [description]
 */
Stats.prototype.reset = function() {
  $('#gameOver #score').html(this.currentScore);
  this.currentScore = 0;
  this.currentGems = 0;
  this.currentLevel = 1;
};
