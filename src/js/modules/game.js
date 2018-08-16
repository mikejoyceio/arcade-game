/**
 * @file Game
 * @author Mike Joyce [hello@mikejoyce.io]
 */

/* TODO:
 * - Add leader board
 * - Add pause button
 * - Add bonus lives
 * - Make it tablet & mobile friendly
 */

import Constants from 'Constants';
import { Engine } from 'engine';
import { Player } from 'player';
import { Stats } from 'stats';
import { Enemies } from 'enemies';
import { Collectables } from 'collectables';
import { Level } from 'level';
import * as Helpers from 'helpers'
import * as Music from 'music';
import * as SFX from 'sfx';
import * as Overlays from 'overlays';

export const Game = (function() {

  /**
   * DOM Elements
   */
  const $buttonPlay = document.getElementById('playGame');
  const $buttonPlayAgain = document.getElementById('playAgain');
  const $buttonHowToOpen = document.getElementById('howToOpen');
  const $buttonHowToClose = document.getElementById('howToClose');

  /**
   * Instantiate objects
   * @type {Object}
   */
  const collectables = new Collectables();
  const stats = new Stats();
  const player = new Player();
  const enemies = new Enemies();
  const level = new Level();

  /* Enemies Array.
   * All enemies generated by the Enemies.spawn() method are pushed
   * into this array.
   */
  const allEnemies = [];

  /* Gems Array.
   * All gems generated by the Gems.spawn() method are pushed
   * into this array.
   */
  const allGems = [];

  /* Pause the game by default to prevent the player moving around
   * when arrow keys are pressed. Set to false when the start or
   * game over screens are hidden from view.
   */
  let paused = true;


  $buttonPlay.addEventListener('click', (event) => {

    // Fade intro overlay in
    Overlays.start.fadeOut();

		// Play the select sound effect
		SFX.gameSelect.play();

    // Play background music
    Music.track.play();

    // Adjust background music volume
    Music.track.volume(0.3);

    // Play background music
    Music.track.play();

		// Fade in the game music
		Music.track.fade(0.3, 0.7, 2000);

    // Spawn enemies
    enemies.spawn(2);

    // Spawn collectable gems
    collectables.spawn(2);

		/* Unpause the game to allow the player to move around
		 * when arrow keys are pressed
		 */
    setState('unpause');

	});

  $buttonPlayAgain.addEventListener('click', (event) => {

    // Hide game over overlay
    Overlays.gameOver.hide();

		// Play the select sound effet
		SFX.gameSelect.play();

		// Fade in the game music
		Music.track.fade(0.3, 1.0, 1000);

		/* Unpause the game to allow the player to move around
		 * when arrow keys are pressed
		 */
		setState('unpause');

	});

  $buttonHowToOpen.addEventListener('click', (event) => {

    Overlays.instructions.fadeIn();

		// Play the select sound effect
		SFX.gameSelect.play();

		// Fade out the game music
		Music.track.fade(0.7, 0.3, 2000);

    /* Pause the game to prevent the player from moving around
     * when arrow keys are pressed
     */
    setState('pause');

	});

  $buttonHowToClose.addEventListener('click', (event) => {

    Overlays.instructions.fadeOut();

		// Play the select sound effect
		SFX.gameSelect.play();

		// Fade in the game music
		Music.track.fade(0.3, 0.7, 2000);

    /* Unpause the game to allow the player to move around
     * when arrow keys are pressed
     */
    setState('unpause');

	});

  $('.toggle-music').on('click', function() {

    $(this).toggleClass('on');

		if ($(this).hasClass('on')) {
			Music.track.play();
		} else {
      Music.track.pause();
    }

	});

  function setState(state) {
    if (state === 'pause') {
      paused = true;
    } else {
      paused = false;
    }
  }

  function getState() {
    return paused;
  }

  /**
   * Return public variables/objects
   */
  return {
    allEnemies,
    allGems,
    enemies,
    collectables,
    getState,
    level,
    player,
    setState,
    stats
  }

})();
