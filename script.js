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
    { x: 200, y: 140 },
    { x: 180, y: 140 },
    { x: 160, y: 140 },
    { x: 140, y: 140 },
    { x: 120, y: 140 }
  ]
}

let currentScore = 0;
let bestScore = 0;

window.onload = function () {
  let timeInterval = 200;
  let canvas = document.getElementById('game-canvas')
  let context = canvas.getContext('2d')
  canvas.width = 600;
  canvas.height = 400;

  let keyCode = null;

  const apple = {
    radius: 10,
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
    drawApple(apple, context);
    isGameOver(apple, context)
    moveSnake();
    drawSnake(context);
    doesSnakeEatApple(apple, context)
  }, timeInterval)

  const stopButtonEl = document.getElementById('stop-btn');
  stopButtonEl.addEventListener('click', function (e) {
    clearInterval(interval);
  })

  const resetButtonEl = document.getElementById('reset-btn');
  resetButtonEl.addEventListener('click', function (e) {
    resetTheGame(apple, context);
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
}

function drawApple(apple, context) {
  context.fillStyle = 'red';
  context.strokeStyle = "white";
  context.beginPath();
  context.arc(apple.position.x + apple.radius, apple.position.y + apple.radius, apple.radius, 0, 2 * Math.PI);
  context.fill()
  context.stroke();
}

function isGameOver(apple, context) {
  let snakeHead = snake.position[0];

  let touchTheWallX = snakeHead.x >= context.canvas.width || snakeHead.x <= 0;
  let touchTheWallY = snakeHead.y >= context.canvas.height || snakeHead.y <= 0;

  if (touchTheWallX || touchTheWallY) {
    resetTheGame(apple, context);
  }

  let snakeBody = snake.position.slice(1, snake.position.length)

  if (snake.direction === 'down') {
    snakeBody.forEach(body => {
      if ((snakeHead.x === body.x) && (snakeHead.y + 20 === body.y)) {
        resetTheGame(apple, context);
      }
    })
  }

  if (snake.direction === 'up') {
    snakeBody.forEach(body => {
      if ((snakeHead.x === body.x) && (snakeHead.y - 20 === body.y)) {
        resetTheGame(apple, context);
      }
    })
  }

  if (snake.direction === 'right') {
    snakeBody.forEach(body => {
      if ((snakeHead.x + 20 === body.x) && (snakeHead.y === body.y)) {
        resetTheGame(apple, context);
      }
    })
  }

  if (snake.direction === 'left') {
    snakeBody.forEach(body => {
      if ((snakeHead.x - 20 === body.x) && (snakeHead.y === body.y)) {
        resetTheGame(apple, context);
      }
    })
  }

}

function moveSnake() {
  let head = { x: snake.position[0].x + snake.xSpeed, y: snake.position[0].y + snake.ySpeed }
  snake.position.unshift(head);
  snake.position.pop();
}

function drawSnake(context) {
  snake.position.forEach(position => {
    context.fillStyle = 'skyblue';
    context.strokeStyle = 'darkblue';
    context.fillRect(position.x, position.y, snake.width, snake.height);
    context.strokeRect(position.x, position.y, snake.width, snake.height);
  })
}

function doesSnakeEatApple(apple, context) {
  if (snake.position[0].x === apple.position.x && snake.position[0].y === apple.position.y) {
    currentScore += 1;

    increaseSnakeSize();
    moveApple(apple, context);
    updateScore();
  }
}

function increaseSnakeSize() {
  let snakeTail = {
    x: snake.position[snake.position.length - 1].x - snake.xSpeed,
    y: snake.position[snake.position.length - 1].y - snake.ySpeed
  }
  snake.position.push(snakeTail)
}

function moveApple(apple, context) {
  apple.position.x = getRandomApplePosition(context)[0]
  apple.position.y = getRandomApplePosition(context)[1]
}

function updateScore() {
  document.getElementById('score').textContent = currentScore;
}

function updateBestScore() {
  document.getElementById('best-score').textContent = bestScore;
}

function resetTheGame(apple, context) {
  snake.position = [
    { x: 200, y: 140 },
    { x: 180, y: 140 },
    { x: 160, y: 140 },
    { x: 140, y: 140 },
    { x: 120, y: 140 }
  ];
  snake.direction = 'right'
  snake.xSpeed = 20;
  snake.ySpeed = 0;

  keyCode = null;

  if (bestScore <= currentScore) {
    bestScore = currentScore;
  }
  updateBestScore();

  currentScore = 0;
  updateScore();

  moveApple(apple, context);
}

function getRandomApplePosition(context) {
  let maxX = context.canvas.width;
  let maxY = context.canvas.height;

  let randomAppleX = 20 * Math.floor(Math.random() * (maxX / 20));
  let randomAppleY = 20 * Math.floor(Math.random() * (maxY / 20));

  snake.position.forEach(position => {
    if (randomAppleX === position.x && randomAppleY === position.y) {
      getRandomApplePosition();
    }
  })

  return [randomAppleX, randomAppleY];
}


