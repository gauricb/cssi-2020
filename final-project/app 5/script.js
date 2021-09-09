// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, CENTER, color, collideRectRect, colorMode, CORNER, createCanvas, ellipseMode, fill, frameCount, frameRate, keyCode, height,
 *    LEFT, key, line, loop, noFill, noLoop, noStroke, random, rect, round, stroke, sqrt, text, width, strokeWeight, rectMode, loadFont, textFont, textSize
 *    UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, ENTER, ellipse, img, loadImage, mouseX, mouseY, image, textAlign, reset, imageMode, loadSound, second
 *    setTimeout, sound, SPACE, textWidth, value
 */

function preload(){
  hammerImg = loadImage('https://cdn.glitch.com/eedbdca7-c858-4a94-ab9d-77b4f4c5d0bc%2Fhammer.png?v=1595951468072');
  sprayBottle = loadImage('https://cdn.glitch.com/eedbdca7-c858-4a94-ab9d-77b4f4c5d0bc%2Fspray%20bottle.png?v=1596127073157');
  groceryStore = loadImage('https://cdn.glitch.com/eedbdca7-c858-4a94-ab9d-77b4f4c5d0bc%2Fgrocery%20store.jpg?v=1595871868955');
  winImg = loadImage('https://cdn.glitch.com/eedbdca7-c858-4a94-ab9d-77b4f4c5d0bc%2Fgame%20win.png?v=1595955541869');
  sound = loadSound('https://cdn.glitch.com/eedbdca7-c858-4a94-ab9d-77b4f4c5d0bc%2Fzapsplat_household_aerosol_bug_killer_spray_002.mp3?v=1596044647670');
  startSound = loadSound('https://cdn.glitch.com/eedbdca7-c858-4a94-ab9d-77b4f4c5d0bc%2Fzapsplat_multimedia_game_tone_sci_fi_futuristic_beep_positive_002_54379.mp3?v=1596040679124');
  errorSound = loadSound('https://cdn.glitch.com/eedbdca7-c858-4a94-ab9d-77b4f4c5d0bc%2FMario_Jumping-Mike_Koenig-989896458.mp3?v=1595955261633');
  fontStart = loadFont('https://cdn.glitch.com/eedbdca7-c858-4a94-ab9d-77b4f4c5d0bc%2Fka1.ttf?v=1595950682696');
  backgroundMusic = loadSound('https://cdn.glitch.com/eedbdca7-c858-4a94-ab9d-77b4f4c5d0bc%2FVideogame2.mp3?v=1596044708716');
  loseScreen = loadImage('https://cdn.glitch.com/eedbdca7-c858-4a94-ab9d-77b4f4c5d0bc%2Fpeople.jpg?v=1596126217010');
  //fontStart = loadFont('https://cdn.glitch.com/eedbdca7-c858-4a94-ab9d-77b4f4c5d0bc%2FElfboyclassic-PKZgZ.ttf?v=1595950893149');
  //sound = loadSound('https://cdn.glitch.com/eedbdca7-c858-4a94-ab9d-77b4f4c5d0bc%2Fpunch_or_whack_-Vladimir-403040765.mp3?v=1595873303626');
}

let backgroundColor, globalS, globalB, spaceW, spaceH, facesGraphics; // setup vars
let fontStart, screen, groceryStore, sprayBottle, hammerImg, errorSound, startSound, backgroundMusic, level, skinColor; // start game vars
let gameScore, faces, hit, time, t, faceIndex, falseHit, freq; // in-game vars
let gameIsOver, gameWon, winImg, levelUpScore, newLevel, newLevelUpScore, loseScreen; // end game vars

