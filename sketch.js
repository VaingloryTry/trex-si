var PLAY=1;
var END=0;
var gameState=PLAY;
var trex ,trex_running;
var edges;
var ground, groundImg, invisible;
var nubeImg, nubes;
var obs1, obs2, obs3, obs4, obs5, obs6, obstaculos;
var grupoNubes, grupoObs;

function preload(){
  trex_running=loadAnimation("trex1.png", "trex3.png", "trex4.png");
  groundImg=loadImage("ground2.png");
  nubeImg=loadImage("cloud.png");
  obs1=loadImage("obstacle1.png");
  obs2=loadImage("obstacle2.png");
  obs3=loadImage("obstacle3.png");
  obs4=loadImage("obstacle4.png");
  obs5=loadImage("obstacle5.png");
  obs6=loadImage("obstacle6.png");
}

function setup(){
  createCanvas(600,200)
  
  //crear sprite de Trex
 trex=createSprite(50,160,20,50);
 trex.addAnimation("running", trex_running);
 trex.scale=0.7;

  //Piso
  ground= createSprite(200, 180, 600, 20);
  ground.addImage(groundImg);
  invisible=createSprite(200,195,600,10);
  invisible.visible=false;

  grupoNubes=createGroup();
  grupoObs= createGroup();

  edges=createEdgeSprites();
}

function draw(){
  background(180);

  if (gameState === PLAY){
    //velocidad de piso 
    ground.velocityX=-2;

    //Regeneración de piso
    if(ground.x < 0){
      ground.x=ground.width/2;
    }

    if(keyDown("space") && trex.y >=100){
      trex.velocityY=-10;
    }

    trex.velocityY=trex.velocityY +0.8;
    trex.collide(invisible);

    crearNubes();
    crearObstaculos();

    if (grupoObs.isTouching(trex)){
      gameState=END;
    }

  }else if(gameState === END){
    //velocidad de piso 
    ground.velocityX=0;

    //velocidad Trex
    trex.velocityY=0;

  }




  
  
  
  

  
  drawSprites();
}


//Función de nubes
function crearNubes(){
  if(frameCount % 60 === 0){
    var nube = createSprite(600,100,30,10);
    nube.addImage(nubeImg);
    nube.scale=0.5;
    nube.y=Math.round(random(10,100));
    nube.velocityX=-3;
    nube.depth=trex.depth;
    trex.depth=trex.depth+3;
    nube.lifetime=250;
    grupoNubes.add(nube);
  }
  
}


//Función de obstaculos
function crearObstaculos(){
  if(frameCount % 60 === 0){
    var obstaculo=createSprite(600,170,30,10);
    //obstaculo.addImage(obs1);
    var num = Math.round(random(1,6));
    switch(num){
      case 1:obstaculo.addImage(obs1); break;
      case 2:obstaculo.addImage(obs2); break;
      case 3:obstaculo.addImage(obs3); break;
      case 4:obstaculo.addImage(obs4); break;
      case 5:obstaculo.addImage(obs5); break;
      case 6:obstaculo.addImage(obs6); break;
    }
    obstaculo.scale=0.5;
    obstaculo.velocityX=-5;
    obstaculo.lifetime=250;
    grupoObs.add(obstaculo);
  }
  

}

  