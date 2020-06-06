const DEBUG = false;

const log = console.log
let interval = null;

const snake = {
  width: 20,
  height: 20,
  xSpeed: 20,
  ySpeed: 0,
  direction: 'right',
  position: [
    { x: 200, y: 150 },
    { x: 180, y: 150 },
    { x: 160, y: 150 },
    { x: 140, y: 150 },
    { x: 120, y: 150 }
  ]
}

window.onload = function () {
  let timeInterval = 500;
  let canvas = document.getElementById('game-canvas')
  let context = canvas.getContext('2d')
  canvas.width = 600;
  canvas.height = 400;

  let keyCode = null;

  const apple = {
    radius: 10,
    eaten: false,
    position: {
      x: getRandomApplePosition(context)[0],
      y: getRandomApplePosition(context)[1]
    }
  }

  if (DEBUG === true) {
    apple.position.x = 300;
    apple.position.y = 150;
    timeInterval = 1000;
  }

  interval = setInterval(function () {
    drawCanvas(context);
    moveSnake();
    drawSnake(context);
    checkIfGameIsOver(context, apple)
    controlSnake(keyCode);
    drawApple(context, apple);
    checkifUserScores(apple, context)
    log(snake)
    log(apple.position.x, apple.position.y)
  }, timeInterval)

  const stopButtonEl = document.getElementById('stop-btn');
  stopButtonEl.addEventListener('click', stopInterval)

  document.addEventListener('keydown', e => keyCode = e.key)
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
  snake.position.forEach(position => {
    context.fillStyle = 'skyblue';
    context.fillRect(position.x, position.y, snake.width, snake.height)
  })
}

function moveSnake() {
  //debugger;
  let head = { x: snake.position[0].x + snake.xSpeed, y: snake.position[0].y + snake.ySpeed }
  snake.position.unshift(head);
  snake.position.pop();
}

function checkifUserScores(apple, context) {
  log(snake.position[0].x, snake.position[0].y)
  log(apple.position.x, apple.position.y)
  //debugger;

  //let appleRange = apple.posit

  if (snake.position[0].x === apple.position.x && snake.position[0].y === apple.position.y) {
    //debugger;
    apple.eaten = true;
    getRandomApplePosition(context);
    log(getRandomApplePosition(context)[0])

    log('user scores')
  }

}

function checkIfGameIsOver(context, apple) {
  //touch the wall
  let gameOverX = snake.position[0].x >= context.canvas.width || snake.position[0].x <= 0;
  let gameOverY = snake.position[0].y >= context.canvas.height || snake.position[0].y <= 0;

  //touch itself

  if (gameOverX || gameOverY) {
    //just to see if random apple fx works
    apple.eaten = true;
    apple.position.x = getRandomApplePosition(context)[0]
    apple.position.y = getRandomApplePosition(context)[1]
    //------------------------------------
    resetTheGame()
  }
}


function resetTheGame() {
  snake.position = [
    { x: 200, y: 150 },
    { x: 180, y: 150 },
    { x: 160, y: 150 },
    { x: 140, y: 150 },
    { x: 120, y: 150 }
  ];
  keyCode = 'ArrowRight';
  snake.direction = 'right'
  snake.xSpeed = 20;
  snake.ySpeed = 0;
  log(snake.position)

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

function drawApple(context, apple) {
  context.fillStyle = 'red';
  context.strokeStyle = "white";
  context.beginPath();
  context.arc(apple.position.x + apple.radius, apple.position.y + apple.radius, apple.radius, 0, 2 * Math.PI);
  context.fill()
  context.stroke();
}

function getRandomApplePosition(context) {
  let min = 10;
  let maxX = context.canvas.width;
  let maxY = context.canvas.height;

  let arrayOfX = snake.position.map(position => position.x)
  let arrayOfY = snake.position.map(position => position.y)

  let randomX = Math.floor(Math.random() * (maxX - min + 1)) + min;
  let randomY = Math.floor(Math.random() * (maxY - min + 1)) + min;

  return arrayOfX.indexOf(randomX) >= 0 || arrayOfY.indexOf(randomY) >= 0 ?
    getRandomApplePosition() : [randomX, randomY]

}





