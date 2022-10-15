var backgroundImg;
var house, houseImg;
var smurf, smurfImg, crashImg, explosionImg, papasmurf, papasmurfImg, smurfette, smurfetteImg;
var obstacle, gargamelImg, catImg, obstacleGroup;
var restart, restartImg;
var gameState = "start"
var edges;
var timer = 0;
var music;

function preload(){
  backgroundImg = loadImage("assets/background.jpeg")
  houseImg = loadImage("assets/house.png");
  smurfImg = loadImage("assets/smurf.png");
  gargamelImg = loadImage("assets/gargamel.png");
  catImg = loadImage("assets/cat.png");
  crashImg = loadImage("assets/crash.png");
  explosionImg = loadImage("assets/explosion.png");
  papasmurfImg = loadImage("assets/papasmurf.png");
  smurfetteImg = loadImage("assets/smurfette.png");
  restartImg = loadImage("assets/playAgain.png");
  music = loadSound("assets/smurfmusic.mp3");

}

function setup() {
  createCanvas(windowWidth-10, windowHeight-10);

  house = createSprite(width*0.8, height*0.88);
  house.addImage(houseImg);
  house.scale = 0.5
  house.debug = true;
  house.setCollider("rectangle", 0, 0, 300, 300)
  
  smurf = createSprite(75, 100);
  smurf.addImage("explosionImg", explosionImg);
  smurf.addImage("crashImg", crashImg);
  smurf.addImage("smurfImg", smurfImg);
  smurf.scale = 0.3
  smurf.velocityX = 0
  smurf.velocityY = 0
  smurf.debug = true;
  smurf.setCollider("rectangle", 0, 0, 250, 375)

  papasmurf = createSprite(house.x+140, house.y+20);
  papasmurf.addImage(papasmurfImg);
  papasmurf.scale = 0.4

  smurfette = createSprite(house.x-140, house.y+20);
  smurfette.addImage(smurfetteImg);
  smurfette.scale = 0.15

  restart = createSprite(width/2, height/2);
  restart.addImage(restartImg);
  restart.scale = 0.15
  restart.scale = 1.5

  edges = createEdgeSprites();

  obstacleGroup = new Group(); 


}

function draw() {
  background(backgroundImg);

  if ((smurf.velocityX > 0 || smurf.velocityY > 0) && !music.isPlaying()){
    music.play();
    music.setVolume(0.25);
  }

  if (gameState == "start"){
    start();
  } else if (gameState == "play"){
    play();
  } else if (gameState == "end"){
    end();
  }
 
 
   drawSprites();

   fill("white")
   textSize(20)
   text("Time: " +timer, width-100, 50)
}

function start(){

  restart.visible = false;

  smurf.changeImage("smurfImg")

  smurf.x = 75;
  smurf.y = 100;

  if(keyDown("space")){
    gameState = "play"
    smurf.velocityX = 4
  }
}

function play(){

  createObstacles();

  restart.visible = false;

  if(keyDown(UP_ARROW)){
    smurf.velocityX = 0
    smurf.velocityY = -5
  }
  if(keyDown(DOWN_ARROW)){
    smurf.velocityX = 0
    smurf.velocityY = 5
  }
  if(keyDown(LEFT_ARROW)){
    smurf.velocityX = -5
    smurf.velocityY = 0
  }
  if(keyDown(RIGHT_ARROW)){
    smurf.velocityX = 5
    smurf.velocityY = 0
  }

  if(smurf.isTouching(house)){
    gameState = "end"
    smurf.x = width*0.8
    smurf.y = height*0.88
  } else if(obstacleGroup.isTouching(smurf)){
    smurf.changeImage("explosionImg")
    gameState = "end"
  } else if(smurf.isTouching(edges)){
    smurf.changeImage("explosionImg")
    gameState = "end"
  }

  if (frameCount % 10 == 0){
    timer += 1
  }

}

function end(){
  smurf.velocityX = 0;
  smurf.velocityY = 0;
  obstacleGroup.setLifetimeEach(0);

  restart.visible = true;
  if(mousePressedOver(restart)){
    timer = 0;
    gameState = "start"
  }
}

function createObstacles(){
  if(frameCount % 20 == 0){
    obstacle = createSprite(random(0, width), 0)

    var number = Math.round(random(0.9, 2))
    if (number == 1){
      obstacle.addImage(gargamelImg)
      obstacle.scale = 0.225
    } else if (number == 2){
      obstacle.addImage(catImg)
      obstacle.scale = 0.4
      obstacle.setCollider("rectangle", 0, 0, 250, 400)
    }

    obstacle.velocityY = 3
    obstacle.lifetime = 500
    obstacleGroup.add(obstacle)
    obstacle.debug = true;
  }

}