const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var percy, pImg;
var ground, invisibleGround, gImg;

var coinGroup, coinImage;
var drachma;

var obstaclesGroup, obstacle2, obstacle1,obstacle3;
var fury, hhound, hydra;

var score=0;


var gameOver, restart;

function preload()
{
	pImg = loadImage("images/percy.png");
  gImg = loadImage("images/ground.png")

  fury = loadImage("images/fury.png")
  hhound = loadImage("images/hellhound.png")
  hydra = loadImage("images/hydra.png")

  drachma = loadImage("images/drachma.png")
}

function setup() {
	canvas = createCanvas(1900,900);
    engine = Engine.create();
	world = engine.world;

	//Create the Bodies Here.

	ground = createSprite(950,910,1900,20)
  ground.addImage(gImg); 
  ground.scale = 1.5

  invisibleGround = createSprite(950,860,7000,20);
  invisibleGround.visible = false;
 
   
  percy = createSprite(140,450,20,50)
  percy.addImage(pImg);
    
  coinGroup = new Group();
  obstaclesGroup = new Group();

}


function draw() {
  rectMode(CENTER);
  background("white");
  console.log(percy.y)

  text("Score: "+ score, 1700,70);

  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);

    if(score >= 0){
      ground.velocityX = -6;
    }else{
      ground.velocityX = -(6 + 3*score/100);x
    }
    
    if(keyDown("space") && percy.y >=  500) {
      percy.velocityY = -14
    }
    
    percy.velocityY = percy.velocityY + 0.8

    
    
    if (ground.x < 400){
      ground.x = ground.width/2;
    }
  
   percy.collide(invisibleGround);

   if(percy.isTouching(obstaclesGroup)){
     gameState = END;
   }
  }

  else if (gameState === END ) {
   
    ground.velocityX = 0;
    percy.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);   
    
    
     obstaclesGroup.setLifetimeEach(-1);
  }

 spawnObstacles();


 Engine.run(engine);
  drawSprites();
 
}

function spawnObstacles() {
  if(frameCount % 500 === 0) {
    var obstacle = createSprite(1900,760,10,40);

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(fury);
              obstacle.y = Math.round(random (400,600));
              break;
      case 2: obstacle.addImage(hhound);
              obstacle.scale = 0.2;
              break;
      case 3: obstacle.addImage(hydra);
              obstacle.scale = 2;
              obstacle.y = 700
              break;
    }

    obstacle.velocityX = -4
    console.log(rand)

    obstacle.lifetime = 475;

    obstaclesGroup.add(obstacle);
  }
}
