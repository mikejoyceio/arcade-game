/* Game Sounds
 * howler.js is an audio library for the modern web.
 * It defaults to Web Audio API and falls back to HTML5 Audio.
 * Docs: https://github.com/goldfire/howler.js/
 */

import { Howler } from 'howler';

export const gameMusic = new Howl({
	src: ['src/sounds/music.mp3'],
	loop: true
});

export const gameOver = new Howl({
	src: ['src/sounds/gong.mp3']
});

export const levelUp = new Howl({
	src: ['src/sounds/points.mp3']
});

export const gemCollect = new Howl({
	src: ['src/sounds/gem.mp3']
});

export const playerHit = new Howl({
	src: ['src/sounds/punch.mp3']
});

export const gameSelect = new Howl({
	src: ['src/sounds/blop.mp3']
});


