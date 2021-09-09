// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, color, colorMode, createCanvas, ellipse, fill, height, line, mouseIsPressed,
 *    mouseX, mouseY, rect, stroke, strokeWeight, width, random, key, keyCode, SHIFT, mousePressed, createSlider, noStroke
 */

let brushHue,
  priorX,
  priorY,
  rectColor,
  rectHeight,
  rectWidth,
  color1,
  color2,
  color3,
  color4,
  brushColor,
  slider, strokeRect;

function setup() {
  // Canvas & color settings
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100);
  //rectangle
  rectColor = color(30); //outline color
  rectHeight = 50;
  rectWidth = 100;
  strokeRect = 1

  // Initialize brushHue to 0 (which is delcared at the top)
  brushColor = 0;
  brushHue = 0;
  //strokeWeight(20); // thickness of paint brush
  background(95); //background is drawn only once
  //initialize prior X and prior Y to 0
  priorX = 0;
  priorY = 0;
  // colors of the rectangles
  color1 = color(136, 67, 68); //green
  color2 = color(225, 67, 68); //blue
  color3 = color(360, 67, 68); //red
  color4 = color(53, 67, 68); //yellow
  //slider
  slider = createSlider(1, 50, 5, 1);
  slider.position(10, 10);
  slider.style('width', '80px');
}

function draw() {
  rect1();
  rect2();
  rect3();
  rect4();
  //rainbow();
  //if mouse is held down
  if (mouseIsPressed) {
    stroke(brushColor)
    line(priorX, priorY, mouseX, mouseY);
  }

  priorX = mouseX;
  priorY = mouseY;
  
  let val = slider.value();
  strokeWeight(val);

  //choosecolors();
  
}


//when a key is pressed, clear the screen
function keyPressed() {
  if (keyCode === SHIFT) {
    background(95);
  }
}
//change background to red
function keyTyped() {
  if (key === "r") {
    background(0, 45, 89);
  }
}

// when the cursor is not on any of the rectangles, brush color is rainbow

//make rectangles in the corners
function rect1() {
  //green
  noStroke();
  fill(color1);
  rect(0, 0, rectWidth, rectHeight);
  
  if (mouseX < rectWidth && mouseY < rectHeight) {
    brushColor = color1;
  }
  //stroke(brushColor);
}
function rect2() {
  //blue
  //stroke(rectColor);
  noStroke();
  fill(color2);
  rect(width - rectWidth, 0, rectWidth, rectHeight);
  if (mouseX > width - rectWidth && mouseY < rectHeight) {
    brushColor = color2;
  }
  //stroke(brushColor);
}
function rect3() {
  //red
  noStroke();
  fill(color3);
  rect(0, height - rectHeight, rectWidth, rectHeight);
  if (mouseX < rectWidth && mouseY > height - rectHeight) {
    brushColor = color3;
  }
  //stroke(brushColor);
}
function rect4() {
  //yellow
  noStroke();
  fill(color4);
  rect(width - rectWidth, height - rectHeight, rectWidth, rectHeight);
  if (mouseX > width - rectWidth && mouseY > height - rectHeight) {
    brushColor = color4;
  }
  //stroke(brushColor);
}
function rainbow() {
  brushHue += 1;
  if (brushHue > 359) {
    brushHue = 0; //alt brushHue -= 1;
  }
  stroke(brushHue, 50, 80);
  fill(brushHue, 50, 80);
}
