let vid;
let poseNet;
let poses = [];
let dot_len = 5;

function setup() {
  // createCanvas(320, 180);
  createCanvas(640, 360);
  // video = createCapture(VIDEO);
  // video.size(width, height);
  createSpan().id('status');
  createSpan().id('time_id');
  createDiv('');
  vid = createVideo('body/IMG_E0088-480p.mov', vidLoad);

  // Hide the video element, and just show the canvas
  // video.hide();
  vid.hide();
}

function vidLoad() {
  console.log('vidLoad width', vid.width, 'height', vid.height);
  console.log('duration', vid.duration());
  vid.loop();
  vid.volume(0);
  prepare_ml5();
}

function prepare_ml5() {
  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(vid, modelReady);
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

function draw() {
  image(vid, 0, 0, width, height);

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  drawSkeleton();

  select('#time_id').html(vid.time());
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
        fill(255, 0, 0);
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
      stroke(255, 0, 0);
      line(
        partA.position.x,
        partA.position.y,
        partB.position.x,
        partB.position.y
      );
    }
  }
}

// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

// let video;
