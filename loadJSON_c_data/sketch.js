// Extracting data from specific zip code in Brooklyn
// data can be viewed online here:
// https://github.com/EP-Visual-Design/COVID-19-parsed-data

let a_data;
let a_index;
let a_zip = '11234';
let a_location = 'Brooklyn ' + a_zip;
let a_num;
let a_points;
let a_font;

function preload() {
  a_font = loadFont('../assets/inconsolata.otf');
  console.log('a_font inconsolata', a_font);
}

function setup() {
  createCanvas(400, 200);
  let url = 'https://epvisual.com/COVID-19-Impact/Dashboard/a0/';
  url += 'c_data/nyc/c_subs/Brooklyn/c_series/' + a_zip + '.json';
  loadJSON(url, got_data);
  sketch_ui();
}

function draw() {
  background(200);
  let botMargin = 30;
  let thi = height;
  textSize(thi);
  if (a_num) {
    text(a_num + '', 20, height - botMargin);
  }
  if (a_num && !a_points && a_font) {
    let tsize = 50;
    a_points = a_font.textToPoints(a_num + '', 0, 0, tsize, {
      sampleFactor: 5,
      simplifyThreshold: 0,
    });
    // console.log('a_points', a_points);
    console.log('a_points.length', a_points.length);
  }
}

// textToPoints(txt, x, y, fontSize, [options])

function got_data(data) {
  // print('data', data);
  a_data = data;
  a_index = data.length - 1;
  console.log('data last', data[a_index]);
  console.log('a_index', a_index);
  show_at_index();
}

function sketch_ui() {
  {
    let elm = createSlider(0, width, width);
    elm.style('width', width + 'px');
    elm.input(() => {
      let val = elm.value();
      let m = a_data.length - 1;
      a_index = Math.trunc(m * (val / width));
      show_at_index();
    });
  }

  {
    let elm = createSpan('').id('msg0');
  }

  createP();

  {
    let elm = createDiv().id('msg');
    elm.style('font-size', '20px');
  }
}

function show_at_index() {
  let itm = a_data[a_index];
  let msg = 'index ' + a_index;
  show_text('msg0', msg);
  msg = ' On ' + itm.on + '<br>';
  msg += '<span style="font-size:40px" >';
  msg += itm.Deaths + '</span><br>';
  msg += ' Total deaths ';
  msg += ' in ' + a_location;
  show_text('msg', msg);
  a_num = itm.Deaths;
  a_points = null;
}

function show_text(label, text) {
  let elm = select('#' + label);
  elm.html(text);
}

// https://p5js.org/reference/#/p5.Font/textToPoints
