var x1, y1; // Position of Spaceship
var w1 = 40; // Spaceship width
var h1 = 40; // Spaceship height
var x, y, w2, h2; // Position and Size of Asteriod
var sx = 3; // Speed of Asteriod
var sy = 3; // Speed of Asteriod
var speed = 10; //Speed of Spaceship

var bg; //Background
var A1; //Asteroid
var SC; //Spaceship

var resetButton; // Button to reset the game
var speedSlider; // Slider to adjust the speed of the asteroid
var sizeSlider; // Slider to adjust the size of the asteroid

function preload() {
  bg = loadImage("SPACE.jpg");
  A1 = loadImage("A1.png");
  SC = loadImage("Spacecraft.png");
  JumpSound = loadSound("Jump.wav");
}

function keyPressed() {
  if (keyCode == 39) {
    // right arrow
    JumpSound.play();
  }

  if (keyCode == 37) {
    // left arrow
    JumpSound.play();
  }

  if (keyCode == 38) {
    // up arrow
    JumpSound.play();
  }

  if (keyCode == 40) {
    // down arrow
    JumpSound.play();
  }
}

function setup() {
  createCanvas(600, 400);
  // Initialize Spaceship position
  x1 = 280;
  y1 = 350;

  // Initialize Asteroid position,size and speed
  x = 200;
  y = 50;
  w2 = 110;
  h2 = 100;

  // Create the reset button
  resetButton = createButton("Start Over");
  resetButton.position(10, 10); // Set position of the button
  resetButton.mousePressed(resetGame); // Set callback function for when the button is pressed

  // Create the size slider
  createSpan("Size of asteroid: ");
  sizeSlider = createSlider(20, 200, 100); // Min value, max value, initial value

  // Create the speed slider
  createSpan("Speed of asteroid: ");
  speedSlider = createSlider(1, 4, 1); // Min value, max value, initial value
  speedSlider.input(increaseSpeed);
}

function draw() {
  // Get the value from the size slider
  w2 = sizeSlider.value() + 10;
  h2 = sizeSlider.value();

  background(220);
  //SPACE background
  image(bg, 0, 0, 600, 400);

  //Spacecraft
  image(SC, x1, y1, w1, h1);

  //asteroid
  image(A1, x, y, w2, h2);
  x += sx;
  y += sy;

  if (x + w2 > width || x < 0) {
    sx = -sx;
  }

  if (y + h2 > height || y < 0) {
    sy = -sy;
  }

  //Spacecraft movement

  if (keyIsDown(RIGHT_ARROW)) {
    x1 += speed; // Move the object to the right
  }
  if (keyIsDown(LEFT_ARROW)) {
    x1 -= speed; // Move the object to the left
  }
  if (keyIsDown(UP_ARROW)) {
    y1 -= speed; // Move the object to the top
  }
  if (keyIsDown(DOWN_ARROW)) {
    y1 += speed; // Move the object to the bottom
  }

  x1 = constrain(x1, 0, width - w1);
  y1 = constrain(y1, 0, height - h1);

  // Check for collision
  if (x1 + w1 > x && x1 < x + w2 && y1 + h1 > y && y1 < y + h2) {
    gameOver();
  }
}

// Function to reset the game
function resetGame() {
  x1 = 280;
  y1 = 350;
  x = 200;
  y = 50;
  w2 = 110;
  h2 = 100;
  sx = 3;
  sy = 3;
  loop(); // Restart the draw loop
}

// Function to display "Game Over" message
function gameOver() {
  background("#000");
  fill("red");
  textSize(32);
  textAlign(CENTER, CENTER);
  textFont("Georgia");
  fill(255, 0, 0);
  text("Game Over", width / 2, height / 2);
  noLoop(); // Stop the draw loop
}

// Function to increase the speed of the asteroid
function increaseSpeed() {
  sx *= speedSlider.value();
  sy *= speedSlider.value();
}
