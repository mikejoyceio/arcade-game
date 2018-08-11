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

export const track = new Howl({
  src: ['src/sounds/music.mp3'],
  loop: true
});
