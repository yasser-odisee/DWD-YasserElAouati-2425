/* global Game, Sprite, Preloader */

// DECLARATIONS

// variabelen
let numMisses = 0;
let numHits = 0;
let numBalloons = 20;
let playerWin = undefined;

// DOM
const spnHits = document.querySelector('#hits');
const spnMisses = document.querySelector('#misses');
const spnHighscore = document.querySelector('#highscore');

// create game
const game = new Game('#game');
game.setBackground('img/startscreen.png');

// create sprites and add to game
const sprGround = new Sprite({id: 'ground', url: 'img/ground.png', w: 960, h: 106, x: 480, y: 614});
const sprClouds = new Sprite({id: 'clouds', url: 'img/clouds.png', w: 300, h: 83, x: 480, y: 20});
const sprHeli = new Sprite({id: 'heli', url: 'img/heli.png', w: 126, h: 66, x: 480, y: 80, frames: [0, 126]});
const sprPlay = new Sprite({id: 'play', url: 'img/play.png', w: 111, h: 41, x: 190, y: 350});
game.addSprite(sprGround);
game.addSprite(sprClouds);
game.addSprite(sprHeli);
game.addSprite(sprPlay);

// restore high score
const highscore = localStorage.getItem('highscore');
if (highscore) spnHighscore.innerHTML = highscore;

// FUNCTIONS

// start the game
function startGame() {
   // reset previous game
   spnHits.innerHTML = numHits = 0;
   spnMisses.innerHTML = numMisses = 0;

   // remove play button
   game.removeSprite(sprPlay);

   // switch background 
   game.setBackground('/img/sky.png');

   // initialize ground, clouds, and heli sprites
   sprGround.x = 0;
   sprGround.speedX = -0.5;
   sprClouds.x = 0;
   sprClouds.speedX = -2;
   sprHeli.x = 200;
   sprHeli.animDrag = 5;
 
   // start game loop
   doLoop();
}

// game loop
function doLoop() {
   // repaint all
   game.repaint();

   // clouds logics
   if (sprClouds.x < -sprClouds.w) sprClouds.x = game.w;

   // ground logics
   if (sprGround.x < -game.w) sprGround.x = 0;

   // heli logics
   if (sprHeli.y < 0) sprHeli.y = 0;
   if (sprHeli.x < -sprHeli.w / 2) sprHeli.x = -sprHeli.w / 2;
   if (sprHeli.x > game.w - sprHeli.w / 2) sprHeli.x = game.w - sprHeli.w / 2;
   if (sprHeli.y > 500) sprHeli.y = 500;

   // request next loop
   requestAnimationFrame(doLoop);
}

// EVENT HANDLERS

function handlePlay() {
   startGame();
}

// events
sprPlay.node.addEventListener('click', handlePlay);
