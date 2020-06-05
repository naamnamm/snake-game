//Done
//draw a snake
//make snack move
//control the snack movement
//draw apple 
//show apple randomly

//TO DO
//check for collusion

const log = console.log
let interval = null;

const snake = {
  width: 20,
  height: 20,
  xSpeed: 20,
  ySpeed: 0,
  direction: 'right'
}

let snakePosition = [
  { x: 200, y: 150 },
  { x: 180, y: 150 },
  { x: 160, y: 150 },
  { x: 140, y: 150 },
  { x: 120, y: 150 }
];

window.onload = function () {
  let framePerSecond = 10;
  let canvas = document.getElementById('game-canvas')
  let context = canvas.getContext('2d')
  canvas.width = 600;
  canvas.height = 400;
  let appleRadius = 10;
  let keyCode = null;
  //let randomApple = getRandomApplePosition(context, appleRadius);

  interval = setInterval(function () {

    log(snakePosition)
    drawCanvas(context);
    drawSnake(context);
    moveSnake();
    checkIfGameIsOver(context)
    controlSnake(keyCode);
    drawApple(context, appleRadius);
    checkifUserScores()

  }, 1000)

  const stopButtonEl = document.getElementById('stop-btn');
  stopButtonEl.addEventListener('click', stopInterval)

  document.body.addEventListener('keydown', e => keyCode = e.key)
}

function stopInterval() {
  clearInterval(interval);
}

function drawCanvas(context) {
  context.fillStyle = 'black';
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);

  context.fillStyle = 'green';
  context.fillRect(300, 130, 20, 20);
  context.fillStyle = 'green';
  context.fillRect(280, 130, 20, 20);
  context.fillStyle = 'green';
  context.fillRect(260, 130, 20, 20);
  context.fillStyle = 'green';
  context.fillRect(240, 130, 20, 20);
  context.fillStyle = 'green';
  context.fillRect(220, 130, 20, 20);
}

function drawSnake(context) {
  snakePosition.forEach(position => {
    context.fillStyle = 'skyblue';
    context.fillRect(position.x, position.y, snake.width, snake.height)
  })
}

function moveSnake() {
  let head = { x: snakePosition[0].x + snake.xSpeed, y: snakePosition[0].y + snake.ySpeed }

  snakePosition.unshift(head);
  snakePosition.pop();
}

function checkifUserScores() {
  log(snakePosition[0].x, snakePosition[0].y)

  if (snakePosition[0].x === 300 && snakePosition[0].y === 150) {
    if (snake.direction === 'right') {
      log('user scores right')
    }
    if (snake.direction === 'left') {
      log('user scores left')
    }
    if (snake.direction === 'up') {
      log('user scores up')
    }
    if (snake.direction === 'down') {
      log('user scores down')
    }
  }

}

function checkIfGameIsOver(context) {
  //touch the wall
  let gameOverX = snakePosition[0].x >= context.canvas.width || snakePosition[0].x <= 0;
  let gameOverY = snakePosition[0].y >= context.canvas.height || snakePosition[0].y <= 0;

  //touch itself

  if (gameOverX || gameOverY) {
    resetTheGame()
  }
}

// function checkIfSnackEatsApple () {
//   if (snakePosition[0].x  )

// }

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

function controlSnake(keyCode) {
  if (keyCode === 'ArrowDown') {
    snake.xSpeed = 0;
    snake.ySpeed = 20;
    snake.direction = 'down';
  }

  if (keyCode === 'ArrowUp') {
    snake.xSpeed = 0;
    snake.ySpeed = -20;
    snake.direction = 'up';
  }

  if (keyCode === 'ArrowLeft') {
    snake.xSpeed = -20;
    snake.ySpeed = 0;
    snake.direction = 'left';
  }

  if (keyCode === 'ArrowRight') {
    snake.xSpeed = 20;
    snake.ySpeed = 0;
    snake.direction = 'right';
  }
}

function drawApple(context, appleRadius) {
  context.fillStyle = 'red';
  context.strokeStyle = "white";
  context.beginPath();
  context.arc(300 + appleRadius, 150 + appleRadius, appleRadius, 0, 2 * Math.PI);
  context.fill()
  context.stroke();
}

function getRandomApplePosition(context, appleRadius) {
  let min = appleRadius;
  let maxX = context.canvas.width;
  let maxY = context.canvas.height;

  let arrayOfX = snakePosition.map(position => position.x)
  let arrayOfY = snakePosition.map(position => position.y)

  let randomX = Math.floor(Math.random() * (maxX - min + 1)) + min;
  let randomY = Math.floor(Math.random() * (maxY - min + 1)) + min;

  return arrayOfX.indexOf(randomX) >= 0 || arrayOfY.indexOf(randomY) >= 0 ?
    getRandomApplePosition() : [randomX, randomY]

}





