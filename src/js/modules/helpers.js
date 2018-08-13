/**
 * @file Helpers
 * @author Mike Joyce [hello@mikejoyce.io]
 */

/**
 * getRandomInt
 * @param  {number} min - minium number to generate
 * @param  {number} max - maximum number to generate
 * @return {number} random integer
 */
export const getRandomInt = function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
