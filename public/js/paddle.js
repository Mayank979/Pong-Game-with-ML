function Paddle(bool) {
  this.x;
  this.y = height/2;
  this.w = 20;
  this.h = 80;
  this.moveSpeed = 0;

  if(bool) {
    this.x = this.w;
  }
  else {
    this.x = width - this.w;
  }

  this.update = function() {
    this.y += this.moveSpeed;
    this.y = constrain(this.y, this.h/2, height - this.h/2);
  }

  this.move = function(steps) {
    this.moveSpeed = steps;
  }

  this.show = function() {
    fill(255);
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h);
  }


}
