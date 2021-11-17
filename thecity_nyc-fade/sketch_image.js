function load_image(rec) {
  loadImage(rec.fpath, (img) => {
    // console.log(a_recs.length, 'loadImage', rec.fpath);
    // console.log('img.width', img.width, 'img.height', img.height);
    if (a_monoc) mono_img(img);
    if (a_mask) mask_img(img);
    rec.img = img;
    a_recs.push(rec);
  });
}

let m_layer;

function mask_img(img) {
  if (!m_layer) {
    m_layer = createGraphics(img.width, img.height);
    m_layer.background(0, 0, 0, 0);
    m_layer.fill(255, 255, 255, 255);
    let w = img.width;
    let h = img.height;
    m_layer.ellipse(w / 2, h / 2, w, h);
  }
  img.mask(m_layer);
}

function mono_img(img) {
  img.loadPixels();
  for (i = 0; i < img.pixels.length; i += 4) {
    let avg = (img.pixels[i] + img.pixels[i + 1] + img.pixels[i + 2]) / 3;
    img.pixels[i] = avg;
    img.pixels[i + 1] = avg;
    img.pixels[i + 2] = avg;
  }
  img.updatePixels();
}

// d: 'SHAIMEEK RAIJEEN FRAZIER, 21, The Bronx',
// e: 'April 23, 2020',
// h: 'https://projects.thecity.nyc/covid-19-deaths-img/Shaimeek_Frazier.jpg',
