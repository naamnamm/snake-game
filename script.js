//to do
// snake touch itself
// keep track of the score

const DEBUG = true;

const log = console.log
let interval = null;

const snake = {
  width: 20,
  height: 20,
  xSpeed: 20,
  ySpeed: 0,
  direction: 'right',
  position: [
    { x: 200, y: 140 },
    { x: 180, y: 140 },
    { x: 160, y: 140 },
    { x: 140, y: 140 },
    { x: 120, y: 140 }
  ]
}

window.onload = function () {
  let timeInterval = 100;
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
    apple.position.y = 140;
    timeInterval = 100;
  }

  interval = setInterval(function () {
    drawCanvas(context);
    drawApple(context, apple);
    isGameOver(context, apple)
    moveSnake();
    drawSnake(context);
    doesSnakeEatApple(apple, context)
  }, timeInterval)

  const stopButtonEl = document.getElementById('stop-btn');
  stopButtonEl.addEventListener('click', function (e) {
    clearInterval(interval);
  })

  document.addEventListener('keydown', function (e) {
    keyCode = e.key

    if (keyCode === 'ArrowDown') {
      if (snake.direction === 'up') {
        return;
      } else {
        snake.xSpeed = 0;
        snake.ySpeed = 20;
        snake.direction = 'down';
      }
    }

    if (keyCode === 'ArrowUp') {
      if (snake.direction === 'down') {
        return;
      } else {
        snake.xSpeed = 0;
        snake.ySpeed = -20;
        snake.direction = 'up';
      }
    }

    if (keyCode === 'ArrowLeft') {
      if (snake.direction === 'right') {
        return;
      } else {
        snake.xSpeed = -20;
        snake.ySpeed = 0;
        snake.direction = 'left';
      }
    }

    if (keyCode === 'ArrowRight') {
      if (snake.direction === 'left') {
        return;
      } else {
        snake.xSpeed = 20;
        snake.ySpeed = 0;
        snake.direction = 'right';
      }
    }
  });

}

function drawCanvas(context) {
  context.fillStyle = 'black';
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);

  context.fillStyle = 'green';
  context.fillRect(300, 120, 20, 20);
  context.fillStyle = 'green';
  context.fillRect(280, 120, 20, 20);
  context.fillStyle = 'green';
  context.fillRect(260, 120, 20, 20);
  context.fillStyle = 'green';
  context.fillRect(240, 120, 20, 20);
  context.fillStyle = 'green';
  context.fillRect(220, 120, 20, 20);
}

function drawSnake(context) {
  snake.position.forEach(position => {
    context.fillStyle = 'skyblue';
    context.strokeStyle = 'darkblue';
    context.fillRect(position.x, position.y, snake.width, snake.height);
    context.strokeRect(position.x, position.y, snake.width, snake.height);
  })
}

function moveSnake() {
  let head = { x: snake.position[0].x + snake.xSpeed, y: snake.position[0].y + snake.ySpeed }
  snake.position.unshift(head);
  snake.position.pop();
}

function increaseSnakeSize() {
  // grow snake size 
  let snakeTail = { x: snake.position[snake.position.length - 1].x - snake.xSpeed, y: snake.position[snake.position.length - 1].y - snake.ySpeed }

  snake.position.push(snakeTail)
}

function doesSnakeEatApple(apple, context) {
  if (snake.position[0].x === apple.position.x && snake.position[0].y === apple.position.y) {

    log('user scores')
    log(snake.position);
    increaseSnakeSize();
    updateScore();

    //change apple position
    apple.eaten = true;
    apple.position.x = getRandomApplePosition(context)[0]
    apple.position.y = getRandomApplePosition(context)[1]
  }
}

let currentScore = Number(document.getElementById('score').textContent)

function updateScore() {
  currentScore += 1
  document.getElementById('score').textContent = currentScore;
}

function isGameOver(context, apple) {
  let snakeHead = snake.position[0];

  let touchTheWallX = snakeHead.x >= context.canvas.width || snakeHead.x <= 0;
  let touchTheWallY = snakeHead.y >= context.canvas.height || snakeHead.y <= 0;

  if (touchTheWallX || touchTheWallY) {
    apple.eaten = true;
    apple.position.x = getRandomApplePosition(context)[0]
    apple.position.y = getRandomApplePosition(context)[1]
    resetTheGame();
  }

  //touch itself
  let snakeBodyX = snake.position.slice(3, snake.position.length).map(body => body.x)
  let snakeBodyY = snake.position.slice(3, snake.position.length).map(body => body.y)

  //for headx === for each bodyx (exclude head) && i match as well
  let touchItselfUpDownX = snakeBodyX.indexOf(snakeHead.x) >= 0;
  let touchItselfDownY = snakeBodyY.indexOf(snakeHead.y + 20) >= 0;
  let touchItselfUpY = snakeBodyY.indexOf(snakeHead.y - 20) >= 0;

  if (snake.direction === 'down') {
    if (touchItselfUpDownX && touchItselfDownY) {
      apple.position.x = getRandomApplePosition(context)[0]
      apple.position.y = getRandomApplePosition(context)[1]
      resetTheGame();
    }
  }

  if (snake.direction === 'up') {
    if (touchItselfUpDownX && touchItselfUpY) {
      apple.position.x = getRandomApplePosition(context)[0]
      apple.position.y = getRandomApplePosition(context)[1]
      resetTheGame();
    }
  }

  let touchItselfRightLeftY = snakeBodyY.indexOf(snakeHead.y) >= 0;
  let touchItselfRightX = snakeBodyX.indexOf(snakeHead.x + 20) >= 0;
  let touchItselfLeftX = snakeBodyX.indexOf(snakeHead.x - 20) >= 0;

  if (snake.direction === 'right') {
    if (touchItselfRightLeftY && touchItselfRightX) {
      apple.position.x = getRandomApplePosition(context)[0]
      apple.position.y = getRandomApplePosition(context)[1]
      resetTheGame();
    }
  }

  if (snake.direction === 'left') {
    if (touchItselfRightLeftY && touchItselfLeftX) {
      apple.position.x = getRandomApplePosition(context)[0]
      apple.position.y = getRandomApplePosition(context)[1]
      resetTheGame();
    }
  }

  //currentScore = 0;
  //log(currentScore)

}

function resetTheGame() {
  snake.position = [
    { x: 200, y: 140 },
    { x: 180, y: 140 },
    { x: 160, y: 140 },
    { x: 140, y: 140 },
    { x: 120, y: 140 }
  ];
  keyCode = 'ArrowRight';
  snake.direction = 'right'
  snake.xSpeed = 20;
  snake.ySpeed = 0;
  currentScore = 0;
  document.getElementById('score').textContent = currentScore

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
  let maxX = context.canvas.width;
  let maxY = context.canvas.height;

  let arrayOfX = snake.position.map(position => position.x)
  let arrayOfY = snake.position.map(position => position.y)

  let randomX = 20 * Math.floor(Math.random() * (maxX / 20));
  let randomY = 20 * Math.floor(Math.random() * (maxY / 20));

  return arrayOfX.indexOf(randomX) >= 0 && arrayOfY.indexOf(randomY) >= 0 ?
    getRandomApplePosition() : [randomX, randomY]
}





