let a_recs = [];
let load_index = 0;
let tint_index = 0;
let a_run = 1;
let a_fast = 0;
let a_fast_n = 30;
let a_monoc = 1;
let a_mask = 1;
let images_prefix = './images/';
let fade_count_secs = 4;
let fade_count = 0;
let fade_index = 0;
let fade_delta = 1;
let hold_count_secs = 3;
let hold_count;
let hold_index = 0;
let tval;
let fps_fixed = 30;

function setup() {
  createCanvas(800, 800);
  pixelDensity(1);
  // frameRate(a_fps);
  // background(0);
  sketch_ui();
  console.log('frameRate()', frameRate());
  setFrameRate(fps_fixed);
}

function draw() {
  if (!fade_count) {
    // let fr = Math.round(frameRate());
    let fr = fps_fixed;
    console.log('fr', fr);
    fade_count = fade_count_secs * fr;
    hold_count = hold_count_secs * fr;
  }
  if (!a_run) return;
  draw_step();
}

function draw_step() {
  load_next();
  draw_next();
}

function load_next() {
  if (load_index >= a_refs.length) {
    // load_reset();
    return;
  }
  let rec = a_refs[load_index];
  load_index += 1;
  if (rec.h) {
    let arr = rec.h.split('/');
    let fname = arr[arr.length - 1];
    rec.fpath = images_prefix + fname;
    rec.himg = createImg(rec.fpath, 'image');
    load_image(rec);
  }
}

function draw_next() {
  let step = 0;
  if (tint_index >= a_recs.length) {
    tint_index = 0;
    if (tint_index >= a_recs.length) return;
  }
  background(255);
  fade_index += fade_delta;
  if (fade_delta > 0) {
    if (fade_index >= fade_count) {
      hold_index++;
      if (hold_index > hold_count) {
        fade_index = fade_count;
        fade_delta = -fade_delta;
        hold_index = 0;
      }
    }
  } else {
    // fade_delta less than zero
    if (fade_index <= 0) {
      fade_delta = -fade_delta;
      fade_index = 0;
      step = 1;
    }
  }
  let rec = a_recs[tint_index];
  tint_index += step;
  // let tval = map(fade_index, 0, fade_count, 0, 255);
  tval = map(fade_index, 0, fade_count, 0, 255, true);
  tval = Math.floor(tval);
  // console.log('tval', tval);
  tint(255, tval);
  image(rec.img, 0, 0, width, height);
  let msg = rec.d + ' ' + rec.e;
  // msg += ' ' + tval;
  show_text('msg', msg);
}

function load_reset() {
  removeElements();
  a_recs = [];
  load_index = 0;
  tint_index = 0;
  sketch_ui();
}

// consider sharing libraries/p5.min.js
