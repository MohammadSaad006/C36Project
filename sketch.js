var dog, happyDog, database, FoodS, foodStock
var dogImg, dogHappyImg;
var milk, milkImg;
var feedDog,addFoods
var feed,addFood

function preload()
{
  dogImg = loadImage("dogImg.png");
  dogHappyImg = loadImage("dogImg1.png");
  milkImg = loadImage("Milk.png");
  

}

function setup() {
  createCanvas(500, 500);
  database=firebase.database();
  var location=database.ref("Food")
  location.on("value",readStock)
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
  dog = createSprite(250,250,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  emo = createSprite(200,200,1,1);
  
  foodStock = database.ref('food');
  foodStock.on("value",readStock);
  foodStock.set(50);
  
  milk = createSprite(140,435,10,10);
  milk.addImage(milkImg);
  milk.scale = 0.025;

  milk1 = createSprite(210,280,10,10);
  milk1.addImage(milkImg);
  milk1.scale = 0.025;
  milk1.visible = false;
  
  feed=createButton("Feed the dog");
  feed.position(500,200);
  feed.mousePressed(feedDog);
  
  addFood=createButton("Add Food");
  addFood.position(600,200);
  addFood.mousePressed(addFoods)

}



function draw() {  
  background(0,255,0)
  fill("black");
  text("Click On add Food to dog Stand",100,50);
  drawSprites();
  textSize(17);
  fill("black");
  text("Milk Bottles Remaining  "+FoodS,170,440);
}

function readStock(data)
{
  FoodS = data.val();
}
 
function writeStock(x){

  if(x<=0){
    x = 0;
  }else{
    x=x-1
  }

  database.ref('/').update({
    Food:x
  })
}

function addFoods(){
    dog.addImage(dogImg);
    milk1.visible = false;
  FoodS++;
  database.ref('/').update({
    Food:FoodS
  })
  
}
function feedDog(){

  FoodS--;
  database.ref('/').update({
    Food:FoodS
  })
      dog.addImage(dogHappyImg);
      milk1.visible = true;    
  }