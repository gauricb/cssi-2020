// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, color, colorMode, createCanvas, ellipse, fill, height, line, mouseX,
 *    mouseY, noStroke, stroke, text, width, rect, strokeWeight, R, keyCode, keyTyped
 */

// We'll use variables for most of our colors in this code-along.
let backgroundColor,
  color1,
  color2,
  color3,
  color4,
  rectColor,
  rectHeight,
  rectWidth
  
  
 
  ;

function setup() {
  // Canvas & color settings
  createCanvas(500, 500); // p5 has height and width already made for u
  colorMode(HSB, 360, 100, 100);
  noStroke();

  //set saturation and brightness variables
  //determines our 'color family'

  // When used with only one argument, the color mode is greyscale.
  // 0 is black and 100 is white.
  //backgroundColor = color(95);
  rectColor = color(20);
  // When used with three arguments, the function takes, in this order:
  // HUE - 0 to 360 degrees on a color wheel - 0 is red, 120 is green and 240
  //       is blue.
  // SATURATION - 0 is no color (greyscale), and 100 is as bold as possible.
  // BRIGHTNESS - 0 is no light (black), and 100 is as bright as possible.
  color1 = color(136, 67, 68);
  color2 = color(225, 67, 68);
  color3 = color(360, 67, 68);
  color4 = color(53, 67, 68);
  //rectangle dimesions
  rectHeight = 50;
  rectWidth = 100;
  
  //brushHue = 0; 
  strokeWeight(6);
  backgroundColor = color(95);
}

function draw() {
  background(backgroundColor)
  fill(20);
  ellipse(mouseX, mouseY, 50);
  // Call the drawCenterLine function here to run the three lines of code
  // contained in that function.
  drawCenterLine();
  //drawCenterLine();
  rect1();
  rect2();
  rect3();
  rect4();
  

  
  // conditions for what happens when mouse is on rectangles; change the color of the brush
  /*if (mouseX < rectWidth && mouseY <rectHeight) {
    backgroundColor = color1;
    
  } else if (mouseX > width - rectWidth && mouseY < rectHeight){
    backgroundColor = color2;
  } else if (mouseX < rectWidth && mouseY > height - rectHeight){
    backgroundColor = color3; 
  } else if (mouseX > width - rectWidth && mouseY > height - rectHeight){
    backgroundColor = color4; 
  } else{
    backgroundColor = color(95)
  }*/}
 
  
function drawCenterLine() {
  // This function will turn stroke on, draw the line, and then turn stroke
  // back off.
  // Remember a line segment in p5.js has four arguments: x1, y1, x2, y2
  stroke(rectColor);
  line(width / 2, 0, width / 2, height);
  line(0, height / 2, width, height / 2);
  noStroke();
}

function rect1() {
  stroke(rectColor);
  fill(color1);
  rect(0, 0, rectWidth, rectHeight);
  if (mouseX < rectWidth && mouseY <rectHeight) {
    backgroundColor = color1;
}}
function rect2() {
  stroke(rectColor);
  fill(color2);
  rect(width - rectWidth, 0, rectWidth, rectHeight);
  if (mouseX > width - rectWidth && mouseY < rectHeight){
    backgroundColor = color2;
}}
function rect3() {
  stroke(rectColor);
  fill(color3);
  rect(0, height - rectHeight, rectWidth, rectHeight);
  if (mouseX < rectWidth && mouseY > height - rectHeight){
    backgroundColor = color3; 
}}
function rect4() { //red
  stroke(rectColor);
  fill(color4);
  rect(width - rectWidth, height - rectHeight, rectWidth, rectHeight);
  if (mouseX > width - rectWidth && mouseY > height - rectHeight){
    backgroundColor = color4; 
}}

