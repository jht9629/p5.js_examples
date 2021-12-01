let video;
let poseNet;
let poses = [];
let dot_len = 5;
// let dot_color = [255, 255, 255];
let dot_color = [0, 0, 0, 10];
let video_duration;
let new_pos;
// let mov_file = 'body/IMG_E0088-480p.mov';
// let mov_dim = { width: 640, height: 360 };
let mov_file = './body/trim.mov';
let mov_dim = { width: 640, height: 468 };

function setup() {
  // createCanvas(320, 180);
  createCanvas(mov_dim.width, mov_dim.height);
  create_video_slider();
  createSpan().id('status');
  createButton('Jump').mousePressed(function () {
    video.time(new_pos);
  });
  createButton('Clear').mousePressed(function () {
    background(255);
  });
  createButton('Red').mousePressed(function () {
    dot_color = [255, 0, 0, 10];
  });
  createButton('Green').mousePressed(function () {
    dot_color = [0, 255, 0, 10];
  });
  createButton('Yellow').mousePressed(function () {
    dot_color = [255, 255, 0, 10];
  });
  createButton('Black').mousePressed(function () {
    dot_color = [0, 0, 0, 10];
  });
  createSpan().id('time_id');
  createElement('br');
  video = createVideo(mov_file, vidLoad);

  // Hide the video element, and just show the canvas
  // video.hide();
}

function draw() {
  // background(0);
  // image(video, 0, 0, width, height);

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  drawSkeleton();

  select('#time_id').html(video.time());
}

function create_video_slider() {
  createSlider(0, width, 0)
    .id('slider_id')
    .input(function () {
      // console.log('slider value ', this.value());
      let pos = this.value();
      pos = map(pos, 0, width, 0, video_duration);
      console.log('slider pos ', pos);
      new_pos = pos;
      // video.time(pos);
    });
  select('#slider_id').style('width', width + 'px');
  createElement('br');
}

function vidLoad() {
  console.log('vidLoad width', video.width, 'height', video.height);
  console.log('duration', video.duration());
  video_duration = video.duration();
  video.loop();
  video.volume(0);
  prepare_ml5();
}

function prepare_ml5() {
  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function (results) {
    poses = results;
  });
}

function modelReady() {
  // select('#status').html('Model Loaded');
  console.log('Model Loaded');
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        fill(dot_color);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, dot_len, dot_len);
      }
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(dot_color);
      line(
        partA.position.x,
        partA.position.y,
        partB.position.x,
        partB.position.y
      );
    }
  }
}

// https://editor.p5js.org/ml5/sketches/PoseNet_webcam

// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

// Uncaught (in promise) Error: The video element has not loaded data yet. Please wait for `loadeddata` event on the <video> element.
