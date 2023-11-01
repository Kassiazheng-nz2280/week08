let sliderR;
let sliderG;
let sliderB;

let mImage;
let xOff;
let yOff;

function preload() {
  mImage = loadImage("homework.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  print("Original size: ", mImage.width, " x ", mImage.height);
  sliderR = createSlider(0, 255);
  sliderR.position(200, 20);
  sliderR.style("width", "80px");

  sliderG = createSlider(0, 255);
  sliderG.position(200, 50);
  sliderG.style("width", "80px");

  sliderB = createSlider(0, 255);
  sliderB.position(200, 80);
  sliderB.style("width", "80px");

  if (mImage.width > width) {
    mImage.resize(width, 0);
  }
  if (mImage.height > height) {
    mImage.resize(0, height);
  }
  print("Scaled size: ", mImage.width, " x ", mImage.height);

  xOff = (width - mImage.width) / 2;
  yOff = (height - mImage.height) / 2;
  push();
  translate(xOff, yOff);
  image(mImage, 0, 0);
  pop();

  loadPixels();
}

function draw() {
  xOff = (width - mImage.width) / 2;
  yOff = (height - mImage.height) / 2;
  push();
  translate(xOff, yOff);
  image(mImage, 0, 0);
  pop();

  loadPixels();
  let MONDRIAN_BLUE = { r: 20, g: 20, b: 120 };
  let red = { r: 200, g: 60, b: 30 };
  let yellow = { r: 242, g: 196, b: 102 };
  let SIMILARITY_VALUE = 60;
  // console.log(value)
  for (let i = 0; i < pixels.length; i += 4) {
    r = pixels[i];
    g = pixels[i + 1];
    b = pixels[i + 2];
    a = pixels[i + 3];

    if (
      abs(b - MONDRIAN_BLUE.b) < SIMILARITY_VALUE &&
      abs(r - MONDRIAN_BLUE.r) < SIMILARITY_VALUE &&
      abs(g - MONDRIAN_BLUE.g) < SIMILARITY_VALUE
    ) {
      pixels[i] = 243;
      pixels[i + 1] = 120;
      pixels[i + 2] = 245;
    }

    if (
      abs(b - red.b) < SIMILARITY_VALUE &&
      abs(r - red.r) < SIMILARITY_VALUE &&
      abs(g - red.g) < SIMILARITY_VALUE
    ) {
      pixels[i] = sliderR.value();
      pixels[i + 1] = sliderG.value();
      pixels[i + 2] = sliderB.value();
    }

    if (
      abs(b - yellow.b) < SIMILARITY_VALUE &&
      abs(r - yellow.r) < SIMILARITY_VALUE &&
      abs(g - yellow.g) < SIMILARITY_VALUE
    ) {
      pixels[i] = random(0, 255);
      pixels[i + 1] = random(0, 255);
      pixels[i + 2] = random(0, 255);
    }
  }
  updatePixels();
}
