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

const apple = {
  radius: 10,
  position: {
    x: getRandomNum(0, 580),
    y: getRandomNum(0, 380)
  }
}

window.onload = function () {
  let canvas = document.getElementById('game-canvas');
  let context = canvas.getContext('2d');
  canvas.width = 600;
  canvas.height = 400;

  let interval = null;
  let timeInterval = 150;
  let currentScore = 0;
  let bestScore = 0;

  interval = setInterval(function () {
    drawCanvas(context);
    drawApple(context);
    moveSnake();
    drawSnake(context);

    if (doesSnakeTouchTheWall(context) || doesSnakeTouchItself()) {
      if (bestScore <= currentScore) {
        bestScore = currentScore;
      }
      currentScore = 0;
      resetTheGame(context, currentScore, bestScore);
    }

    if (doesSnakeEatApple()) {
      currentScore += 1;

      increaseSnakeSize();
      createNewApple(context);
      updateScore(currentScore);
    }

  }, timeInterval);

  const stopButtonEl = document.getElementById('stop-btn');
  stopButtonEl.addEventListener('click', function (e) {
    clearInterval(interval);
    interval = null;
  });

  const restartButtonEl = document.getElementById('restart-btn');
  restartButtonEl.addEventListener('click', function (e) {
    if (interval) {
      return;
    }

    currentScore = 0;
    resetTheGame(context, currentScore, bestScore);

    interval = setInterval(function () {
      drawCanvas(context);
      drawApple(context);
      moveSnake();
      drawSnake(context);

      if (doesSnakeTouchTheWall(context) || doesSnakeTouchItself()) {
        if (bestScore <= currentScore) {
          bestScore = currentScore;
        }
        currentScore = 0;
        resetTheGame(context, currentScore, bestScore);
      }

      if (doesSnakeEatApple(currentScore)) {
        currentScore += 1;

        increaseSnakeSize();
        createNewApple(context);
        updateScore(currentScore);
      }
    }, timeInterval)
  })

  document.addEventListener('keydown', function (e) {
    let keyCode = e.key;

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

function drawApple(context) {
  context.fillStyle = 'red';
  context.strokeStyle = "white";
  context.beginPath();
  context.arc(apple.position.x + apple.radius, apple.position.y + apple.radius, apple.radius, 0, 2 * Math.PI);
  context.fill();
  context.stroke();
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
  });
}

function doesSnakeTouchTheWall(context) {
  let snakeHead = snake.position[0];
  let touchTheWallX = snakeHead.x >= context.canvas.width - 20 || snakeHead.x <= 0;
  let touchTheWallY = snakeHead.y >= context.canvas.height - 20 || snakeHead.y <= 0;

  return touchTheWallX || touchTheWallY;
}

function doesSnakeTouchItself() {
  let snakeHead = snake.position[0];
  let snakeBody = snake.position.slice(1, snake.position.length)
  let gameover = false;

  snakeBody.forEach(body => {
    if ((snake.direction === 'down' && (snakeHead.x === body.x && snakeHead.y + 20 === body.y))
      || (snake.direction === 'up' && (snakeHead.x === body.x && snakeHead.y - 20 === body.y))
      || (snake.direction === 'right' && (snakeHead.x + 20 === body.x && snakeHead.y === body.y))
      || (snake.direction === 'left' && (snakeHead.x - 20 === body.x && snakeHead.y === body.y))) {
      gameover = true;
    }
  });

  return gameover;
}

function doesSnakeEatApple() {
  return snake.position[0].x === apple.position.x && snake.position[0].y === apple.position.y;
}

function increaseSnakeSize() {
  let snakeTail = {
    x: snake.position[snake.position.length - 1].x - snake.xSpeed,
    y: snake.position[snake.position.length - 1].y - snake.ySpeed
  };

  snake.position.push(snakeTail);
}

function createNewApple(context) {
  apple.position.x = getRandomNum(0, context.canvas.width - 20);
  apple.position.y = getRandomNum(0, context.canvas.height - 20);

  snake.position.forEach(position => {
    let appleOnSnake = apple.position.x == position.x && apple.position.y == position.y;
    if (appleOnSnake) {
      apple.position.x = getRandomNum(0, context.canvas.width - 20);
      apple.position.y = getRandomNum(0, context.canvas.height - 20);
    };
  });
}

function getRandomNum(min, max) {
  return 20 * Math.floor((Math.random() * ((max - min) + min) / 20));
}

function updateScore(currentScore) {
  document.getElementById('score').textContent = currentScore;
}

function updateBestScore(bestScore) {
  document.getElementById('best-score').textContent = bestScore;
}

function resetTheGame(context, currentScore, bestScore) {
  snake.position = [
    { x: 200, y: 140 },
    { x: 180, y: 140 },
    { x: 160, y: 140 },
    { x: 140, y: 140 },
    { x: 120, y: 140 }
  ];
  snake.direction = 'right';
  snake.xSpeed = 20;
  snake.ySpeed = 0;

  updateScore(currentScore);
  updateBestScore(bestScore);
  createNewApple(context);
}

