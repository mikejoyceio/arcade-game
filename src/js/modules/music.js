/**
 * @file Music
 * @author Mike Joyce [hello@mikejoyce.io]
 */

/**
 * Howler
 * @external'howler'
 * @see {@link https://www.npmjs.com/package/howler}
 */
import { Howler } from 'howler';
import Constants from 'Constants';

const path = Constants.MUSIC_PATH;

export const track = new Howl({
  src: [`${path}/music.mp3`],
  loop: true
});
