"use strict";
document.addEventListener("DOMContentLoaded", function () {
  
  const field = document.getElementById("field"); 
  const ball = document.getElementById("ball"); 
  const leftPaddle = document.getElementById("leftPaddle"); 
  const rightPaddle = document.getElementById("rightPaddle"); 
  const startButton = document.getElementById("startButton"); 
  const scoreElement = document.getElementById("score"); 

  const fieldWidth = field.offsetWidth; 
  const fieldHeight = field.offsetHeight; 
  const ballSize = ball.offsetWidth; 
  const paddleHeight = leftPaddle.offsetHeight; 
  const paddleSpeed = 5; 

 
  let ballX = fieldWidth / 2 - ballSize / 2; 
  let ballY = fieldHeight / 2 - ballSize / 2;
  let ballSpeedX = 1; 
  let ballSpeedY = 1; 
  let leftPaddleY = fieldHeight / 2 - paddleHeight / 2; 
  let rightPaddleY = fieldHeight / 2 - paddleHeight / 2; 
  let scoreLeft = 0; 
  let scoreRight = 0; 
  let gameInterval;

   function update() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

       if (ballY < 0 || ballY > fieldHeight - ballSize) {
      ballSpeedY = -ballSpeedY;
    }

    if (
      ballX <= 10 &&
      ballY + ballSize >= leftPaddleY &&
      ballY <= leftPaddleY + paddleHeight &&
      ballX >= 0
    ) {
      ballSpeedX = Math.abs(ballSpeedX);
      ballX = 10;
    }

    if (
      ballX + ballSize >= fieldWidth - 10 &&
      ballY + ballSize >= rightPaddleY &&
      ballY <= rightPaddleY + paddleHeight &&
      ballX + ballSize <= fieldWidth
    ) {
      ballSpeedX = -Math.abs(ballSpeedX);
      ballX = fieldWidth - 10 - ballSize;
    }

    if (ballX < 0 || ballX > fieldWidth - ballSize) {
      if (ballX < 0) {
        scoreRight++; 
        ballX = 0; 
      } else {
        scoreLeft++; 
        ballX = fieldWidth - ballSize; 
      }
      clearInterval(gameInterval); 
      startButton.disabled = false; 
      ballY = fieldHeight / 2 - ballSize / 2; 
      ball.style.left = `${ballX}px`; 
      ball.style.top = `${ballY}px`; 
      updateScore(); 
      return; 
    }

    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;
  }

  function updateScore() {
    scoreElement.textContent = `${scoreLeft}:${scoreRight}`; 
  }

  function startGame() {
    startButton.disabled = true; 
    ballX = fieldWidth / 2 - ballSize / 2; 
    ballY = fieldHeight / 2 - ballSize / 2; 
    ball.style.left = `${ballX}px`; 
    ball.style.top = `${ballY}px`; 
   
    ballSpeedX = Math.random() < 0.5 ? -1 : 1;
    ballSpeedY = Math.random() < 0.5 ? -1 : 1;
    gameInterval = setInterval(update, 20); 
  }

  function movePaddle(e) {
    const keyCode = e.keyCode; 
    if (keyCode === 16) { 
      if (e.type === "keydown") {
        if (leftPaddleY > 0) {
          leftPaddleY -= paddleSpeed; 
        }
      }
    } else if (keyCode === 17) { 
      if (e.type === "keydown") {
        if (leftPaddleY < fieldHeight - paddleHeight) {
          leftPaddleY += paddleSpeed; 
        }
      }
    } else if (keyCode === 38) { 
      if (e.type === "keydown") {
        if (rightPaddleY > 0) {
          rightPaddleY -= paddleSpeed; 
        }
      }
    } else if (keyCode === 40) { 
      if (e.type === "keydown") {
        if (rightPaddleY < fieldHeight - paddleHeight) {
          rightPaddleY += paddleSpeed; 
        }
      }
    }

    leftPaddle.style.top = `${leftPaddleY}px`;
    rightPaddle.style.top = `${rightPaddleY}px`;
  }

  document.addEventListener("keydown", movePaddle); 
  document.addEventListener("keyup", movePaddle); 
  startButton.addEventListener("click", startGame); 
});
