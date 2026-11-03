let ballX = 300,
  ballY = 200;
let vx = 0,
  vy = 0;
let radius = 26;
let colorHex = "#4caf50";

let anchorX = 180,
  anchorY = 200;

let dragging = false;

// rainbow colors (choose randomly on bounce)
let rainbow = [
  "#e61400",
  "#ff7f00",
  "#ffd100",
  "#24c400",
  "#00bcd4",
  "#3f51b5",
  "#8e24aa",
];

function setup() {
  createCanvas(500, 400);
}

function draw() {
  background(240);

  // draw anchor
  noStroke();
  fill(0, 120);
  circle(anchorX, anchorY, 8);

  if (dragging) {
    drawChain(anchorX, anchorY, ballX, ballY, 8);
  }

  if (dragging) {
    ballX = mouseX;
    ballY = mouseY;
    vx = 0;
    vy = 0;
  } else {
    vy = vy + 0.25;
    vx = vx * 0.996;
    vy = vy * 0.996;

    // move ball
    ballX = ballX + vx;
    ballY = ballY + vy;

    if (ballX - radius < 0) {
      ballX = radius;
      vx = -vx * 0.9;
      colorHex = randomRainbow();
    }
    if (ballX + radius > width) {
      ballX = width - radius;
      vx = -vx * 0.9;
      colorHex = randomRainbow();
    }
    if (ballY - radius < 0) {
      ballY = radius;
      vy = -vy * 0.9;
      colorHex = randomRainbow();
    }
    if (ballY + radius > height) {
      ballY = height - radius;
      vy = -vy * 0.9;
      colorHex = randomRainbow();
    }
  }

  // draw the ball
  fill(colorHex);
  stroke(30);
  circle(ballX, ballY, radius * 2);
}

function mousePressed() {
  dragging = true;

  ballX = mouseX;
  ballY = mouseY;
  vx = 0;
  vy = 0;
}
function touchStarted() {
  mousePressed();
  return false; // prevent default
}

function mouseReleased() {
  if (dragging) {
    let dx = ballX - anchorX;
    let dy = ballY - anchorY;
    const POWER = 0.18; // how strong the fling is
    vx = dx * POWER;
    vy = dy * POWER;

    const maxSpeed = 1000000000000000000;
    let speed = sqrt(vx * vx + vy * vy);
    if (speed > maxSpeed) {
      vx = vx * (maxSpeed / speed);
      vy = vy * (maxSpeed / speed);
    }
  }
  dragging = false;
}
function touchEnded() {
  mouseReleased();
  return false;
}

function drawChain(x1, y1, x2, y2, count) {
  noStroke();
  fill(70);
  let dx = (x2 - x1) / (count + 1);
  let dy = (y2 - y1) / (count + 1);
  for (let i = 1; i <= count; i++) {
    let t = i / (count + 1);
    let cx = x1 + dx * i;
    let cy = y1 + dy * i - 10 * sin(PI * t);
    circle(cx, cy, 8);
  }
}
function randomRainbow() {
  return rainbow[floor(random(rainbow.length))];
}
