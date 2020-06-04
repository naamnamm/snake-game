//Done
//draw a snack
//make snack move
//control the snack movement

//TO DO
//draw apple 
//show apple randomly

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
  xSpeed: 10,
  ySpeed: 0
}

let snakePosition = [
  { x: 160, y: 150 },
  { x: 140, y: 150 },
  { x: 120, y: 150 },
  { x: 100, y: 150 },
  { x: 80, y: 150 }
];


window.onload = function () {

  let framePerSecond = 15;
  interval = setInterval(function () {
    drawCanvas();
    moveSnake();
    drawSnake();
    controlSnake();
  }, 1000)

  const stopButtonEl = document.getElementById('stop-btn');
  stopButtonEl.addEventListener('click', stopInterval)

  document.body.addEventListener('keydown', e => keyCode = e.key)

}

function stopInterval() {
  clearInterval(interval);
}

function drawCanvas() {
  context.fillStyle = 'black';
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);
}

function drawSnake() {
  log(snakePosition);
  snakePosition.forEach(position => drawSnakeParts(position))
}

function drawSnakeParts(position) {
  context.fillStyle = 'skyblue';
  context.fillRect(position.x, position.y, snake.width, snake.height);
}

function moveSnake() {
  let head = { x: snakePosition[0].x += snake.xSpeed, y: snakePosition[0].y += snake.ySpeed }

  snakePosition.unshift(head);
  snakePosition.pop();
}

function controlSnake() {
  if (keyCode === 'ArrowDown') {
    snake.xSpeed = 0;
    snake.ySpeed = 10;
  }
}








