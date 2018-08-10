/* Game Sounds
 * howler.js is an audio library for the modern web.
 * It defaults to Web Audio API and falls back to HTML5 Audio.
 * Docs: https://github.com/goldfire/howler.js/
 */

import { Howler } from '../../bower_components/howler/howler.js';

export const gameMusic = new Howl({
	urls: ['src/sounds/music.mp3'],
	loop: true
});

export const gameOver = new Howl({
	urls: ['src/sounds/gong.mp3']
});

export const levelUp = new Howl({
	urls: ['src/sounds/points.mp3']
});

export const gemCollect = new Howl({
	urls: ['src/sounds/gem.mp3']
});

export const playerHit = new Howl({
	urls: ['src/sounds/punch.mp3']
});

export const gameSelect = new Howl({
	urls: ['src/sounds/blop.mp3']
});


