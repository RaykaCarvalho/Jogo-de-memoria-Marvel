const characters = [
  { name: 'homemdeferro', image: 'imagens/homemdeferro.jpg' },
  { name: 'homemdearanha', image: 'imagens/homemaranha.jpg' },
  { name: 'capitalamerica', image: 'imagens/capitalamerica.jpg' },
  { name: 'Thor', image: 'imagens/thor.jpg' },
  { name: 'Hulk', image: 'imagens/hulk.jpg' },
  { name: 'viuvanegra', image: 'imagens/viuvanegra.jpg' },
  { name: 'panteranegra', image: 'imagens/panteranegra.jpg' },
  { name: 'Doctor Strange', image: 'imagens/doutorestranho.jpg' }
];

let gameBoard = document.getElementById('game-board');
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let startTime = new Date().getTime();
let timerInterval;

// Função para embaralhar o array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Função para criar as cartas
function createCards() {
  const shuffledCharacters = shuffleArray([...characters, ...characters]); // Duplicar o array para ter pares

  shuffledCharacters.forEach(character => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <img src="${character.image}" alt="${character.name}">
      `;
      card.addEventListener('click', flipCard);
      gameBoard.appendChild(card);
      cards.push(card);
  });
}

// Função para virar a carta
function flipCard() {
  this.classList.add('flipped');
  flippedCards.push(this);

  // Verificar se duas cartas estão viradas
  if (flippedCards.length === 2) {
      // Desabilitar cliques em outras cartas
      cards.forEach(card => card.removeEventListener('click', flipCard));

      // Verificar se as cartas correspondem
      setTimeout(() => {
          if (flippedCards[0].querySelector('img').alt === flippedCards[1].querySelector('img').alt) {
              // Cartas correspondem
              flippedCards[0].classList.add('matched');
              flippedCards[1].classList.add('matched');
              matchedPairs++;

              // Verificar se o jogo acabou
              if (matchedPairs === characters.length) {
                  clearInterval(timerInterval);
                  alert('Parabéns! Você venceu!');
              }
          } else {
              // Cartas não correspondem
              flippedCards[0].classList.remove('flipped');
              flippedCards[1].classList.remove('flipped');
          }

          // Reativar cliques em outras cartas
          cards.forEach(card => card.addEventListener('click', flipCard));

          flippedCards = [];
      }, 1000);
  }
}

// Função para atualizar o tempo
function updateTimer() {
  const currentTime = new Date().getTime();
  const elapsedTime = Math.floor((currentTime - startTime) / 1000);
  document.getElementById('timer').textContent = `Tempo: ${elapsedTime} segundos`;
}

// Função para iniciar o jogo
function startGame() {
  // Limpar o game board se já existir
  gameBoard.innerHTML = '';
  cards = []; // Reiniciar o array de cartas
  flippedCards = []; // Reiniciar o array de cartas viradas
  matchedPairs = 0; // Reiniciar o número de pares correspondentes

  // Criar as cartas e iniciar o timer
  createCards();
  startTime = new Date().getTime();
  timerInterval = setInterval(updateTimer, 1000);

  // Desabilitar o botão "Iniciar" e habilitar o botão "Reiniciar"
  startButton.disabled = true;
  resetButton.disabled = false;
}

// Função para reiniciar o jogo
function resetGame() {
  clearInterval(timerInterval); // Parar o timer

  // Desabilitar cliques em todas as cartas
  cards.forEach(card => card.removeEventListener('click', flipCard));

  // Redefinir as cartas para o estado inicial
  cards.forEach(card => {
      card.classList.remove('flipped');
      card.classList.remove('matched');
  });

  // Habilitar o botão "Iniciar" e desabilitar o botão "Reiniciar"
  startButton.disabled = false;
  resetButton.disabled = true;
}

// Inicializar o jogo
const startButton = document.getElementById('start-button');
const resetButton = document.getElementById('reset-button');

startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);