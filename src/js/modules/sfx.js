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
import Constants from 'Constants';

const path = Constants.SFX_PATH;

export const gameOver = new Howl({
	src: [`${path}/gong.mp3`]
});

export const levelUp = new Howl({
	src: [`${path}/points.mp3`]
});

export const gemCollect = new Howl({
	src: [`${path}/gem.mp3`]
});

export const playerHit = new Howl({
	src: [`${path}/punch.mp3`]
});

export const gameSelect = new Howl({
	src: [`${path}/blop.mp3`]
});
