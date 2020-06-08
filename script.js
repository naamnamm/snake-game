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
    apple.position.y = 140;
    timeInterval = 1000;
  }

  interval = setInterval(function () {
    drawCanvas(context);
    drawApple(context, apple);
    moveSnake();
    drawSnake(context);
    isGameOver(context, apple)
    snakeEatsApple(apple, context)
    //log(snake)
    //log(apple.position.x, apple.position.y)
  }, timeInterval)

  const stopButtonEl = document.getElementById('stop-btn');
  stopButtonEl.addEventListener('click', function (e) {
    clearInterval(interval);
  })

  document.addEventListener('keydown', function (e) {
    keyCode = e.key

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
  //debugger;
  let head = { x: snake.position[0].x + snake.xSpeed, y: snake.position[0].y + snake.ySpeed }
  snake.position.unshift(head);
  snake.position.pop();
}

function increaseSnakeSize() {
  log(snake.position)

  // grow snake size 
  let snakeTail = { x: snake.position[snake.position.length - 1].x - snake.xSpeed, y: snake.position[snake.position.length - 1].y - snake.ySpeed }

  snake.position.push(snakeTail)
}

function snakeEatsApple(apple, context) {
  if (snake.position[0].x === apple.position.x && snake.position[0].y === apple.position.y) {
    //debugger;
    log('user scores')
    //increase snake size
    log(snake.position);
    increaseSnakeSize();

    //change apple position
    apple.eaten = true;
    apple.position.x = getRandomApplePosition(context)[0]
    apple.position.y = getRandomApplePosition(context)[1]
  }
}

function isGameOver(context, apple) {
  //touch the wall
  let snakeHead = snake.position[0]

  let touchTheWallX = snakeHead.x >= context.canvas.width || snakeHead.x <= 0;
  let touchTheWallY = snakeHead.y >= context.canvas.height || snakeHead.y <= 0;

  //touch itself
  let snakeBodyX = snake.position.slice(3, snake.position.length).map(body => body.x)
  let snakeBodyY = snake.position.slice(3, snake.position.length).map(body => body.y)

  //for headx === for each bodyx (exclude head) && i match as well
  let touchItselfUpDownX = snakeBodyX.indexOf(snakeHead.x) >= 0;
  let touchItselfDownY = snakeBodyY.indexOf(snakeHead.y + 20) >= 0;
  let touchItselfUpY = snakeBodyY.indexOf(snakeHead.y - 20) >= 0;

  let touchItselfRightLeftY = snakeBodyX.indexOf(snakeHead.y) >= 0;
  let touchItselfRightX = snakeBodyY.indexOf(snakeHead.x - 20) >= 0;
  let touchItselfLeftX = snakeBodyY.indexOf(snakeHead.x + 20) >= 0;

  //head {x: 220, y: 120}
  //vs
  //body {x: 200, y: 140}
  if (touchTheWallX || touchTheWallY) {
    apple.eaten = true;
    apple.position.x = getRandomApplePosition(context)[0]
    apple.position.y = getRandomApplePosition(context)[1]
    resetTheGame();
  }
  //if direction = down and up
  if (snake.direction === 'down') {
    if (touchItselfUpDownX && touchItselfDownY) {
      log(snake.direction);
      log('gameover down')
      apple.position.x = getRandomApplePosition(context)[0]
      apple.position.y = getRandomApplePosition(context)[1]
      log(snakeBodyX, snakeBodyY);
      resetTheGame();
    }
  }

  if (snake.direction === 'up') {
    if (touchItselfUpDownX && touchItselfUpY) {
      log(snake.direction);
      apple.position.x = getRandomApplePosition(context)[0]
      apple.position.y = getRandomApplePosition(context)[1]
      log(snakeBodyX, snakeBodyY);
      resetTheGame();
    }
  }
  snake.direction = 'right';
  // if (snake.direction === 'right') {
  //   if (touchItselfRightLeftY && touchItselfRightX) {
  //     log(snake.direction);
  //     apple.position.x = getRandomApplePosition(context)[0]
  //     apple.position.y = getRandomApplePosition(context)[1]
  //     log(snakeBodyX, snakeBodyY);
  //     resetTheGame();
  //   }
  // }

  // if (snake.direction === 'left') {
  //   if (touchItselfRightLeftY && touchItselfLeftX) {
  //     log(snake.direction);
  //     apple.position.x = getRandomApplePosition(context)[0]
  //     apple.position.y = getRandomApplePosition(context)[1]
  //     log(snakeBodyX, snakeBodyY);
  //     resetTheGame();
  //   }
  // }


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

function drawApple(context, apple) {
  context.fillStyle = 'red';
  context.strokeStyle = "white";
  context.beginPath();
  context.arc(apple.position.x + apple.radius, apple.position.y + apple.radius, apple.radius, 0, 2 * Math.PI);
  context.fill()
  context.stroke();
}

function getRandomApplePosition(context) {
  let min = 0;

  let maxX = context.canvas.width;
  let maxY = context.canvas.height;

  let arrayOfX = snake.position.map(position => position.x)
  let arrayOfY = snake.position.map(position => position.y)

  let randomX = 20 * Math.floor(Math.random() * (maxX / 20));
  let randomY = 20 * Math.floor(Math.random() * (maxY / 20));

  return arrayOfX.indexOf(randomX) >= 0 && arrayOfY.indexOf(randomY) >= 0 ?
    getRandomApplePosition() : [randomX, randomY]
}





