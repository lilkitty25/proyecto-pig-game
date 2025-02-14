import "./style.css";

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

// variables de estado en JS y selectores DOM
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

const initData = () => {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  score0.textContent = 0;
  score1.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  imgDice.classList.add("hidden");
  btnRoll.disabled = false;
  btnHold.disabled = false;
};

initData();

btnRoll.addEventListener("click", throwDice);

function throwDice() {
  const dice = Math.trunc(Math.random() * 6) + 1;
  imgDice.src = `dice-${dice}.png`;
  imgDice.classList.remove("hidden");
  if (dice !== 1) updateCurrentScore(dice);
  else switchPlayer();
}

function updateCurrentScore(diceNumber) {
  currentScore += diceNumber;
  if (activePlayer === 0) {
    currentScore0.textContent = currentScore;
  } else {
    currentScore1.textContent = currentScore;
  }
}

function switchPlayer() {
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  sectionPlayer0.classList.toggle("player--active");
  sectionPlayer1.classList.toggle("player--active");
}

function hold() {
  if (activePlayer === 0) {
    score[0] += currentScore;
    score0.textContent = score[0];
    if (score[0] >= 100) endGame(0);
  } else {
    score[1] += currentScore;
    score1.textContent = score[1];
    if (score[1] >= 100) endGame(1);
  }
  currentScore = 0;
  currentScore0.textContent = currentScore;
  currentScore1.textContent = currentScore;
  switchPlayer();
}

function endGame(winner) {
  imgDice.classList.add("hidden");
  btnRoll.disabled = true;
  btnHold.disabled = true;
  alert(`Player ${winner + 1} wins!`);
}

btnHold.addEventListener("click", hold);

function newGame() {
  initData();
}

btnNew.addEventListener("click", newGame);
