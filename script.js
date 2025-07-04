const player = document.getElementById('player');
const obstacle = document.getElementById('obstacle');
const scoreDisplay = document.getElementById('score');

let isJumping = false;
let score = 0;
let gameOver = false;

function jump() {
  if (isJumping || gameOver) return;
  isJumping = true;
  player.classList.add('jump');
  setTimeout(() => {
    player.classList.remove('jump');
    isJumping = false;
  }, 500);
}

function moveObstacle() {
  let obstaclePos = 600; // старт за правым краем
  const speed = 5; // скорость движения

  const interval = setInterval(() => {
    if (gameOver) {
      clearInterval(interval);
      return;
    }

    obstaclePos -= speed;
    obstacle.style.right = obstaclePos + 'px';

    // Проверка столкновения
    if (obstaclePos < 120 && obstaclePos > 80 && !isJumping) {
      // Столкновение
      gameOver = true;
      alert(`Игра окончена! Ваш счёт: ${score}`);
      location.reload();
    }

    // Если препятствие ушло за левый край, сбросить позицию и увеличить счёт
    if (obstaclePos < -50) {
      obstaclePos = 600;
      score++;
      scoreDisplay.textContent = `Счёт: ${score}`;
    }
  }, 20);
}

// Управление с клавиатуры
document.addEventListener('keydown', e => {
  if (e.code === 'Space') {
    e.preventDefault();
    jump();
  }
});

// Управление на мобильных — тап по экрану
document.getElementById('game-container').addEventListener('touchstart', e => {
  e.preventDefault();
  jump();
});

// Запуск игры
moveObstacle();
