var left;
var right;
var puck;
let socket = io.connect("http://localhost:9000");
let dataCame;

function setup(){
  createCanvas(700, 500);
  puck = new Puck();
  puck.initialize();
  left = new Paddle(true);
  right = new Paddle(false);
}

function draw(){


    socket.on("image", function(image){
      dataCame = image;
});



  background(0);

  puck.checkPaddleLeft(left);
  puck.checkPaddleRight(right);

  left.show();
  right.show();

  left.update();
  right.update();
    puck.checkEdges();

  moveLeftPaddle(dataCame);
  moveRightPaddle(dataCame);

  puck.show();

  puck.update();
}

function moveLeftPaddle (image){
  if(image == 'up_left_paddle'){
    left.move(-10);
    right.move(0);
  }
  else {
    if(image == 'down_left_paddle'){
      left.move(10);
      right.move(0);
    }
  }
}

function moveRightPaddle (image){
  if(image == 'up_right_paddle'){
    right.move(-10);
    left.move(0);
  }
  else {
    if(image == 'down_right_paddle'){
      right.move(10);
      left.move(0);
    }
  }
}


// function keyReleased() {
//    left.move(0);
//    right.move(0);
// }
//
//
function keyPressed() {
  if(key == 'a'){
    left.move(-10);
  }
  else {
    if(key == 'z'){
      left.move(10);
    }
  }

  if(key == 'k'){
    right.move(-10);
  }
  else {
    if(key == 'm'){
      right.move(10);
    }
  }
}
