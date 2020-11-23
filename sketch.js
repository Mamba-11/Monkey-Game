var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage,  obstacleImage
var FoodGroup, obstacleGroup
var ground,groundImage
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
   obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,400);
monkey = createSprite(50,300,20,50);
monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.15;
            
   ground = createSprite(300,350,1200,15);
   ground.velociityX = -3;
   ground.x = ground.width/2;
 
  
  

  obstacleGroup = createGroup();
  FoodGroup = createGroup();
  
  score = 0;
}


function draw() {
  
background(180);
   if(gameState === PLAY){
   score = score + Math.round(getFrameRate()/60);
   if (ground.x < 0){
      ground.x = ground.width/2;
   }
  if(keyDown("space")&& monkey.y >=100){
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
 
spawnBananas();
spawnObstacles();
     if(obstacleGroup.isTouching(monkey)){
        gameState = END;
    
   }
   }
  else if(gameState === END){
    monkey.velocityX = 0;
    monkey.velocityY = 0;
     textSize(18);
    text("Game Over",280,210)
      obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);    
  }
drawSprites();
  textSize(18);
  text("Survival Time:" + score,240,70);
 
}
function spawnObstacles(){
 if (frameCount % 120===0){
   var obstacle = createSprite(500,315,10,40);
  
  obstacle.addImage(obstacleImage);
   obstacle.scale = 0.2;
   obstacle.velocityX = -3;
   
   obstacle.lifetime = 200;
   
   obstacle.depth = monkey.depth
    monkey.depth = monkey.depth + 1;
   
   obstacleGroup.add(obstacle);
 }
}
function spawnBananas(){
 if (frameCount % 90===0){
   var Banana = createSprite(500,100,10,40);
  Banana.addImage(bananaImage);
   Banana.scale = 0.1;
   Banana.velocityX = -3;
   
   Banana.lifetime = 200;
   
   Banana.depth = monkey.depth
    monkey.depth = monkey.depth + 1;
   
     FoodGroup.add(Banana);
 }
}

