var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var score = 0
var PLAY = 1
var END = 0
var gameState = PLAY
var naveInimiga
var meteoritotop
function preload() {
  bgImg = loadImage("assets/bg.png")

  cleitinhoImg = loadAnimation("assets/cleitinho1.png", "assets/cleitinho2.png", "assets/cleitinho3.png", "assets/cleitinho4.png")
  meteoritoImg = loadAnimation("assets/meteorito/sprite_meteorito0.png", "assets/meteorito/sprite_meteorito1.png", "assets/meteorito/sprite_meteorito2.png", "assets/meteorito/sprite_meteorito3.png")
  cometaImg = loadAnimation("assets/cometa/sprite_cometa0.png", "assets/cometa/sprite_cometa1.png", "assets/cometa/sprite_cometa2.png", "assets/cometa/sprite_cometa3.png", "assets/cometa/sprite_cometa4.png", "assets/cometa/sprite_cometa5.png")
  naveInimigaImg = loadImage("assets/nave inimiga/sprite_nave0.png")
  explosao = loadSound("assets/explosion.mp3")

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //criando canto superior e inferior
  bottomGround = createSprite(200, 390, 800, 20);
  bottomGround.visible = false;
  topGround = createSprite(200, 10, 800, 20);
  topGround.visible = false;

  bottomGround = createSprite(width / 2 + 100, height, height * 2, 20);
  // bottomGround.visible = false;
  topGround = createSprite(width / 2 + 100, height-height , height * 2, 20);
  //topGround.visible = false;

  //criando o cleitinho  
  cleitinho = createSprite(100, 200, 20, 50);
  cleitinho.addAnimation("cleitinho", cleitinhoImg);
  cleitinho.scale = 5;


  meteoritoGroup = new Group()
  cometaGroup = new Group()
  naveInimigaGroup = new Group()
  barraGroup = new Group()


}

function draw() {

  background(255);
  image(bgImg, 0, 0, width, height)

  if (gameState == PLAY) {
    if (keyDown("space")) {
      cleitinho.velocityY = -10;
    }
    // cleitinho.velocityY = cleitinho.velocityY + 1;

    if(naveInimigaGroup.isTouching(topGround)){
    for(var i=0; i<naveInimigaGroup.length; i++){
      if(naveInimigaGroup[i].isTouching(topGround)){
        naveInimigaGroup[i].velocityY*=-1
      }
    }
  }
   if(naveInimigaGroup.isTouching(bottomGround)){
    for(var i=0; i<naveInimigaGroup.length; i++){
      if(naveInimigaGroup[i].isTouching(bottomGround)){
        naveInimigaGroup[i].velocityY*=-1
      }
    }
  }
  
  

  } //fim do estado PLAY

  if(gameState === END){
    cleitinho.y=400


    barraGroup.setVelocityXEach(0)
    barraGroup.destroyEach()
  }


  // chamada das funções
  Score()
  handleCometa()
  handleMeteoritoTop()
  handleMeteoritoDown()
  handleNaveInimiga()
  Barra()
  drawSprites();
  textSize(50)
  fill("yellow")
  text("Pontuação: "+score,250,80)

}


// meteoro = cano
function handleMeteoritoTop() {
  if (frameCount % 150 === 0) {
    meteoritotop = createSprite(width - 100, random(height / 2 - 100, height / 2 - 300), 50, 50)
    meteoritotop.addAnimation("meteor", meteoritoImg)
    meteoritotop.scale = random(0.4, 0.8)
    meteoritotop.velocityX = -5

    meteoritoGroup.add(meteoritotop)
  }
}
function handleMeteoritoDown() {
  if (frameCount % 150 === 0) {
    meteoritodown = createSprite(width - 100, random(height / 2 + 100, height / 2 + 300), 50, 50)
    meteoritodown.addAnimation("meteor", meteoritoImg)
    meteoritodown.scale = random(0.4, 0.8)
    meteoritodown.velocityX = -5

    meteoritoGroup.add(meteoritodown)
  }
}

function handleCometa() {
  if (frameCount % 178 === 0) {
    cometa = createSprite(width / 4 + random(170, 200), height - height, height * 2 - 100, 20, 50, 50)
    cometa.addAnimation("asteroide", cometaImg)
    cometa.scale = 0.6
    cometa.velocityY = random(2, 5)
    cometa.velocityX = random(-3, -5)

    cometaGroup.add(cometa)
  }
}

function colisao(){

}

function handleNaveInimiga() {
  if (frameCount % 178 === 0) {
    naveInimiga = createSprite(width - 100, height / 2, 50, 50)
    naveInimiga.addAnimation("naveInimiga", naveInimigaImg)
    naveInimiga.scale = 0.6

    naveInimiga.velocityY=random(-10,10)
    naveInimiga.velocityX=-10
    naveInimigaGroup.add(naveInimiga)
  }
}

function Barra(){
  if(frameCount%60===0){
    var barra = createSprite(width,height,10,height*2)
    barra.velocityX = -10
    // barra.visible = false
    barraGroup.add(barra)
  }
}

function Score(){
  if(cleitinho.isTouching(barraGroup)){
    for(i=0;i<barraGroup.length; i++){
      if(barraGroup[i].isTouching(cleitinho)){
        barraGroup[i].destroy()
      }
    }
    score = score +1
    
  }
}