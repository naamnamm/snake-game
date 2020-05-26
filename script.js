//draw a snack
//make snack move
//draw apple 
//show apple randomly

const log = console.log

let xSpeed = 5;
let interval;

const stopButtonEl = document.getElementById('stop-btn');
stopButtonEl.addEventListener('click', stopInterval)

window.onload = function () {
  let canvas = document.getElementById('game-canvas')
  let context = canvas.getContext('2d')
  canvas.width = 600;
  canvas.height = 400;
  let framePerSecond = 30;
  let xPosition = 450;
  let snakeWidth = 100;


  interval = setInterval(function () {
    xPosition += xSpeed
    moveSnack(context, xPosition, snakeWidth);
    drawSnack(context, xPosition, snakeWidth);

    log(xPosition);
    log(xSpeed);


  }, 1000 / framePerSecond)

}

function stopInterval() {
  clearInterval(interval);
}


function moveSnack(context, xPosition, snakeWidth) {
  //debugger;
  if (xPosition > (context.canvas.width - snakeWidth)) {
    xSpeed = -xSpeed
  }

  if (xPosition < 0) {
    xSpeed = -xSpeed
  }

}

function drawSnack(context, xPosition, snakeWidth) {
  //debugger;
  log(xPosition)
  context.fillStyle = 'black';
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);

  context.fillStyle = 'skyblue';
  context.fillRect(xPosition, 100, snakeWidth, 20);

}





