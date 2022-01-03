let player,playerImg

let road,roadImg

let enemy1,enemy1Img, enemy2,enemy2Img, enemy3,enemy3Img, enemy4,enemy4Img, enemy1Group,enemy2Group,enemy3Group,enemy4Group,enemiesGroup

let gameOver,gameOverImg, restart,restartImg

let obstacle1, obstacle1Img, obstacle2, obstacle2Img, obstaclesGroup,obstacle1Group,obstacle2Group

let fuel1,fuel1Img

let distance = 0
let fuel = 1200
 
let END = 0
let PLAY = 1
let gameState = PLAY




function preload(){
  playerImg = loadImage("Player.png")
  roadImg = loadImage("Road.png")
  enemy1Img = loadImage("Enemy.png")
  enemy2Img = loadImage("Enemy2.png")
  enemy3Img = loadImage("Enemy3.png")
  enemy4Img = loadImage("Enemy4.png")
  gameOverImg = loadImage("GameOver.png")
  restartImg = loadImage("Restart.png")
  obstacle1Img = loadImage("Obstacle1.png")
  obstacle2Img = loadImage("Obstacle2 (2).png")
  fuel1Img = loadImage("Fuel.png")


}

function setup(){
  createCanvas(windowWidth,windowHeight);
  
  // Moving background
  road=createSprite(windowWidth/2,height/2);
  road.addImage(roadImg);
  road.velocityY = 10;
  // continuous background


  
    // creating player
    player = createSprite(width/2,500,200,40)
    player.addImage("player",playerImg)
    player.scale = 0.5
    
    // creating enemy 1
    




    player.setCollider("rectangle", 0,0,110,290)
    player.debug = false

   
    


    gameOver = createSprite(windowWidth/2,windowHeight/2 - 50,40,40)
    gameOver.addImage("GameOver",gameOverImg)
    gameOver.scale = 0.3
    gameOver.visible = false

    restart = createSprite(windowWidth/2,windowHeight/2+100,40,40)
    restart.addImage("restart",restartImg)
    restart.scale = 0.5
    restart.visible=false

    enemy1Group = new Group()
    enemy2Group = new Group()
    enemy3Group = new Group()
    enemy4Group = new Group()
    enemiesGroup = new Group()
    obstacle1Group = new Group()
    obstacle2Group = new Group()
    obstaclesGroup = new Group()
    fuel1Group = new Group()

}




function draw(){
  background("grey")
  


 
   

  
  if(gameState===PLAY){
    
    distance = distance + Math.round(getFrameRate()/50);
    fuel = fuel - Math.round(getFrameRate()/50)
    road.velocityY = (6 + 2*distance/150);

    if(road.y>height){
      road.y = 0
    }

    if(distance % 350 == 0){
      fuelSpawn()
    }
  

    edges = createEdgeSprites()
    player.collide(edges)

    
  
    if(keyWentDown(LEFT_ARROW)){
      player.velocityX = -8 
    }
    
    if(keyWentUp(LEFT_ARROW)){
      player.velocityX = 0
    }
  
    if(keyWentDown(RIGHT_ARROW)){
      player.velocityX = 8
    }
    
    if(keyWentUp(RIGHT_ARROW)){
      player.velocityX = 0
    }
  
    // if(keyWentDown("space")){
    //   player.velocityY = player.velocityY+8
    // }
    
    // if(keyWentUp("space")){
    //   player.velocityY = player.velocityY
    // }




    var enemiesGroup = Math.round(random(1,4))

  if (World.frameCount % 30 == 0) {
    if (enemiesGroup == 1) {
      enemy1GC();
    } else if (enemiesGroup == 2) {
      enemy2GC();
    } else if (enemiesGroup == 3){
      enemy3GC();
    } else{
      enemy4GC()
    }
  }
  var obstaclesGroup = Math.round(random(1,6))
  if (World.frameCount % 35 == 0){
    if(obstaclesGroup == 1){
      obstacle1Gc()
    } else if (obstaclesGroup == 2){
      obstacle1Gc()
    } else if (obstaclesGroup == 3){
      obstacle1Gc()
    } else if (obstaclesGroup == 4){
      obstacle1Gc()
    } else   if(obstaclesGroup == 5){
      obstacle1Gc()
    } else {
      obstacle2Gc()
    }
  }


    

  if(enemy1Group.isTouching(player)){
    gameState = END

  }
  if(enemy2Group.isTouching(player)){
    gameState = END

  }
  if(enemy3Group.isTouching(player)){
    gameState = END

  }
  if(enemy4Group.isTouching(player)){
    gameState = END
  }

  if(obstacle1Group.isTouching(player)){
    gameState = END
  }
  if(obstacle2Group.isTouching(player)){
    gameState = END
  }

  if(fuel === 0){
    gameState = END
  }
  if(fuel1Group.isTouching(player)){
    fuel = 1200
    fuel1Group.destroyEach()
  }

  } else if (gameState === END){
    gameOver.visible = true
    restart.visible = true

    road.velocityY = 0

    enemy1Group.setVelocityYEach(0);
    enemy1Group.setLifetimeEach(-1);
  
    enemy2Group.setVelocityYEach(0);
    enemy2Group.setLifetimeEach(-1);
  
    enemy3Group.setVelocityYEach(0);
    enemy3Group.setLifetimeEach(-1);

    enemy4Group.setVelocityYEach(0);
    enemy4Group.setLifetimeEach(-1);


    gameOver.visible = true
    restart.visible = true

    enemy1Group.destroyEach()
    enemy2Group.destroyEach()
    enemy3Group.destroyEach()
    enemy4Group.destroyEach()
    obstacle1Group.destroyEach()
    obstacle2Group.destroyEach()
    fuel1Group.destroyEach()
    player.velocityX = 0
    
    if(mousePressedOver(restart)){
      reset()
    }
    distance.visible = true

  }
  

 

    drawSprites() 
    textSize(40);
    fill("white");
    text("Distance: "+ distance,width-400,50);
    text("Fuel: "+fuel,width-400,100)
}

