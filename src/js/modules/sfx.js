/**
 * @file SFX
 * @author Mike Joyce [hello@mikejoyce.io]
 */

/**
 * Howler
 * @external'howler'
 * @see {@link https://www.npmjs.com/package/howler}
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
