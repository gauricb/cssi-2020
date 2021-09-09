// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, color, colorMode, createCanvas, ellipse, fill, height, line, mouseIsPressed,
 *    mouseX, mouseY, rect, stroke, strokeWeight, width
 */

let brushHue, priorX, priorY;

function setup() {
  // Canvas & color settings
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);
  brushHue = 0;
  priorX = 0;
  priorY = 0;
  background(95);
  strokeWeight(6);
}

function draw() {
  chooseColors();

  if (mouseIsPressed) {
    // Pick one of the three behaviors below:
    // rect(mouseX, mouseY, 15, 15); // Draw a 15 x 15 sized square at mouseX and mouseY
    // ellipse(random(width), random(height), 30, 30);
    line(priorX, priorY, mouseX, mouseY);
    // line(width-priorX, height-priorY, width-mouseX, height-mouseY);
  }

  // Store the mouseX and mouseY from this frame in order to use them next
  // frame - remember from the DVD lesson that the draw loop runs once every
  // frame.
  priorX = mouseX;
  priorY = mouseY;
}

/* A function that sets the stroke and fill of our "paint brush". */
function chooseColors() {
  brushHue += 1;
  if (brushHue > 359) {
    brushHue = 0;
  }
  stroke(brushHue, 50, 80);
  fill(brushHue, 50, 80);
}

function keyPressed() {
  background(95);
}

/* This is a function that we created to help debug out code! */
// function mousePressed() {
//   ellipse(random(width), random(height), 30, 30);
// }