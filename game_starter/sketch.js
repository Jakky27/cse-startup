var monster_img;
var cookie_img;
var cake_img;
var cake_x, cake_y;
var pie_img;
var pie_x, pie_y;
var points;
var monster_x, monster_y;
var cookie_x, cookie_y;

var missedPoints = 0;
var missPointsLimit;
var pieIsSpawned = false;
var cakeIsSpawned = false;

var button;
var leaderboard;
var isLeaderboardUpdated = false;

function preload() {
  monster_img = loadImage("assets/cookie_monster.png");
  cookie_img = loadImage("assets/cookie.png");
  cake_img = loadImage("assets/cake.png");
  pie_img = loadImage("assets/pie.png");
  leaderboard = loadStrings("assets/leaderboard.txt");
}

function setup() {
  createCanvas(720, 400);
  
  monster_x = 150;
  monster_y = height-150;
  cookie_x = 725;
  cookie_y = random(350);
  cake_x= 725;
  cake_y = random(350);
  pie_x = 725;
  pie_y = random(350);
  points = 0;
  missPointsLimit = 10;
  
  button = createButton('START OVER');
  button.position(-100, -100); // Just the get the button out of the way
}

function draw() {
  background(200);
  displayPoints();
  
  image(monster_img, monster_x, monster_y);
  image(cookie_img, cookie_x, cookie_y);
  
  if(int(random(50)) == 25 && pieIsSpawned == false)
  {
    pieIsSpawned = true;
    pie_x = 725;
    pie_y = random(350);
  }
  
  if(int(random(50)) == 25 && cakeIsSpawned == false)
  {
    cakeIsSpawned = true;
    cake_x = 725;
    cake_y = random(350);
  }
  
  if(missedPoints > missPointsLimit)
  {
    fill(255, 0, 0);
    textSize(50);
    text("GAME OVER", 200, 50);
    
    loadLeaderboard();
    
    button.position(300, 250);
    button.mousePressed(startOver);
  }
  else // Game running
  {
    if(pieIsSpawned == true)
    {
      movePie();
      image(pie_img, pie_x, pie_y);
    }
    if(cakeIsSpawned == true)
    {
      moveCake();
      image(cake_img, cake_x, cake_y);
    }
    moveCookie();
    moveMonster();
    checkForChomp();
  }
}

function displayPoints() {
  fill(160);
  textSize(150);
  text(points,10,370);
  
  fill(175, 0, 0)
  textSize(35)
  text("Missed: " + missedPoints, 10, 40)
}

function moveCookie() {
  if(cookie_x < 0) 
  {
    cookie_x = 725;
    cookie_y = random(350);
    // Increments the amount of missed cookies
    missedPoints++;
  }
  else 
    cookie_x -= 4 + (points);
}

function movePie() {
  if(pie_x < 0) 
  {
    pieIsSpawned = false; 
    missedPoints++;
  }
  else 
    pie_x -= 7;
}

function moveCake() {
  if(cake_x < 0) 
  {
    missedPoints++;
    cakeIsSpawned = false; 
  }
  else 
    cake_x -= 7;
}

function moveMonster() {
  if(keyIsDown(UP_ARROW) && monster_y > 0)
    monster_y -= 2;
  if(keyIsDown(DOWN_ARROW) && monster_y < height-150)
    monster_y += 2;
  if(keyIsDown(LEFT_ARROW) && monster_x > 0)
    monster_x -= 2;
  if(keyIsDown(RIGHT_ARROW) && monster_x < 580)
    monster_x += 2;
}

function checkForChomp() {
  var d = dist(cookie_x, cookie_y, monster_x, monster_y);
  var d1 = dist(pie_x, pie_y, monster_x, monster_y);
  var d2 = dist(cake_x, cake_y, monster_x, monster_y);
  if (d < 100) {
    points += 1;
    cookie_x = 725;
    cookie_y = random(350);
  }
  if(d1 < 100) // pie
  {
    points += 1;
    pie_x = 725;
    pie_y = random(350);
    pieIsSpawned = false;
  }
  if(d2 < 100) // cake 
  {
    points += 1;
    cake_x = 725;
    cake_y = random(350);
    cakeIsSpawned = false;
  }
}

function startOver()
{
  monster_x = 150
  monster_y = height-150;
  cookie_x = 725;
  cookie_y = random(350);
  cake_y = random(350);
  cake_x= 725;
  pie_x = 725;
  pie_y = random(350);
  points = 0;
  missedPoints = 0;
  button.position(-100, -100);
  isLeaderboardUpdated = false;
  
  pieIsSpawned = false;
  cakeIsSpawned = false;
}

function keyPressed()
{
  if(missedPoints > missPointsLimit && keyCode == ENTER )
  {
    startOver();
  }
}

function loadLeaderboard() // Also writes a new section in the txt file
{
  // Writes new high score of latest game
  if(isLeaderboardUpdated == false)
  {
    isLeaderboardUpdated = true;
    // Ask for player name
    
    append(leaderboard, points.toString());
    //saveStrings(leaderboard, "assets/leaderboard.txt")
  }
  fill(0);
  textSize(20)
  text("LEADERBOARD:", 525, 20);
  
  textSize(10);
  for(var i = 0; i < leaderboard.length; i++)
  {
    text(leaderboard[i], 525, 30 + (i*10));
  }
}