function setup() {
  // Canvas & color settings
  createCanvas(550, 500);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  globalS = 67; 
  globalB = 89; 
  ellipseMode(CENTER); 
  backgroundMusic.loop();
 
  // initialize game vars
  t = 1000; // var for amount of time  
  time = t; 
  level = 3; 
  gameIsOver = false;
  gameWon = false; 
  gameScore = 0;
  hit = false;
  screen = 0; // 0 for start screen, 1 for play game, 2 for game lost, 3 for game won, 4 for instructions page, 5 for info screen 
  startGame();
  falseHit = false; 
  levelUpScore = 10; 
  freq = 150; 
  
  // creates an array for the faces
  faces = []; 
  spaceW = width/4;
  for (let i = 1; i < 4; i++) { // fills the array
    spaceH = height/4;
    spaceH = spaceH*i; 
    for (let j = 1; j < 4; j++) {
      faces.push(new face(spaceW*j, spaceH)); 
    }
  }
}

function draw() {
  if (screen == 0){
    startGame();  // starting screen
  }
  
  if (screen == 4){
    instructionsPage(); // instructions page
  }
  
  if (screen == 5){
    whyMask(); // covid info
  }

  if (screen == 1){ // game screen
    //play background music
    
    // background
    background(backgroundColor);
    //background(backgroundPlay);
  
    // faces
    for (let i = 0; i < faces.length; i++) {
      faces[i].showSelf();  
    }
    
    // changing faces
    faceChange(); 

    // text
    textAlign(LEFT); 
    textSize(16);
    if (!falseHit && time >= 200) {
      fill (0); 
    }
    else {
      fill (0, globalS, globalB); 
    }
    text(`Score: ${gameScore}`, 20, 50); // tracking and showing score
    text(`Time left: ${time}`, 20, 30); // showing time left
    text(`Level: ${level-2}`, width-90-textWidth(level), 30); 

    // spray bottle that follows mouse
    imageMode(CENTER);
    image(sprayBottle, mouseX, mouseY, 40, 50); 
    }
    
    // time
    handleTime(); 
  
    // game over 
    if (screen == 2 || screen == 3){
      gameOver(); 
    }
}

// ***************** handle faces: create faces, change masks, decide who has a mask *****************

class face {
  constructor(x, y) {
    this.x = x; 
    this.y = y; 
    this.radius = 80;
    this.mask = chooseMask(); 
    this.maskWidth = 60;
    this.maskHeight = 30; 
    this.hit = false;
    this.skin = random(20, 100);
    this.maskColor = random(170, 285); 
  }
    
  showSelf() {
    fill(16, globalS, this.skin); // skin color
    
    noStroke(); // no border around skin
    ellipse(this.x, this.y, this.radius); // person's face = circle
    
    if (this.mask) {
      fill(this.maskColor, globalS, globalB); // mask color
      noStroke(); // no border around mask
      rectMode(CENTER); 
      rect(this.x, this.y+10, this.maskWidth, this.maskHeight, 5); // mask = rectangle
    }
  }
}

function faceChange() {
  if (frameCount % freq == 0) { // every [frequency] frames, all the faces reload
    for (let i = faces.length-1; i >=0; i--) {
      buffer(i);
      // remove old face and add new face with randomly generated mask or no mask 
      //fill(int(random(15,250)), globalS, globalB); 
      fill(16, globalS, random(20, 100));
      faces.splice(i, 1, new face(faces[i].x, faces[i].y)); 
      }
  }
  if (hit) {
    buffer(faceIndex); 
    faces.splice(faceIndex, 1, new face(faces[faceIndex].x, faces[faceIndex].y));
    hit = false;
  }
}

function buffer(index) {
  fill (95); 
  rect(faces[index].x, faces[index].y, faces[index].radius); 
}

function chooseMask() {
  let x = random(0, 1); // choose a decimal between 0 and 1
  if (x <= .5){
    return true;
  } else {
    return false;
  }
}


// ***************** mousePressed, keyPressed ***************** 

