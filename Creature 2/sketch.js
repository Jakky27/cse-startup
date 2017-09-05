var bgColor = 255;
var creatureColor;

function setup() 
{
  creatureColor = color(255, 177, 113)
  createCanvas(500, 500);
}

function draw() 
{
  background(151,252, 255);
  
  // Clouds
  cloud(100, 50, 100, 40)
  cloud(70, 60, 80, 40)
  cloud(100, 60, 150, 60)
  cloud(100, 40, 75, 50)
  cloud(200, 50, 100, 40)
  cloud(180, 40, 100, 60)
  
  // Hill
  hill(-100, 600, 400, 500)
  hill(100, 600, 700, 600)
  hill(0, 600, 600, 400)
  
  translate(mouseX, mouseY)
  noStroke()
  
  head(250, 100, 125, 75);
  
  // Eyes
  if(isMousePressed)
    closeEyes();
  else
    openEyes();
  
  // Mouth
  fill(0)
  ellipse(250, 90, 15, 5)
  
  // Tounge
  fill(232, 147, 219);
  ellipse(250, 92, 8, 6)
  
  // Legs
  leg(50, 100, 25, 25, 50, 40, 75, 25, 150, 450, PI + PI/5);
  leg(50, 100, 25, 25, 50, 40, 75, 25, 450, 350, PI/2 + PI/5);

  // Knife
  knife(410, 145, 8, 30, 410, 145, 410, 130, 420, 145)

  // Arms
  arm(0,0, 50, 20, 375, 200, -PI/5)
  arm(0, 0, 50, 20, 85, 175, PI/5)
  
  // Food
  fill(232, 147, 219);
  ellipse(80, 180, 30, 30)
  fill(151, 242, 255)
  ellipse(80, 180, 5, 5)
  
  // Body
  fill(200);
  ellipse(250, 250, 300, 300);
  
  // Pants
  fill(0)
  arc(250, 250, 300, 300, 0, PI)
  
  // Neck
  fill(0)
  arc(250, 190, 25, 175, 4*PI/3, 5*PI/3)
}

function keyPressed()
{
  if(keyCode == ENTER)
  {
      creatureColor = color(random(256), random(256), random(256));
  }
}

function head(x, y, w, h)
{
  // Head
  fill(creatureColor);
  ellipse(x, y, w, h);
}

function openEyes()
{
  // Eyes
  fill(255)
  ellipse(230, 80, 15, 15)
  ellipse(265, 80, 15, 15)
  fill(0)
  ellipse(227, 77, 7, 7)
  ellipse(267, 80, 7, 7)
}

function closeEyes() // 255, 177, 113
{
  fill(0)
  ellipse(227, 77, 3, 3)
  ellipse(267, 80, 3, 3)
}

function leg(x1, y1, x2, y2, x3, y3, x4, y4, xTranslate, yTranslate, rotation)
{
  fill(creatureColor);

  translate(xTranslate, yTranslate)
  rotate(rotation);
  quad(x1, y1, x2, y2, x3, y3, x4, y4);
  rotate(-rotation)
  translate(-xTranslate, -yTranslate)
}

function arm(x, y, w, h, xTranslate, yTranslate, rotation)
{
  fill(creatureColor)
  
  translate(xTranslate, yTranslate)
  rotate(rotation)
  rect(x, y, w, h)
  rotate(-rotation)
  translate(-xTranslate, -yTranslate)
}

function knife(x, y, w, h, x1, y1, x2, y2, x3, y3)
{
  fill(0)
  rect(x, y, w, h)
  fill(200)
  triangle(x1, y1, x2, y2, x3, y3)
}

function hill(x,y,w,h)
{
  fill(color(0, 255, 0))
  stroke(0)
  arc(x+(w/2), y, w, h, PI, 0, PIE)
}

function cloud(x, y, w, h)
{
  // Clouds
  fill(255)
  noStroke()
  ellipse(x, y, w, h)
}