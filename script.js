//Done
//draw a snake
//make snack move
//control the snack movement
//draw apple 
//show apple randomly

//TO DO
//check for colission

const log = console.log
let interval = null;
let keyCode = null;
let canvas = document.getElementById('game-canvas')
let context = canvas.getContext('2d')
canvas.width = 600;
canvas.height = 400;

const snake = {
  width: 20,
  height: 20,
  xSpeed: 20,
  ySpeed: 0,
  direction: 'ArrowRight'
}

let snakePosition = [
  { x: 200, y: 150 },
  { x: 180, y: 150 },
  { x: 160, y: 150 },
  { x: 140, y: 150 },
  { x: 120, y: 150 }
];


window.onload = function () {

  let framePerSecond = 30;

  interval = setInterval(function () {
    drawCanvas();
    drawSnake();
    moveSnake();
    controlSnake();
    drawApple();
  }, 1000 / 10)

  const stopButtonEl = document.getElementById('stop-btn');
  stopButtonEl.addEventListener('click', stopInterval)

  document.body.addEventListener('keydown', e => snake.direction = e.key)

}

function stopInterval() {
  clearInterval(interval);
}

function drawCanvas() {
  context.fillStyle = 'black';
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);
}

function drawSnake() {
  snakePosition.forEach(position => drawSnakeParts(position))
}

function drawSnakeParts(position) {
  context.fillStyle = 'skyblue';
  context.fillRect(position.x, position.y, snake.width, snake.height);
}

function moveSnake() {
  let head = { x: snakePosition[0].x + snake.xSpeed, y: snakePosition[0].y + snake.ySpeed }

  snakePosition.unshift(head);
  snakePosition.pop();

  checkIfGameIsOver();
}

function checkIfGameIsOver() {
  let gameOverX = snakePosition[0].x >= canvas.width || snakePosition[0].x <= 0;

  let gameOverY = snakePosition[0].y >= canvas.height || snakePosition[0].y <= 0;

  if (gameOverX || gameOverY) {
    resetTheGame()
  }
}

function resetTheGame() {
  snakePosition = [
    { x: 200, y: 150 },
    { x: 180, y: 150 },
    { x: 160, y: 150 },
    { x: 140, y: 150 },
    { x: 120, y: 150 }
  ];

  snake.direction = 'ArrowRight';
}

function controlSnake() {
  if (snake.direction === 'ArrowDown') {
    snake.xSpeed = 0;
    snake.ySpeed = 20;
    snake.direction = 'down';
  }

  if (snake.direction === 'ArrowUp') {
    snake.xSpeed = 0;
    snake.ySpeed = -20;
    snake.direction = 'up';
  }

  if (snake.direction === 'ArrowLeft') {
    snake.xSpeed = -20;
    snake.ySpeed = 0;
    snake.direction = 'left';
  }

  if (snake.direction === 'ArrowRight') {
    snake.xSpeed = 20;
    snake.ySpeed = 0;
    snake.direction = 'right';
  }
}

function drawApple() {
  context.fillStyle = 'red';
  context.strokeStyle = "white";
  context.beginPath();
  context.arc(100, 100, 10, 0, 2 * Math.PI);
  context.fill()
  context.stroke();
}

function getRandomApplePosition() {
  //get random number for x & y coordunate
  let min = 10;
  let maxX = 600;
  let maxY = 400;

  let arrayOfX = snakePosition.map(position => position.x)
  let arrayOfY = snakePosition.map(position => position.y)
  //number x from 10-600
  let randomX = Math.floor(Math.random() * (maxX - min + 1)) + min;
  let randomY = Math.floor(Math.random() * (maxY - min + 1)) + min;
  // x != snake.x
  return arrayOfX.indexOf(randomX) >= 0 || arrayOfY.indexOf(randomY) >= 0 ?
    getRandomApplePosition() : [randomX, randomY]

}





