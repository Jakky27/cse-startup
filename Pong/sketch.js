var bgColor = 0;

var paddleL_x, paddleR_x;
var paddles_y;
var ball_x, ball_y;

var points;
var topScore;

var speedIncrement;

var ballVelocityX;
var ballVelocityY;
var ballVelocityMaxX;

var isGameOver;

var fillNum;
var fillIncrement;

function setup() {
  createCanvas(1000, 600);
  frameRate(60);
  background(bgColor);
  textFont("monospace", 11);
  
  fillNum = 255;
  fillIncrement = 3;
  
  isGameOver = false;
  
  points = 0;
  topScore = 0;
  
  speedIncrement = 1;
  
  paddleL_x = 50;
  paddleR_x = 950;
  paddles_y = 250;
  ball_x = 500;
  ball_y = 300;
  
  fill(255);
  noStroke();
  
  // Initial ball velocity
  ballVelocityX = 5; 
  ballVelocityY = 0;
}

function draw() {
  background(bgColor);
  
  //drawCenter();
  moveBall();
  movePaddles();
  checkCollision();
  showScore();
  gameOver();
}

function drawCenter(){
  fill(255);
  rect(500 - 20, 0, 3, 600);
}

function moveBall(){
  if(isGameOver == true)
  {
    return;
  }
  
  // Moves the ball no matter what
  ball_x += ballVelocityX;
  ball_y += ballVelocityY;
  // Redraws the ball
  rect(ball_x, ball_y, 20, 20)
}

function movePaddles(){
  // Up and Down
  if(keyIsPressed == true && isGameOver == false) {
    if(keyCode == DOWN_ARROW && paddles_y < 600-150){
        paddles_y += 20;
    }
    if(keyCode == UP_ARROW && paddles_y > 0){
      paddles_y -= 20;
    }
  }
  
  // Redraws the paddles
  rect(paddleL_x, paddles_y, 10, 150);
  rect(paddleR_x, paddles_y, 10, 150);
}

function checkCollision(){
  // Hitting left paddle 
  if(ball_x > paddleL_x && ball_x + ballVelocityX <= paddleL_x // X stuff
  && ball_y + 20 > paddles_y && ball_y < paddles_y + 150) { // If ball's bottom is below its top, if ball's top is above its base
  ballVelocityX = -ballVelocityX + speedIncrement;
  // Changes y speed completely randomly
  ballVelocityY = random(10);
  // Clamps the speed of the ball
  if(ballVelocityX >= ballVelocityMaxX)
  {
    ballVelocityX = ballVelocityMaxX;
  }
  points++;
  return;
  }
  
  // Hitting right paddle
  if(ball_x < paddleR_x && ball_x + 10 + ballVelocityX >= paddleR_x // X stuff
  && ball_y + 20 > paddles_y && ball_y < paddles_y + 150) { // If ball's bottom is below its top, if ball's top is above its base
    ballVelocityX = -ballVelocityX - speedIncrement;
    // Changes y speed completely randomly
    ballVelocityY = random(10);
    // Clamps the speed of the ball
    if(ballVelocityX >= ballVelocityMaxX)
    {
      ballVelocityX = ballVelocityMaxX;
    }
    points++;
    return;
  }
  
  // Hitting the top or bottom
  if(ball_y < 0)
  {
    ball_y = 0;
    ballVelocityY = -ballVelocityY;
  }
  if(ball_y + 20 > 600)
  {
    ball_y = 580;
    ballVelocityY = -ballVelocityY;
  }
  
  // If the ball is out of bounds
  if(ball_x < 0 || ball_x > 1000)
  {
    isGameOver = true;
  }
}

function showScore(){
  fill(50 + (points*10)); // Black and white 
  textSize(50);
  textAlign(CENTER);
  text(points, 500 - 20, 50);
  fill(255);
  
  if(isGameOver == true){
    return;
  }
  
  textAlign(LEFT)
  textSize(20);
  text("TOP SCORE: " + topScore, 10, 20);
}

function gameOver() {
  if(isGameOver == true)
  {
    fill(255);
    textSize(75);
    textAlign(CENTER)
    text("GAME OVER", 480, 150);
    
    if(points > topScore){
      topScore = points;
    }
    textSize(20);
    text("TOP SCORE: " + topScore, 480, 300);
    
    textSize(25);
    if(fillIncrement > 0 && fillNum >= 255){
      fillIncrement = -fillIncrement;
    }
    else if(fillIncrement < 0 && fillNum <= 100) {
      fillIncrement = -fillIncrement;
    }
    fill(fillNum += fillIncrement);
    text("Press ENTER to restart", 480, 200);
    if(keyIsPressed && keyCode == ENTER){
      restart();
    }
    fill(255);
  }
}

function restart() {
  fillNum = 255;

  isGameOver = false;
  
  points = 0;
  
  paddleL_x = 50;
  paddleR_x = 950;
  paddles_y = 250;
  ball_x = 500;
  ball_y = 300;
  
  fill(255);
  noStroke();
  
  // Initial ball velocity
  ballVelocityX = 5; 
  ballVelocityY = 0;
}






