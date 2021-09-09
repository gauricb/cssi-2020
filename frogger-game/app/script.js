// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, color, colorMode, createCanvas, collideRectCircle, ellipse, fill, height, keyCode, random, rect,
 *    strokeWeight, text, textSize, width, img2
 *    UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW
 img, loadImage, image
 */

let backgroundColor, frogX, frogY, score, lives, gameIsOver, croc1X, croc1Y, croc1V,
  croc2X, croc2Y, croc2V, crocWidth, crocHeight, bg;

function preload(){
  img = loadImage('https://cdn.glitch.com/dc1c66ab-096b-436a-8cab-3c600f06bc79%2Ffrog.png?v=1594753015048');
  img2 = loadImage('https://cdn.glitch.com/dc1c66ab-096b-436a-8cab-3c600f06bc79%2Fmagarmuch.png?v=1594754550408');
}
function setup() {
  // Canvas & color settings
  createCanvas(500, 500);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  //randomize the frog's starting position
  frogX = width / 2 ;
  frogY = height - 50;
  //initialize game state stuff
  score = 0;
  lives = 3;
  gameIsOver = false;
  //initialize positions of cars and their velocity that kill the frog
  croc1X = 0;
  croc1Y = 100;
  croc1V = 5;
  croc2X = 0;
  croc2Y = 200;
  croc2V = 3
  //dimensions of cars
  crocWidth = 40;
  crocHeight = 30; 
  //set background to river
  bg = loadImage('https://cdn.glitch.com/dc1c66ab-096b-436a-8cab-3c600f06bc79%2Fwater.png?v=1594753911019')
}

function draw() {
  background(bg);
  // Code for gold goal line
  fill(60, 80, 80);
  rect(0, 0, width, 50);
 
  //helpers to handle the game logic
  moveCrocs();
  drawCrocs();
  checkCollisions();
  checkWin();
  displayScores();
  challenges();
}

//frog can move only when game is not over

  function keyPressed() {
    if (keyCode === UP_ARROW) {
      frogY -= 10;
    }else if (keyCode === DOWN_ARROW){
      frogY += 10; 
    }else if (keyCode === RIGHT_ARROW){
    frogX += 10;
    }else if (keyCode === LEFT_ARROW){
      frogX -= 10;
    }
  }

function moveCrocs() {
  // Move the car
  croc1X += croc1V;
  croc2X += croc2V; 
  // Reset if it moves off screen
  if (croc1X > width){
    croc1X = -30; 
  }
  if (croc2X > width){
  croc2X = -40;
}}

function drawCrocs() {
  // Code for car 1
  image(img2, croc1X, croc1Y, crocWidth, crocHeight)
  // Code for additional cars
  image(img2, croc2X, croc2Y, crocWidth, crocHeight)
}

function checkCollisions() {
  // If the frog collides with the car, reset the frog and subtract a life.
  if (collideRectCircle(croc1X, croc1Y, crocWidth, crocHeight, frogX, frogY, 20) || 
      collideRectCircle(croc2X, croc2Y, crocWidth, crocHeight, frogX, frogY, 20)){
     // console.log('collide with car1')
    frogY = height - 50; 
    lives -= 1; 
      }
  if (lives <= 0 ){
    gameIsOver = true;//will use this is in displayScore()
  }
}

function checkWin() {
  // If the frog makes it into the yellow gold zone, increment the score
  // and move the frog back down to the bottom.
  if (frogY <= 50){
    score += 1;
    frogY = height - 50; 
  }
}

function displayScores() {
  textSize(12);
  fill(0);
  // Display Lives
  text(`Lives: ${lives}`, 10, 20);
  // Display Score
  text(`Score: ${score}`, 10, 38)
  // Display game over message if the game is over
  if (gameIsOver === true){
    textSize(60);
    text("GAME OVER", 70, height/2);
    //still have to stop the frog from moving
  }
  //display congratulations if score = 5 and end the game
  if (score === 5){
    textSize(60);
    text("Congrats!", 70, height/2);
  }
}

function challenges(){
  //if score increases then add another obstacle or booster
  //if score = 1 then display frog pic instead of green dot
  if (score === 0){
   fill(120, 80, 80);
   ellipse(frogX, frogY, 20);
  }if (score === 1){
    image(img, frogX, frogY, 20, 20)
  }
}