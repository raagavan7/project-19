var Play=1
var End=0
var gameState = "PLAY"

var jet, jetimage
var space, spaceimage;
var  asteriodimage,restarts,restartimg,gameoverimg,gameover;
var star,score,starimage,gameoverimage,jetblastimage

function preload() {

  asteriodimage = loadImage("asteriod.png");
  spaceimage = loadImage("space.png");
  jetimage = loadImage("jet.png");
  starimage=loadImage("star.png");
  jetblastimage=loadImage("jetblast.png")
  restartimg=loadImage("restart.png")
   gameoverimg = loadImage("gameover.png")
}

function setup() {

  createCanvas(600, 600)


  space = createSprite(300, 300, 20, 20);
  space.addImage(spaceimage);
  space.scale = 0.99;


  jet = createSprite(100, 300, 20, 20);
  jet.addImage(jetimage);
  jet.scale = 0.3;
  jet.setCollider("rectangle",1,10,550,100)
  //jet.debug=true;
  
  
  restarts = createSprite(300, 350, 20, 20);
  restarts.addImage(restartimg);
  restarts.scale = 0.5 
  restarts.visible=false;
  
  gameover = createSprite(300, 300, 20, 20);
  gameover.addImage(gameoverimg);
  gameover.scale = 0.5 
  gameover.visible=false;


starGroup=createGroup();
obstacleGroup=createGroup();

 score=0;
  
}

function draw() {
  
  jet.velocityY = 0;
  jet.velocityX = 0;
  
   if (mousePressedOver(restarts)){
    
    restart();
  }
  
  if(gameState==="PLAY"){
    
    if (keyDown("up_arrow")) {
    jet.velocityY = -8
  }

  if (keyDown("right_arrow")) {
    jet.velocityX =8
  }
  
  if (keyDown("left_arrow")) {
    jet.velocityX =-8
  }

  if (keyDown("down_arrow")) {
    jet.velocityY = 8
  }
    
    if(starGroup.isTouching(jet)){
    
    score=score+2;
    starGroup.destroyEach();
  }
     space.velocityX = -3

  if (space.x < 0) {
    space.x = space.width / 2;
  }
    
    obstacle();
  stars();

    
  }
  if(obstacleGroup.isTouching(jet)){
      gameState="end"
    jet.addImage(jetblastimage);
     space.velocityX = 0
obstacleGroup.setVelocityXEach(0)
starGroup.setVelocityXEach(0)
obstacleGroup.setLifetimeEach(-1);
    starGroup.setLifetimeEach(-1);
   obstacleGroup.destroyEach();
    starGroup.destroyEach();
restarts.visible=true;
gameover.visible=true;
    
  }
  
  createEdgeSprites();  
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:" + score,250,30);
  
   
}

function obstacle(){
   if (frameCount % 170 === 0){
  
   asteriod = createSprite(500, 300, 20, 20);
  asteriod.addImage(asteriodimage);
  asteriod.scale = 0.2;
  asteriod.velocityX = -(2.5 +2*score/2);
  asteriod.lifetime = 255;
  asteriod.y = Math.round(random(80,580));
  
     obstacleGroup.add(asteriod);
   }
}

function stars(){
if (frameCount % 215 === 0) {
   star=createSprite(500,300,20,20);
  star.addImage(starimage);
  star.scale=0.1;
  star.velocityX = -(2 + 2*score/2);
  star.lifetime = 255;
  star.y = Math.round(random(80,580));
 
     starGroup.add(star);
}
}

function restart(){
  
  gameState = "PLAY"
  gameover.visible=false;
  restarts.visible=false;
  score=0;
  jet.addImage(jetimage)
}


