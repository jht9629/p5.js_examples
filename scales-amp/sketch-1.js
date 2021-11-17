// play 3 scales and graph amplitude using layers
// stopAll - what about stop, pause, loop?
let a_songs = [];
let a_volume = 0.5;
let song_list = ['media/song0.m4a', 'media/song1.m4a', 'media/song2.m4a'];
// let song_list = ['media/song0.m4a'];
let song_colors = ['red', 'green', 'yellow'];
let song_weights = [8, 4, 2];
let song_index = -1;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  load_next();
  create_ui();
}

function create_ui() {
  createButton('play0').mousePressed(function () {
    a_songs[0].play();
  });
  createButton('play1').mousePressed(function () {
    a_songs[1].play();
  });
  createButton('play2').mousePressed(function () {
    a_songs[2].play();
  });
  createDiv();
  createButton('stopAll').mousePressed(function () {
    stopAll();
  });
}

function draw() {
  background(0);
  for (let song of a_songs) {
    song.graph();
    image(song.layer, 0, 0);
  }
}

function stopAll() {
  for (let song of a_songs) {
    song.stop();
  }
}

function load_next() {
  song_index++;
  if (song_index >= song_list.length) {
    console.log('load_next done');
    return;
  }
  let song_file = song_list[song_index];
  // console.log('song_index', song_index);
  loadSound(song_file, sound_loaded);
}

function sound_loaded(arg_song) {
  let song = arg_song;
  console.log('sound_loaded arg_song', arg_song);
  // a_song.play();
  song.setVolume(a_volume);
  // console.log('sound_loaded song_file', song_file);
  // console.log('a_song.duration()', a_song.duration());
  // a_song.loop();
  console.log('song_index', song_index);
  let color = song_colors[song_index];
  let weight = song_weights[song_index];
  let sp = new SongPlayer(song, song_index, color, weight);
  a_songs[song_index] = sp;
  load_next();
}

class SongPlayer {
  constructor(song, index, color, weight) {
    this.song = song;
    this.index = index;
    this.color = color;
    this.weight = weight;
    this.volhistory = [];
    this.layer = createGraphics(width, height);
    this.amp = new p5.Amplitude();
    this.amp.setInput(this.song);
  }
  play() {
    this.song.play();
  }
  stop() {
    this.song.stop();
  }
  loop() {
    this.song.loop();
  }
  pause() {
    this.song.pause();
  }
  setLoop(state) {
    this.song.setLoop(state);
  }
  graph() {
    let amp = this.amp;
    let volhistory = this.volhistory;
    let layer = this.layer;
    let vol = amp.getLevel();
    // console.log('index', this.index, 'vol', vol);
    volhistory.push(vol);
    // Clear the buffer so that when imaged will be layered
    layer.clear();
    // layer.background(0);
    layer.strokeWeight(this.weight);
    layer.stroke(this.color);
    layer.noFill();
    layer.push();
    layer.translate(layer.width / 2, layer.height / 2);
    layer.beginShape();
    let n = volhistory.length;
    for (let i = 0; i < n; i++) {
      // map(value, start1, stop1, start2, stop2
      let vol = volhistory[i];
      let r = map(vol, 0, 1, 10, layer.width * 8);
      let x = r * cos(i);
      let y = r * sin(i);
      layer.vertex(x, y);
      // console.log('index', this.index, 'vol', vol, 'x', x, 'y', y);
    }
    layer.endShape();
    layer.pop();
    if (volhistory.length > 360) {
      volhistory.splice(0, 1);
    }
  }
}

// https://editor.p5js.org/jht1493/sketches/BnkIJwE5R
// 17.1_playMode ui edit visual

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
// const iterable = [10, 20, 30];
// for (let value of iterable) {
//   value += 1;
//   console.log(value);
// }
// 11
// 21
// 31
