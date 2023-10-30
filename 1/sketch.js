class Button {
  constructor(_label, _x, _y, _onClick) {
    this.button = createButton(_label);
    this.button.position(_x, _y);
    this.button.style("width", width / 8 + "px");
    this.button.style("height", "30px");
    this.button.mouseClicked(_onClick);
  }

  html(_label) {
    this.button.html(_label);
  }

  doubleClicked(_onDoubleClicked) {
    this.button.doubleClicked(_onDoubleClicked);
  }
}

let allSongs = [];
let songIndex;

let song;

let waveDiameters;
let DELAY = 0;

let shouldRestart;

// buttons
let backButton;
let playButton;
let stopButton;
let nextButton;

let buttonY;

function preload() {
  allSongs.push(loadSound("sound1020.mp3"));
}

function toWidth(_peakVal) {
  return map(abs(_peakVal), 0, 1, 0, width);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();

  songIndex = 0;
  song = allSongs[songIndex];
  waveDiameters = song.getPeaks().map(toWidth);
  buttonY = height - 40;

  // init buttons
  backButton = new Button("⏮", 40, buttonY, backClicked);
  playButton = new Button("⏵", 80 + width / 8, buttonY, playClicked);
  stopButton = new Button("■", 120 + width / 4, buttonY, stopClicked);
  nextButton = new Button("⏭", 160 + 0.375 * width, buttonY, nextClicked);

  backButton.doubleClicked(backDoubleClicked);

  // for skipping back when paused
  shouldRestart = false;
}

function draw() {
  // let's keep this visualization
  //   but add a blueish color for paused
  if (song.isPlaying()) {
    background(120, 220, 20, 20);
    playButton.html("▮▮");
  } else if (song.isPaused()) {
    background(20, 120, 220, 20);
    playButton.html("⏵");
  } else {
    background(220, 20, 120, 20);
    playButton.html("⏵");
  }

  if (song.isPlaying()) {
    let tPos = song.currentTime() / song.duration();
    let dIndexDelay = floor(tPos * waveDiameters.length + DELAY);
    let dIndex = constrain(dIndexDelay, 0, waveDiameters.length - 1);
    let diam = waveDiameters[dIndex];
    ellipse(width / 2, height / 2, diam, diam);
  }
}

function backClicked() {
  if (song.isPlaying()) {
    song.jump(0);
  } else if (song.isPaused()) {
    shouldRestart = true;
  } else {
    song.stop();
  }
}

function backDoubleClicked() {
  let wasPlaying = song.isPlaying();
  let wasPaused = song.isPaused();

  song.stop();
  songIndex = (songIndex + allSongs.length - 1) % allSongs.length;
  song = allSongs[songIndex];
  waveDiameters = song.getPeaks().map(toWidth);

  if (wasPlaying) {
    song.play();
  } else if (wasPaused) {
    song.play();
    song.pause();
    shouldRestart = true;
  }
}


function playClicked() {
  // if playing, pause
  // if paused or stopped, play
  // if during pause the back button was pressed, restart
  if (song.isPlaying()) {
    song.pause();
  } else if (song.isPaused()) {
    song.play();
    if (shouldRestart) {
      song.jump(0);
      shouldRestart = false;
    }
  } else {
    song.play();
  }
}

function stopClicked() {
  // always stop.
  // just make sure that whenever it restarts
  //   it starts in the beginning.
  song.stop();
}
