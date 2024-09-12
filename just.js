const bubbleContainer = document.getElementById('bubble-container');
const bubblePopSound = document.getElementById('bubble-pop-sound');
const backgroundMusic = document.getElementById('background-music');
const volumeSlider = document.getElementById('volume-slider');
const musicToggleButton = document.getElementById('music-toggle');

const bubbleImages = [
  'bubble1.png',
  'bubble2.png',
  'bubble3.png',
  'bubble4.png',
  'bubble5.png',
  'bubble6.png'
];

let isMusicPlaying = true;

// Установка начальной громкости фоновой музыки
volumeSlider.value = 0.2;
backgroundMusic.volume = volumeSlider.value;
backgroundMusic.play();

// Обработчик изменения громкости фоновой музыки
volumeSlider.addEventListener('input', () => {
  backgroundMusic.volume = volumeSlider.value;
});

// Обработчик нажатия кнопки включения/выключения музыки
musicToggleButton.addEventListener('click', () => {
  if (isMusicPlaying) {
    backgroundMusic.pause();
    musicToggleButton.textContent = 'Включить музыку';
  } else {
    backgroundMusic.play();
    musicToggleButton.textContent = 'Выключить музыку';
  }
  isMusicPlaying = !isMusicPlaying;
});

function createBubble() {
  const bubble = document.createElement('div');
  bubble.classList.add('bubble');

  // Выбор случайного изображения пузыря
  const randomIndex = Math.floor(Math.random() * bubbleImages.length);
  bubble.style.backgroundImage = `url('${bubbleImages[randomIndex]}')`;

  // Случайные координаты для появления пузыря
  bubble.style.left = `${Math.random() * (window.innerWidth - 80)}px`;
  bubble.style.bottom = '0'; // Пузырек появляется снизу экрана

  // Случайный размер пузырька
  const randomSize = Math.floor(Math.random() * 41) + 40; // Размер от 40 до 80 пикселей
  bubble.style.width = `${randomSize}px`;
  bubble.style.height = `${randomSize}px`;

  bubbleContainer.appendChild(bubble);

  // Анимация пузырька
  const animation = bubble.animate(
    [
      { transform: 'translateY(0)' },
      { transform: `translateY(-${window.innerHeight + 80}px)` } // Пузырек исчезает за верхним краем экрана
    ],
    {
      duration: Math.random() * 8000 + 5000, // Случайная длительность от 5 до 13 секунд
      iterations: 1, // Анимация воспроизводится один раз
      fill: 'forwards' // Пузырек остается в конечном положении
    }
  );

  // Обработчик клика на пузырек
  bubble.addEventListener('click', () => {
    bubblePopSound.currentTime = 0;
    bubblePopSound.play();
    bubbleContainer.removeChild(bubble);
  });

  // Удаление случайных пузырьков раньше времени
  setTimeout(() => {
    bubbleContainer.removeChild(bubble);
  }, Math.random() * 8000 + 5000); // Случайный интервал от 5 до 13 секунд
}

// Создание 6 пузырьков
const intervalId = setInterval(() => {
  if (bubbleContainer.children.length < 6) {
    createBubble();
  }
}, 1000);

// Остановка генерации после 6 пузырьков
setTimeout(() => {
  clearInterval(intervalId);
}, 6000);

// Создание новых пузырей каждую секунду
setInterval(createBubble, 1000);
