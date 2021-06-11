//Create variables here
var dogImg, dogImg1;
var foodStock, foodS;
var database;

function preload()
{
  //load images here
  dogImg = loadImage("dogImg.png");
  dogImg1 = loadImage("dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  background(46, 139, 87);
  database = firebase.database();
  console.log(database);
  dog = createSprite(250,200,20,20);
  dog.addImage(dogImg);
  dog.scale = 0.5;
  textSize(20);
  foodStock=database.ref('Food'); 
  foodStock.on("value",readStock); 
}


function draw() {  
  background(46,139,87);
  
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg1);
  }

  if(keyWentUp(UP_ARROW)){
   dog.addImage(dogImg);
  }

  drawSprites();

textSize(15);
fill("black");
stroke("red");
text("Note : Please Hold the Up Arrow for a while to feed the dog ", 100,10,300,20);
text("Food remaining to feed dog : "+foodS,150,450); 

if(foodS < 1){
  textSize(30);
  text("FOOD EMPTY",250,250);
  dog.addImage(dogImg);
}

}

//function to read the values from database
function readStock(data){
foodS = data.val();
}

function writeStock(x){
  if (x <= 0){
    x = 0;
   } else{
    x=x-1;
  }
 
 database.ref('/').update({
  Food:x
})
}