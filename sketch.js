var castle, castle;
var gateImg, gate, gatesGroup;
var fence, fence, fencesGroup;
var wizard, wizardImg;
var hitterBlockGroup, hitterBlock;
var gameState = "play"

function preload(){
  castleImg = loadImage("castleImg.jpg");
  gateImg = loadImage("gateImg.jpg");
  fenceImg = loadImage("fenceImg.jpg");
  wizardImg = loadImage("wizardImg.jpg");
  midievalSound = loadSound("medievalSound.html");
}

function setup() {
  createCanvas(600, 600);
  castle = createSprite(300,300);
  castle.addImage("castle",castleImg);
  castle.velocityY = 1;

  gatesGroup = new Group();
  fencesGroup = new Group();
  hitterBlockGroup = new Group();

  wizard = createSprite(200,200,50,50);
  wizard.addImage(ghostImg);
  wizard.scale = 0.3;
  
}

function draw() {
  background(200);

  if(gameState === "play"){
    if(castle.y > 400){
      castle.y = 300
  }

  if(keyDown("left_arrow")){
    wizard.x = wizard.x - 3;
  }
  
  if(keyDown("right_arrow")){
    wizard.x = wizard.x + 3;
  }
  
  if(keyDown("space")){
    wizard.velocityY = -10;
  }
  
  wizard.velocityY = ghost.velocityY + 0.8;

  if(fencesGroup.isTouching(wizard)){
    wizard.velocityY = 0;
  }

  if (hitterBlockGroup.isTouching(wizard)|| wizard.y>600) {
    wizard.destroy()
    gameState = "end";
    
  }

  spawnDoors();

  drawSprites();
 }
if(gameState === "end"){
  stroke("yellow");
  fill("yellow");
  textSize(30);
  text("Game Over ",230,250);
}
  
}

function spawnGates(){
  if (frameCount%240===0) {
    gate = createSprite(200,-50);
    gate.addImage(gateImg);
    gate.x = Math.round(random(120,400));
    gate.velocityY = 1;
    gate.liftime = 800;
    gatesGroup.add(gate);
    

    fence = createSprite(200,10);
    fence.addImage(fenceImg);
    fence.x = gate.x;
    fence.velocityY = 1;
    fence.lifetime = 800;
    fencesGroup.add(fence);

    hitterBlock = createSprite(200,15);
    hitterBlock.width = fence.width;
    hitterBlock.height = 2;
    hitterBlock.x = door.x;
    hitterBlock.velocityY = 1;
    hitterBlock.lifetime = 800;
    hitterBlockGroup.add(hitterBlock);

    gate.depth = wizard.depth;
    wizard.depth = wizard.depth +1;



  }
}
