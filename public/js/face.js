let mobilenet;
let classifier;
let video;
let label = 'test';
let upButton;
let socket = io.connect("http://localhost:9000");

function modelReady() {
  console.log('Model is ready!!!');
}

function videoReady() {
  console.log('Video is ready!!!');
}

function training(loss) {
  if (loss == null) {
    console.log('Training Complete');
    classifier.classify(gotResults);
  } else {
    console.log(loss);
  }
}


function gotResults(error, result) {
  if (error) {
    console.error(error);
  } else {
    label = result;
    classifier.classify(gotResults);
  }
}

function setup() {
  createCanvas(600, 500);
  video = createCapture(VIDEO);

  video.hide();
  background(0);
  mobilenet = ml5.featureExtractor('MobileNet', modelReady);
  classifier = mobilenet.classification(video, videoReady);

  let upButtonLeft = createButton('Left Paddle Up');
  upButtonLeft.mousePressed(function() {
    classifier.addImage('up_left_paddle');
  });

  let downButtonLeft = createButton('Left Paddle Down');
  downButtonLeft.mousePressed(function() {
    classifier.addImage('down_left_paddle');
  });

  let upButtonRight = createButton('Right Paddle Up');
  upButtonRight.mousePressed(function() {
    classifier.addImage('up_right_paddle');
  });

  let downButtonRight = createButton('Right Paddle Down');
  downButtonRight.mousePressed(function() {
    classifier.addImage('down_right_paddle');
  });

  trainButton = createButton('Train');
  trainButton.mousePressed(function() {
    classifier.train(training);
  });


}

function draw() {
  background(0);
  image(video, 0, 0, width, height);
  fill(255);
  textSize(16);


    socket.emit("image", {
      image: label
    });


  text(label, 10, height - 10);

}
