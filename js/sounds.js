/* Game Sounds
 * howler.js is an audio library for the modern web. 
 * It defaults to Web Audio API and falls back to HTML5 Audio.
 * Docs: https://github.com/goldfire/howler.js/
 */

var gameMusic = new Howl({
	urls: ['sounds/music.mp3'], 
	loop: true 
});

var gameOver = new Howl({ 
	urls: ['sounds/gong.mp3']
});

var levelUp = new Howl({ 
	urls: ['sounds/points.mp3'] 
});

var gemCollect = new Howl({ 
	urls: ['sounds/gem.mp3'] 
});

var playerHit = new Howl({ 
	urls: ['sounds/punch.mp3']
});

var gameSelect = new Howl({ 
	urls: ['sounds/blop.mp3']
});

												    							      