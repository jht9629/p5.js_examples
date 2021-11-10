let a_song;
let a_volume = 0.5;
let a_pan = 0;
let a_rate = 1;
let song_list = [
  // 'media/Reference Scales_Chromatic Scale On F Sharp.mp3',
  'media/Reference Scales_Chromatic Scale On F Sharp',
  'media/Reference Scales_On A Flat-G Sharp',
  'media/Reference Scales_On A',
  'media/Reference Scales_On B Flat',
  'media/Reference Scales_On B',
  'media/Reference Scales_On C Sharp-D Flat ',
  'media/Reference Scales_On C',
  'media/Reference Scales_On D',
  'media/Reference Scales_On E Flat-D Sharp',
  'media/Reference Scales_On E',
  'media/Reference Scales_On F Sharp-G Flat',
  'media/Reference Scales_On F',
  'media/Reference Scales_On G',
  'media/Reference Scales_Pentatonic on F Sharp',
  'media/Reference Scales_Whole Tone On C Sharp',
  'media/Reference scales_Whole Tone On C',
];
let song_file = song_list[0];
let loop_args = [
  null, // loop 0
  { cueStart: 3.1, cueEnd: 4, startTime: 0, rate: 1, amp: 1 }, // 1
  { cueStart: 5.8, cueEnd: 10.5, startTime: 0, rate: 1, amp: 1 }, // 2
  { cueStart: 10, cueEnd: 11, startTime: 0, rate: 1, amp: 1 }, // 3
  { cueStart: 8, cueEnd: 9, startTime: 0, rate: 1, amp: 1 },
];
let playModes = ['restart', 'sustain', 'untilDone'];

function setup() {
  console.log('setup song_file', song_file);
  createCanvas(400, 80);
  // a_song = loadSound(song_file, sound_loaded);
  a_song = loadSound(song_file+'.mp3', sound_loaded);
  sketch_ui({ playModes, song_list });
}

function sound_loaded() {
  console.log('sound_loaded song_file', song_file);
  console.log('a_song.duration()', a_song.duration());
  // a_song.play();
  // a_song.loop();
  a_song.setVolume(a_volume);
  // a_song.playMode('restart');
  show_num('duration', a_song.duration());
}

function set_song(nsong) {
  if (a_song) a_song.stop();
  song_file = nsong;
  a_song = loadSound(nsong+'.mp3', sound_loaded);
}

function draw() {
  background(200);
  text(song_file, 10, height / 2);
  text(a_song.currentTime(), 10, height - 20);

  a_song.setVolume(a_volume);
  a_song.pan(a_pan);
  a_song.rate(a_rate);

  show_num('currentTime', a_song.currentTime());
  show_num('a_volume', a_volume);
  show_num('a_pan', a_pan);
  show_num('a_rate', a_rate);
}

function set_loop(index) {
  // !!@ Documentation incorrect
  // loop([startTime], [rate], [amp], [cueStart], [cueEnd])
  let a = loop_args[index];
  console.log('set_loop a', a);
  if (!a) {
    a_song.loop();
    a = {};
  } else {
    a_song.loop(a.startTime, a.rate, a.amp, a.cueStart, a.cueEnd);
  }
  show_value('loop', a);
}

function play_action() {
  a_song.play();
}

function stop_action() {
  a_song.stop();
}

function set_playMode(mode) {
  console.log('set_playMode', mode);
  a_song.playMode(mode);
}

// UI: Examples:
// selection song drop down, sliders, multi-state buttons

// Issues:

// loop documentation incorrect:
// https://p5js.org/reference/#/p5.SoundFile/loop
// Syntax duration --> cueEnd

// - currentTime() not reported consistently

// - song_file name reported oddly.
//   'media/Reference Scales_Chromatic Scale On F Sharp.mp3',

// loop 3: goes to end
// { cueStart: 8, cueEnd: 9, startTime: 0, rate: 1, amp: 1 }, // loop3

// Safari: play / stop / playMode restart / play
// [Error] InvalidStateError: The object is in an invalid state.
// 	stop (p5.sound.min.js:2:65311)
// 	(anonymous function) (p5.sound.min.js:2:65311)
// 	(anonymous function) (p5.sound.min.js:2:107542)
// 	play_action (sketch.js:79)
// 	eventPrependedFxn

// Chrome: play
// Uncaught TypeError: Cannot read property 'length' of undefined
//     at RingBuffer.push (5d8e6962-852d-4986-9aba-533290420b39:75)
//     at AudioWorkletProcessor.process (5d8e6962-852d-4986-9aba-533290420b39:170)
// push @ 5d8e6962-852d-4986-9aba-533290420b39:75
// process @ 5d8e6962-852d-4986-9aba-533290420b39:170

// Chrome: no currentTime

// Chrome: no pan

// -- Credits ------------------------------------
// https://github.com/CodingTrain/website/tree/main/Tutorials/P5JS/p5.js_sound
// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/Pn1g1wjxl_0
//
// https://www.youraccompanist.com/free-scales-and-warm-ups/reference-scales