function enemy1GC(){
  enemy1 = createSprite(Math.round(random(50,1150)),-100,40,80)
  enemy1.addImage("enemy1",enemy1Img)
  enemy1.scale = 0.6
  enemy1.velocityY = 5
  enemy1.setLifetime = 170
  enemy1Group.add(enemy1)
    enemy1.setCollider("rectangle", 10,10,100,250)
     //enemy1.debug = true    


}

function enemy2GC(){
  enemy2 = createSprite(Math.round(random(50,1150)),-100,40,80)
  enemy2.addImage("enemy2",enemy2Img)
  enemy2.scale = 0.6
  enemy2.velocityY = 5
  enemy2.setLifetime = 170
  enemy2Group.add(enemy2)
     enemy2.setCollider("rectangle", 0,0,100,230)
     //enemy2.debug = true    
    


}

function enemy3GC(){

  enemy3 = createSprite(Math.round(random(50,1150)),-100,40,80)
  enemy3.addImage("enemy3",enemy3Img)
  enemy3.scale = 0.5
  enemy3.velocityY = 5
  enemy3.setLifetime = 170
  enemy3Group.add(enemy3)
      enemy3.setCollider("rectangle", 0,0,130,310)
    //enemy3.debug = true    
    



}

function enemy4GC(){
  enemy4 = createSprite(Math.round(random(50,1150)),-100,40,80)
  enemy4.addImage("enemy4",enemy4Img)
  enemy4.scale = 0.9
  enemy4.velocityY = 5
  enemy4.setLifetime = 170
  enemy4Group.add(enemy4)
  enemy4.setCollider("rectangle", 0,0,70,150)
  


}

function obstacle1Gc(){
  obstacle1 = createSprite(Math.round(random(50,1150)),-100,40,80)
  obstacle1.addImage("obstacle1",obstacle1Img)
  obstacle1.velocityY = 5
  obstacle1.setLifetime = 170
  obstacle1.scale = 0.1
  obstacle1Group.add(obstacle1)


}

function obstacle2Gc(){
  obstacle2 = createSprite(Math.round(random(50,1150)),-100,40,80)
  obstacle2.addImage("obstacle2",obstacle2Img)
  obstacle2.velocityY = 5
  obstacle2.setLifetime = 170
  obstacle2.scale = 0.3
  obstacle2Group.add(obstacle2)

}

function reset(){
 gameState = PLAY

 restart.visible = false
 gameOver.visible = false

 distance = 0
 fuel = 1200

}

function fuelSpawn(){
  fuel1 = createSprite (Math.round(random(50,1150)),-100,40,80)
  fuel1.addImage("fuel",fuel1Img)
  fuel1.velocityY = 5
  fuel1.setLifetime = 170
  fuel1.scale = 0.2
  fuel1Group.add(fuel1)

}