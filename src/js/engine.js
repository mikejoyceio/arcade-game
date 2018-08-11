/**
 * @file Engine
 * @author Mike Joyce [hello@mikejoyce.io]
 */

import { Game } from './game.js';
import { Resources } from './resources.js';

export const Engine = (function() {

  /**
   * canvas
   * @type {Object}
   */
  var canvas = window.document.createElement('canvas');

  /**
   * Set the canvas width
   * @type {Number}
   */
  canvas.width = 707;

  /**
   * Set the canvas height
   * @type {Number}
   */
  canvas.height = 707;

  /**
   * ctx
   * @type {Object}
   */
  var ctx = canvas.getContext('2d');

  /**
   * lastTime
   * @type {string}
   */
  var lastTime;

  /**
   * Append the canvas
   */
  window.document.body.appendChild(canvas);

  /**
   * main - kickoff point for the game loop itself and handles
   * calling the update and render methods
   */
  function main() {

    /**
     * Get time delta information, which is required for smooth animation.
     * Because computers process instructions at different speeds,
     * we need a constant value that would be the same on every system.
     */

    /**
     * now
     * @type {string}
     */
    var now = Date.now();

    /**
     * deltaTime
     * @type {string}
     */
    var deltaTime = (now - lastTime) / 1000.0;

    /**
     * Call update/render functions
     */
    update(deltaTime);
    render();

    /**
     * Set lastTime, which is used to determine the time delta
     * for the next time this function is called.
     */
    lastTime = now;

    /**
     * Use the browser's requestAnimationFrame function to call this
     * function again as soon as the browser is able to draw another frame.
     */
    window.requestAnimationFrame(main);

  }

  /**
   * init
   */
  function init() {
    lastTime = Date.now();
    main();
  }

  /**
   * update - called by the main function (game loop)
   * @param {string} deltaTime
   */
  function update(deltaTime) {
    updateEntities(deltaTime);
    checkCollisions();
  }

  /**
   * updateEntities - called by the update function
   * @param {string} deltaTime
   */
  function updateEntities(deltaTime) {

    Game.allEnemies.forEach(function(enemy) {
      enemy.update(deltaTime);
    });

    Game.player.update();

  }

  /**
   * render - initially draws the game, then called for every game tick (loop of the engine)
   */
  function render() {

    /**
     * rowImages - holds the relative URLs of the row images
     * @type {Array}
     */
    var rowImages = [
      'dist/images/water-block.png',
      'dist/images/grass-block.png',
      'dist/images/stone-block.png',
      'dist/images/stone-block.png',
      'dist/images/stone-block.png',
      'dist/images/stone-block.png',
      'dist/images/grass-block.png'
    ];

    /**
     * totalRows
     * @type {Number}
     */
    var totalRows = 7;

    /**
     * totalColumns
     * @type {Number}
     */
    var totalColumns = 7;

    /**
     * row
     */
    var row;

    /**
     * column
     */
    var column;

    /* Loop through the number of rows and columns we've defined above
     * and, using the rowImages array, draw the correct image for that
     * portion of the "grid"
     */
    for (row = 0; row < totalRows; row ++) {
      for (column = 0; column < totalColumns; column ++) {

        /**
         * ctx.drawImage
         * @param {string} - URL of image to draw
         * @param {string} - x coordinate
         * @param {string} - y coordinate
         */
        ctx.drawImage(Resources.get(rowImages[row]), column * 101, row * 83);

      }
    }

    /**
     * Call the renderEntities function
     */
    renderEntities();

  }

  /**
   * renderEntities - called by the render function and each game tick
   */
  function renderEntities() {

    /* Render Enemies
     * Loop through all of the objects within the allEnemies array and call
     * the render method.
     */
    Game.allEnemies.forEach(function(enemy) {
      enemy.render();
    });

    /* Render player
     * Renders the player on the canvas.
     */
    Game.player.render();

    /* Render gems
     * Loop through all of the objects within the allGems array and call
     * the render method.
     */
    Game.allGems.forEach(function(gem) {
    	gem.render();
    });

    /* Render stats
     * Renders the stat panel and containing elements at top of canvas
     */
    Game.stats.render();

  }

  /**
   * checkCollisions - determines if game entities have collided
   * @return {[type]} [description]
   */
  function checkCollisions() {

		/**
		* Check for the collision of two entities.
		* Function accepts two arguments.
		*/

    /**
     * collision
     * @param  {string} a - entity a
     * @param  {string} b - entity b
     * @return {boolean}
     */
		function collision(a, b) {
		  return a.x < b.x + b.width &&
		         a.x + a.width > b.x &&
		         a.y < b.y + b.height &&
		         a.y + a.height > b.y;
		}

  	/* Check enemy collisions.
  	 * If there is a collision, reset the player's position
  	 * and update the players lives or reset the game.
  	 */
  	Game.allEnemies.forEach(function(enemy) {

			if (collision(Game.player, enemy)) {

				/* Reset the players position.
				 */
				Game.player.hit();

				/* If the player has more than one life remaining,
				 * call the player.updateLives method and remove a life.
				 * If the player has no more lives remaining, call the
				 * reset() function.
				 */
				return Game.player.lives > 1 ? Game.player.updateLives('remove', 1) : reset();

			}

  	});

  	/* Check gem collisions.
  	 * If there is a collision, call the gem.clear() method to
  	 * clear the gem from the canvas and call the stats.updateGems
  	 * to update the gems count and increase the score by 300 points.
  	 */
  	Game.allGems.forEach(function(gem) {

    	if (collision(Game.player, gem)) {

	    	gem.clear();

	    	Game.stats.updateGems();

    	}

  	});

  	/* Check goal collisions.
  	 * If the player gets to the other side, call the updateLevel() function.
  	 */
  	if (Game.player.y == 70) {

				updateLevel();

		}

  }

  /**
   * updateLevel
   */
  function updateLevel() {

    Game.level.update();

  }

  /**
   * reset
   */
  function reset() {

    Game.level.reset();

  }

  /**
   * Load all of the images required to draw the game, then set init as
   * the callback method, so that once the images are loaded the game
   * will start.
   */
  Resources.load([
    'dist/images/stone-block.png',
    'dist/images/water-block.png',
    'dist/images/grass-block.png',
    'dist/images/enemy-bug.png',
    'dist/images/stat-heart.png',
    'dist/images/stat-gem.png',
    'dist/images/gem-blue.png',
    'dist/images/gem-green.png',
    'dist/images/gem-orange.png',
    'dist/images/char-boy.png'
  ]);
  Resources.onReady(init);

  /**
   * Return public variables
   */
  return {
    canvas,
    ctx
  }

})();
