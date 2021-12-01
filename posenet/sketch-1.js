let vid;
function setup() {
  createCanvas(320, 180);
  createSpan().id('time_id');
  createDiv('');
  vid = createVideo('body/IMG_E0088-480p.mov', vidLoad);
  // vid.size(100, 100);
}

// This function is called when the video loads
function vidLoad() {
  console.log('vidLoad width', vid.width, 'height', vid.height);
  console.log('duration', vid.duration());
  vid.loop();
  vid.volume(0);
}

function draw() {
  background(220);
  image(vid, 0, 0, width, height);
  select('#time_id').html(vid.time());
}

// ./body/IMG_E0088-480p.mov

// https://p5js.org/reference/#/p5/createVideo

// https://p5js.org/reference/#/p5.MediaElement
// https://p5js.org/reference/#/p5.MediaElement/time
// https://p5js.org/reference/#/p5.MediaElement/duration
