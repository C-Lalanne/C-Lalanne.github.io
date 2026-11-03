let racerXs = [30, 80, 30, 30];
let startY = 50;
let yStep = 60;
let finishX = 560;
let speedX = 0;
let speedY = 0;


function setup() {
  createCanvas(600, startY + yStep * racerXs.length);
}

function draw() {
  background(240);
  line(finishX, 0, finishX, height);
  for (let i = 0; i < racerXs.length; i++) {
    let y = startY + yStep * i;
    if (racerXs[i] < finishX) {
      racerXs[i] += random(speedX = 1, speedY = 3);
    if (mouseButton.left) {
      speedX = 50;
      speedY = 50;
    }
    }
    circle(racerXs[i], y, 24);
  }
}