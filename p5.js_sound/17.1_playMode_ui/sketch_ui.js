function sketch_ui(ui) {
  {
    let span = createSpan('song:');
    span.style('font-size', '16pt');
    span.style('margin', '0pt 0pt 0pt 4pt');

    let aselect = createSelect();
    aselect.style('font-size', '12pt');
    aselect.style('margin', '2pt 2pt');
    for (let asong of ui.song_list) {
      aselect.option(asong);
    }
    aselect.selected(ui.song_list[0]);
    aselect.changed(function () {
      let nsong = this.value();
      set_song(nsong);
    });
  }
  createP();
  {
    let elm = createSpan().id('duration');
    elm.style('font-size', '30px');
  }
  {
    let elm = createSpan().id('currentTime');
    elm.style('font-size', '30px');
  }
  createP();
  {
    let elm = createSpan().id('a_volume');
    elm.style('font-size', '30px');
  }
  {
    let elm = createSpan().id('a_pan');
    elm.style('font-size', '30px');
  }
  {
    let elm = createSpan().id('a_rate');
    elm.style('font-size', '30px');
  }
  createP();
  {
    let span = createSpan('volume:');
    span.style('font-size', '30px');
    // createSlider(min, max, [value], [step])
    let slider = createSlider(0, 1, a_volume, 0.01);
    slider.style('width', '360px');
    slider.input(function () {
      a_volume = slider.value();
    });
  }
  createP();
  {
    let span = createSpan('pan:');
    span.style('font-size', '30px');
    // createSlider(min, max, [value], [step])
    let slider = createSlider(-1, 1, a_pan, 0.01);
    slider.style('width', '360px');
    slider.input(function () {
      a_pan = slider.value();
    });
  }
  createP();
  {
    let span = createSpan('rate:');
    span.style('font-size', '30px');
    // createSlider(min, max, [value], [step])
    // 0, 1.5, 1, 0.01
    let slider = createSlider(-2, 2, a_rate, 0.01);
    slider.style('width', '360px');
    slider.input(function () {
      a_rate = slider.value();
    });
  }
  createP();
  {
    let btn = createButton('play');
    btn.style('font-size', '30px');
    btn.mousePressed(play_action);
  }
  {
    let btn = createButton('stop');
    btn.style('font-size', '30px');
    btn.mousePressed(stop_action);
  }
  createP();
  {
    let span = createSpan('playModes:');
    span.style('font-size', '30px');
  }
  // playModes = ['restart', 'sustain', 'untilDone'];
  for (let mode of ui.playModes) {
    let btn = createButton(mode).id('playMode_btn_' + mode);
    btn.style('font-size', '30px');
    btn.mousePressed(function () {
      ui_set_playMode(mode);
    });
  }
  createP();
  for (let index = 0; index < 4; index++) {
    let btn = createButton('loop' + index).id('loop_btn_' + index);
    btn.style('font-size', '30px');
    btn.mousePressed(function () {
      ui_set_loop(index);
    });
  }
  createP();
  {
    let elm = createSpan().id('loop');
    elm.style('font-size', '30px');
  }

  function ui_set_loop(nindex) {
    for (let index = 0; index < 4; index++) {
      select('#loop_btn_' + index).style('background-color', 'white');
    }
    select('#loop_btn_' + nindex).style('background-color', 'gray');
    set_loop(nindex);
  }

  function ui_set_playMode(nmode) {
    for (mode of ui.playModes) {
      select('#playMode_btn_' + mode).style('background-color', 'white');
    }
    select('#playMode_btn_' + nmode).style('background-color', 'gray');
    set_playMode(nmode);
  }
}

function show_num(label, num) {
  let elm = select('#' + label);
  num = round(num, 2);
  elm.html('[' + label + ' ' + num + '] ');
}

function show_value(label, value) {
  let elm = select('#' + label);
  value = JSON.stringify(value);
  elm.html('[' + label + ' ' + value + '] ');
}
