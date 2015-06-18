/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine is available globally via the Engine variable and it also makes
 * the canvas' context (ctx) object globally available to make writing app.js
 * a little simpler to work with.
 */

var Engine = (function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    // Set the canvas width.
    canvas.width = 707;
    // Set the canvas height.
    canvas.height = 707;
    doc.body.appendChild(canvas);

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         */
        update(dt);
        render();

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
        win.requestAnimationFrame(main);
    }

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
        //reset();
        lastTime = Date.now();
        main();

    }

    /* This function is called by main (our game loop) and itself calls all
     * functions to update the game entities data. A function is also called to check
     * for collisions.
     */
    function update(dt) {
        updateEntities(dt);
        checkCollisions();
    }

    /* This is called by the update function  and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to  the object. Do your drawing in your
     * render methods.
     */
    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
    }

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    function render() {
        /* This array holds the relative URL to the image used
         * for that particular row of the game level.
         */
        var rowImages = [
                'images/water-block.png',   // Top row is water
                'images/grass-block.png',
                'images/stone-block.png',   // Row 1 of 3 of stone
                'images/stone-block.png',   // Row 2 of 3 of stone
                'images/stone-block.png',   // Row 3 of 3 of stone
                'images/stone-block.png',   // Row 1 of 2 of grass
                'images/grass-block.png'    // Row 2 of 2 of grass
            ],
            numRows = 7,
            numCols = 7,
            row, col;

        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* The drawImage function of the canvas' context element
                 * requires 3 parameters: the image to draw, the x coordinate
                 * to start drawing and the y coordinate to start drawing.
                 * We're using our Resources helpers to refer to our images
                 * so that we get the benefits of caching these images, since
                 * we're using them over and over.
                 */
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }


        renderEntities();
    }

    /* This function is called by the render function and is called on each game
     * tick. It's purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    function renderEntities() {

        /* Render Enemies
         * Loop through all of the objects within the allEnemies array and call
         * the render method.
         */
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });

        /* Render player
         * Renders the player on the canvas.
         */
        player.render();

        /* Render gems
         * Loop through all of the objects within the allGems array and call
         * the render method.
         */
        allGems.forEach(function(gem) {
        	gem.render();     
        });

        /* Render stats
         * Renders the stat panel and containing elements at top of canvas
         */
        stats.render();
			
    }

    function checkCollisions() {

			/**
			* Check for the collision of two entities.
			* Function accepts two arguments.
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
    	allEnemies.forEach(function(enemy) {
  			if(collision(player, enemy)) {
  			
						/* Reset the players position.
						 * The Player class can be found in app.js
						 */	
						player.hit();

						/* If the player has more than one life remaining,
						 * call the player.updateLives method and remove a life.
						 * If the player has no more lives remaining, call the 
						 * reset() function.
						 */
						return player.lives > 1 ? player.updateLives('remove', 1) : reset();

  			}
    	});

    	/* Check gem collisions. 
    	 * If there is a collision, call the gem.clear() method to 
    	 * clear the gem from the canvas and call the stats.updateGems 
    	 * to update the gems count and increase the score by 300 points.
    	 */
    	allGems.forEach(function(gem) {
	    	if(collision(player, gem)) {

		    		gem.clear();

		    		stats.updateGems();

	    	}
    	});

    	/* Check goal collisions. 
    	 * If the player gets to the other side, call the updateLevel() function.
    	 */
    	if(player.y == 70) {

					updateLevel();

			}

    }

    /* Update level.
     * This function calls the level.update() method. The Level class can be found in app.js.
     */
    function updateLevel() {

	    	level.update();

    }

    /* Reset the game.  
     * This function calls the level.reset() method. The level class can be found in app.js.
     */
    function reset() {

	     level.reset();

    }
 
   /* Load all the images we know we're going to need to draw our game level
    * Then set the init as the callback method, so that when all the images
    * are loaded the game will start.
    */
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/stat-heart.png',
        'images/stat-gem.png',
        'images/gem-blue.png',
        'images/gem-green.png',
        'images/gem-orange.png',
        'images/char-boy.png'
    ]);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developer's can use it more easily
     * from within their app.js files.
     */
    global.canvas = canvas;
    global.ctx = ctx;
})(this);