function mousePressed() {
  if (screen == 1){
    for (let i = 0; i < faces.length; i++) {
      if ((mouseX <= faces[i].x + faces[i].radius/2) && (mouseX >= faces[i].x - faces[i].radius/2)) { // checks X position
        if ((mouseY <=faces[i].y + faces[i].radius/2) && (mouseY >= faces[i].y - faces[i].radius/2)) { // checks Y position
          faceIndex = i; // saves index of face into var to use in faceChange()
          if (!faces[i].mask) { // if that person is NOT wearing a mask, then "hit" --> score goes up 
            handleHit(); 
          } else { // if that person IS wearing a mask, then "false hit" --> penalties
            handleFalseHit(); 
          }
        } 
      }
    }
  }
}

function keyPressed(){
  if (keyCode == ENTER) { // start screen --> game screen
    if (screen == 0 || screen == 4 || screen == 5){ // start game if you're on the info, instructions, or home screen
      screen = 1;
      startSound.play();
    }
  }
  
  if (key == 'i') { // instruction screen
    if (screen == 0){
      screen = 4;
      startSound.play();
    }
  }
  
  if (key == 'f') { // info screen
    if (screen == 0) {
      screen = 5;
      startSound.play();
    }
  }
  
  if (key == 'b'){ // go back to home screen
    if (screen == 4 || screen == 5) {
      screen = 0;
      startSound.play();
    }
  }
    
  if (key == ' '){ // play again after game is won or game over
    if (screen == 2 || screen == 3) {
      if (screen == 2) { // game over --> same level 
        for (let i = 0; i < faces.length; i++) { // reset face array to be the same as previous level
          faces.splice(i, 1, new face(faces[i].x, faces[i].y)); 
        }
      }
      if (screen == 3) { // game won --> level up 
        level += 1; 
        levelUpScore += 2; // higher score needed to level up
        t -= 100; // less time to win
        freq -= 10; // faces change with greater frequency
        faces = []; 
        for (let i = faces.length - 1; i = 0; i --) {
          faces.pop(); 
        }
        spaceW = width/(level+1);
        for (let i = 1; i < level+1; i++) { // fills the array
          spaceH = height/(level+1);
          spaceH = spaceH*i; 
          for (let j = 1; j < level+1; j++) {
            faces.push(new face(spaceW*j, spaceH)); 
          } 
        }
      }
      screen = 1;
      // reset game vars
      gameScore = 0;
      time = t;
      gameWon = false; 
      gameIsOver = false; 
      hit = false; 
      falseHit = false;
      startSound.play(); 
      //backgroundMusic.play(); 
    }
  }
}


// ***************** handle hits, with masks or no masks ***************** 

function handleHit() { // hit = within bounds of face AND no mask
  // change gameScore and update hit vars
  gameScore += 1; 
  hit = true; 
  falseHit = false; 
  faces[faceIndex].hit = true; 
  
  // sound effect (smashing)
  sound.play();
  
  // check game is over
  if (gameScore === levelUpScore) {
    gameWon = true;
    gameOver(); 
  }
  
  // replace that face with another face 
  faceChange(); 
}

function handleFalseHit() {
  // change gameScore and update falseHit
  gameScore -= 1; // if that person IS wearing a mask, then a false hit --> score goes down
  falseHit = true; 
  
  // sound effect when you hit the good people
  errorSound.play();
  
  // check game is over 
  if (gameScore < 0) {
    gameIsOver = true; 
    gameOver(); 
  }
}

// ***************** timer *****************

function handleTime() {
  // time goes down
  
  if (time <= 200 && screen == 1){ // red text if time is under 200
    fill (0, globalS, globalB); 
  } 
  
  if (time > 0 && screen == 1) {
    time -= 1;
  } else if (time <= 0 && screen != 0 && screen != 4 && screen != 5){ // if time goes below 0 
    gameIsOver = true; 
    gameOver(); 
  }
}


// ***************** game screens: start game, instructions, game over, you win ***************** 

