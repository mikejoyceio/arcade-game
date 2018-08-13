/**
 * @file Constants
 * @author Mike Joyce [hello@mikejoyce.io]
 */

/**
* Constants
* @type {Object}
*/
const Constants = {

    // Default canvas text font family
    FONT : '20pt ArcadeClassic',

    // Default canvas text font color
    FONT_COLOR: 'white',

    // Game element height
    ENTITY_HEIGHT : 50,

    // Game element width
    ENTITY_WIDTH : 50,

    // Enemy minimum speed
    MIN_SPEED : 50,

    // Enemy max speed
    MAX_SPEED : 400,

    // Player's start x-position on the canvas
    PLAYER_START_X : 300,

    // Player's start y-position on the canvas
    PLAYER_START_Y : 470,

    // Player movement distance
    PLAYER_MOVEMENT : 50,

    // X position array for game elements
    POSITION_X : [0, 100, 200, 300, 400, 500, 600],

    // Y position array for game elements
    POSITION_Y : [160, 230, 310, 390],

    // Left canvas boundary
    LEFT_BOUNDARY : 0,

    // Top canvas boundary
    TOP_BOUNDARY : 20,

    // Right canvas boundary
    RIGHT_BOUNDARY : 600,

    // Bottom canvas boundary
    BOTTOM_BOUNDARY : 470,

    // Image path
    IMAGE_PATH: 'dist/images',

    // SFX path
    SFX_PATH: 'dist/sfx'

}

export default Constants;
