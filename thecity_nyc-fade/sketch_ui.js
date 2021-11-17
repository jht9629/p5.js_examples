function sketch_ui() {
  {
    let elm = createSpan().id('msg');
    elm.style('font-size', '20px');
  }
  createP();
  {
    let hsrc = 'https://projects.thecity.nyc/covid-19-deaths/';
    let elm = createA(hsrc, ' Source of images: ' + hsrc);
    elm.attribute('target', '_blank');
    elm.style('font-size', '20px');
  }
  createP();
  {
    let btn = createButton('Full');
    btn.mousePressed(function () {
      toggleFullScreen();
    });
  }
  {
    let btn = createButton('Run');
    btn.mousePressed(function () {
      a_run = !a_run;
    });
  }
  {
    let btn = createButton('Fast');
    btn.mousePressed(function () {
      a_fast = !a_fast;
      frameRate(a_fast ? a_fast_n : 1);
      console.log('a_fast', a_fast, 'a_fast_n', a_fast_n);
    });
  }
  {
    let btn = createButton('monoc');
    btn.mousePressed(function () {
      a_monoc = !a_monoc;
      load_reset();
    });
  }
  createButton('step').mousePressed(function () {
    draw_step();
    a_run = 0;
    console.log('tval', tval);
  });
  createP();
}

function ui_panel() {
  load_index = 0;
  tint_index = 0;
}
function show_text(label, text) {
  let elm = select('#' + label);
  elm.html(text);
}

function show_num(label, num) {
  let elm = select('#' + label);
  num = round(num, 2);
  elm.html('[' + label + ' ' + num + '] ');
}

// https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}