function startGame() {
  rectMode(CORNER); 
  background(groceryStore, 400, 400);
	fill(100);
	textAlign(CENTER);
  strokeWeight(0);
  rect(width/2 - 220, height/2 - 70, 440, 170, 40);
  fill(0);
  textFont(fontStart);
  textSize(14);
  text('WELCOME TO WHAC-A-MOLE - COVID EDITION', width/2, height/2 - 30);
  //text('Press to whack non-masked faces \n to increase your score!', width/2, height/2 + 20)
  
  textSize(10);
  text('press i for instructions', width / 2, height / 2 + 60);
  text('press f for more info on masks', width / 2, height / 2 + 80);
  
  if (second() % 2 == 0){
    fill (0, globalS, globalB); 
  }
  textSize(20);
  text('press enter to start', width/2, height/2 + 17);
}

function instructionsPage(){ // after pressing i
  rectMode(CORNER); 
  background(groceryStore, 400, 400);
	fill(100);
	textAlign(CENTER);
  strokeWeight(0);
  rect(width/2 - 220, height/2 - 200, 440, 400, 10);
  fill(0);
  textFont(fontStart);
  textSize(14); 
  text('Press to whack non-masked faces \n to increase your score', width/2, 90);
  text('Game ends after time is 0', width/2, 150);
  text('Get a score of 10 to level up', width/2, 200);
  textSize(10); 
  text('Press enter to start game', width/2, 370);
  text('Press b to go back', width/2, 390);
  text('Created by Gauri Barar, \n Christina Tan, and Erin Yuan', width/2, 410);
  
  facesGraphics = []; 
  for (let i = 1; i < 4; i++) { // fills the array
    facesGraphics.push(new face(spaceW*i, height-220)); 
  }
  for (let i = 0; i < facesGraphics.length; i++) {
      facesGraphics[i].showSelf();  
  }
}

function whyMask(){ // after pressing f
  rectMode(CORNER); 
  background(groceryStore, 400, 400);
	fill(100);
	textAlign(CENTER);
  strokeWeight(0);
  rect(width/2 - 220, height/2 - 200, 440, 400, 10);
  fill(0);
  textFont(fontStart);
  textSize(14); 
  text('Why should you wear a face mask?', width/2, 90);
  text('1. Protect yourself and others. ', width/2, 150);
  text('2. Help control the spread of COVID-19.', width/2, 200);
  text('3. Look cool!', width/2, 250);
  textSize(10);
  text('Press enter to start game', width/2, 410); 
  text('Press b to go back', width/2, 430); 
  
  facesGraphics = []; 
  for (let i = 1; i < 4; i++) { // fills the array
    facesGraphics.push(new face(spaceW*i, height-170)); 
  }
  for (let i = 0; i < facesGraphics.length; i++) {
      facesGraphics[i].showSelf();  
  }
}

function gameOver() {
  if (gameIsOver){ // screen = 2
    screen = 2; // show game over screen
    rectMode(CORNER); 
    imageMode(CORNER);
    textAlign(CENTER);
    background(loseScreen, 600, 400);
    fill(255);
    rect(width/2 -210, height/2 - 50, 420, 100, 100);
    fill(0);
    textSize(14);
    text('Your score is ' + gameScore, width/2, height/2 - 10);
    text('YOU LOSE! press SPACEBAR to try again', width/2, height/2 + 15);
  }
  if (gameWon) { // screen = 3
    screen = 3; // show game won screen
    newLevel = level-1; 
    newLevelUpScore = levelUpScore + 2; 
    
    rectMode(CORNER); 
    imageMode(CORNER);
    textAlign(CENTER);  
    background(winImg, 600, 400);
    fill(255);
    rect(width/2 -210, height/2 - 50, 420, 100, 100);
    fill(0);
    textSize(14);
    text('Your new level is ' + newLevel, width/2, height/2 - 10);
    text('YOU WIN! press SPACEBAR to play again', width/2, height/2 + 15);
    text('Get a score of ' + newLevelUpScore + ' to level up!', width/2, height/2 + 30); 
  }
}