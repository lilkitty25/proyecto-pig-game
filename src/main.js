import "./style.css";

// Inserta la estructura HTML en la página
document.querySelector("#app").innerHTML = `
  <main>
    <section class="player player--0 player--active">
      <h2 class="name" id="name--0">Player 1</h2>
      <p class="score" id="score--0">43</p>
      <div class="current">
        <p class="current-label">Current</p>
        <p class="current-score" id="current--0">3</p>
      </div>
    </section>
    <section class="player player--1">
      <h2 class="name" id="name--1">Player 2</h2>
      <p class="score" id="score--1">24</p>
      <div class="current">
        <p class="current-label">Current</p>
        <p class="current-score" id="current--1">5</p>
      </div>
    </section>

    <img src="dice-5.png" alt="Playing dice" class="dice" />
    <button class="btn btn--new">🔄 New game</button>
    <button class="btn btn--roll">🎲 Roll dice</button>
    <button class="btn btn--hold">📥 Hold</button>
  </main>
`;

// Variables de estado y selectores del DOM
const sectionPlayer0 = document.querySelector(".player--0");
const sectionPlayer1 = document.querySelector(".player--1");
const score0 = document.querySelector("#score--0");
const score1 = document.querySelector("#score--1");
const currentScore0 = document.querySelector("#current--0");
const currentScore1 = document.querySelector("#current--1");

const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");
const btnRoll = document.querySelector(".btn--roll");
const imgDice = document.querySelector(".dice");

let score, currentScore, activePlayer;

// Inicializa los valores del juego
const initData = () => {
  score = [0, 0]; // Puntajes de los jugadores
  currentScore = 0; // Puntaje actual
  activePlayer = 0; // Jugador activo (0 o 1)
  score0.textContent = 0;
  score1.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  imgDice.classList.add("hidden"); // Oculta el dado
  btnRoll.disabled = false; // Habilita el botón de tirar dado
  btnHold.disabled = false; // Habilita el botón de mantener
};

initData(); // Inicializa el juego

// Evento al hacer clic en el botón de tirar dado
btnRoll.addEventListener("click", throwDice);

function throwDice() {
  const dice = Math.trunc(Math.random() * 6) + 1; // Genera un número aleatorio del 1 al 6
  imgDice.src = `dice-${dice}.png`; // Muestra la imagen del dado
  imgDice.classList.remove("hidden"); // Muestra el dado en pantalla
  if (dice !== 1) {
    updateCurrentScore(dice); // Si el dado no es 1, actualiza el puntaje
  } else {
    switchPlayer(); // Si es 1, cambia de jugador
  }
}

// Actualiza el puntaje actual
function updateCurrentScore(diceNumber) {
  currentScore += diceNumber; // Suma el número del dado al puntaje actual
  if (activePlayer === 0) {
    currentScore0.textContent = currentScore; // Actualiza el puntaje del jugador 0
  } else {
    currentScore1.textContent = currentScore; // Actualiza el puntaje del jugador 1
  }
}

// Cambia de jugador
function switchPlayer() {
  activePlayer = activePlayer === 0 ? 1 : 0; // Alterna entre jugador 0 y jugador 1
  currentScore = 0; // Reinicia el puntaje actual
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  sectionPlayer0.classList.toggle("player--active"); // Cambia la clase activa del jugador 0
  sectionPlayer1.classList.toggle("player--active"); // Cambia la clase activa del jugador 1
}

// Función para guardar el puntaje y verificar si alguien gana
function hold() {
  if (activePlayer === 0) {
    score[0] += currentScore; // Suma el puntaje actual al jugador 0
    score0.textContent = score[0]; // Muestra el puntaje del jugador 0
    if (score[0] >= 100) endGame(0); // Si el jugador 0 tiene 100 o más, gana
  } else {
    score[1] += currentScore; // Suma el puntaje actual al jugador 1
    score1.textContent = score[1]; // Muestra el puntaje del jugador 1
    if (score[1] >= 100) endGame(1); // Si el jugador 1 tiene 100 o más, gana
  }
  currentScore = 0; // Reinicia el puntaje actual
  currentScore0.textContent = currentScore;
  currentScore1.textContent = currentScore;
  switchPlayer(); // Cambia de jugador
}

// Finaliza el juego
function endGame(winner) {
  imgDice.classList.add("hidden"); // Oculta el dado
  btnRoll.disabled = true; // Desactiva el botón de tirar dado
  btnHold.disabled = true; // Desactiva el botón de mantener
  alert(`Player ${winner + 1} wins!`); // Muestra el ganador
}

btnHold.addEventListener("click", hold); // Evento al hacer clic en el botón de mantener

// Función para iniciar un nuevo juego
function newGame() {
  initData(); // Reinicia el juego
}

btnNew.addEventListener("click", newGame); // Evento al hacer clic en el botón de nuevo juego
