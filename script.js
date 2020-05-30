//Done
//draw a snack
//make snack move

//TO DO
//control the snack movement
//draw apple 
//show apple randomly

const log = console.log

let xSpeed = 5;
let ySpeed = 5;
let intervalX;
let intervalY;
let keyCode;

const stopButtonEl = document.getElementById('stop-btn');
stopButtonEl.addEventListener('click', stopIntervalX)

// const getKey = document.getElementById('get-key')
// getKey.addEventListener('keydown', function (e) {
//   log(e)
// })



window.onload = function () {
  let canvas = document.getElementById('game-canvas')
  let context = canvas.getContext('2d')
  canvas.width = 600;
  canvas.height = 400;
  let framePerSecond = 30;
  let xPosition = 450;
  let yPosition = 100;
  let snakeWidth = 20;


  intervalX = setInterval(function () {
    xPosition += xSpeed
    moveSnake(context, xPosition, yPosition, snakeWidth);
    drawSnake(context, xPosition, yPosition, snakeWidth);
  }, 1000 / framePerSecond)

  intervalY = setInterval(function () {
    yPosition += ySpeed
    moveSnake(context, xPosition, yPosition, snakeWidth);
    drawSnake(context, xPosition, yPosition, snakeWidth);
  }, 1000 / framePerSecond)

}

// function startIntervalY() {
//   setInterval(function () {
//     let canvas = document.getElementById('game-canvas')
//     let context = canvas.getContext('2d')
//     canvas.width = 600;
//     canvas.height = 400;
//     let yPosition = 100;
//     let snakeWidth = 20;
//     let xPosition = context.canvas.width - snakeWidth
//     yPosition += ySpeed
//     moveSnake(context, xPosition, yPosition, snakeWidth);
//     drawSnake(context, xPosition, yPosition, snakeWidth);
//   }, 3000)
// }


function stopIntervalX() {
  clearInterval(intervalX);
}

function stopIntervalY() {
  clearInterval(intervalY);
}


function moveSnake(context, xPosition, yPosition, snakeWidth, keyCode) {
  //debugger;
  if (xPosition < (context.canvas.width - snakeWidth)) {
    stopIntervalY();
  }

  if (xPosition === (context.canvas.width - snakeWidth)) {
    stopIntervalX();
  }

  if (xPosition < 0) {
    xSpeed = -xSpeed
    //TO DO: gameover
  }

}

function drawSnake(context, xPosition, yPosition, snakeWidth, keyCode) {
  //debugger;
  context.fillStyle = 'black';
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);

  context.fillStyle = 'skyblue';
  context.fillRect(xPosition, yPosition, snakeWidth, 20);

  log(xPosition, yPosition)

}





