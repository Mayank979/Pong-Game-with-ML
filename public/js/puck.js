function Puck(){
  this.x = 500;
  this.y = 100;
  this.r = 12;
  this.xspeed = 1;
  this.yspeed = 3;

  this.initialize = function() {
    this.reset();
  }

  this.checkPaddleLeft = function(left) {
  if(this.y < left.y + left.h/2 && this.y > left.y - left.h/2 && this.x - this.r < left.x + left.w/2){
    if(this.x > left.x){
      // this.diff = this.y - (left.y - left.h/2);
      // let rad = radians(45);
      // this.angle = map(this.diff, 0, left.h, -rad, rad);
      // this.xspeed = 5 * cos(this.angle);
      // this.yspeed = 5 * sin(this.angle);
      // this.x = left.x + left.w/2 + this.r;
      this.xspeed *= -1;
    }
  }
}


this.checkPaddleRight = function(right) {
  if(this.y < right.y + right.h/2 && this.y > right.y - right.h/2 && this.x + this.r > right.x - right.w/2){
   if(this.x < right.x){
      // this.diff = this.y - (right.y + right.h/2);
      // let rad = radians(135);
      // this.angle = map(this.diff, 0, right.h, -rad, rad);
      // this.xspeed = 5 * cos(this.angle);
      // this.yspeed = 5 * sin(this.angle);
      // this.x = right.x - right.w/2 - this.r;
     this.xspeed *= -1;
   }
  }
}



  this.show = function() {
    ellipse(this.x, this.y, this.r*2, this.r*2);
    fill(255);
  }

  this.update = function() {
    this.x += this.xspeed;
    this.y += this.yspeed;



  }

  this.reset = function() {
    this.x = width/2;
    this.y = height/2;
    this.angle = random(PI/4, -PI/4);
    this.xspeed = 5 * cos(this.angle);
    this.yspeed = 5 * sin(this.angle);

    if(random(1) < 0.5){
      this.xspeed *= -1;
    }

  }

  this.checkEdges = function() {
    if(this.x > width){
      this.reset();
    }
    if(this.x < 0){
      this.reset();
    }
    if(this.y > height - this.r || this.y < 0 + this.r || this.y < this.r){
     this.yspeed *= -1;
   }
  }
}
