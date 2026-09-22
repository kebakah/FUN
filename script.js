const rangeText = document.getElementById('rangeText');
const diffButtons = document.querySelectorAll('.diff-btn');
const form = document.getElementById('guessForm');
const input = document.getElementById('guessInput');
const feedback = document.getElementById('feedback');
const attemptsEl = document.getElementById('attempts');
const bestEl = document.getElementById('best');
const historyEl = document.getElementById('history');
const resetBtn = document.getElementById('resetBtn');

let min = 1;
let max = 50;
let target = randomInt(min, max);
let attempts = 0;
let won = false;
let bestScores = loadBestScores();

function randomInt(lo, hi) {
  return Math.floor(Math.random() * (hi - lo + 1)) + lo;
}

function loadBestScores() {
  try {
    return JSON.parse(localStorage.getItem('guessGame.bestScores')) || {};
  } catch {
    return {};
  }
}

function saveBestScores() {
  try {
    localStorage.setItem('guessGame.bestScores', JSON.stringify(bestScores));
  } catch {
    /* ignore storage errors (e.g. private browsing) */
  }
}

function difficultyKey() {
  return `${min}-${max}`;
}

function updateBestDisplay() {
  const best = bestScores[difficultyKey()];
  bestEl.textContent = best ? best : '–';
}

function startNewGame() {
  target = randomInt(min, max);
  attempts = 0;
  won = false;
  attemptsEl.textContent = '0';
  historyEl.innerHTML = '';
  feedback.textContent = 'Make your first guess!';
  feedback.className = 'feedback';
  input.value = '';
  input.disabled = false;
  input.min = min;
  input.max = max;
  form.querySelector('button').disabled = false;
  updateBestDisplay();
  input.focus();
}

function addHistoryChip(value, type) {
  const chip = document.createElement('span');
  chip.className = `history-chip ${type}`;
  chip.textContent = value;
  historyEl.appendChild(chip);
}

diffButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    diffButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    min = Number(btn.dataset.min);
    max = Number(btn.dataset.max);
    rangeText.textContent = `${min} and ${max}`;
    startNewGame();
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (won) return;

  const guess = Number(input.value);

  if (!Number.isInteger(guess) || guess < min || guess > max) {
    feedback.textContent = `Enter a whole number between ${min} and ${max}.`;
    feedback.className = 'feedback error';
    return;
  }

  attempts += 1;
  attemptsEl.textContent = attempts;

  if (guess === target) {
    won = true;
    feedback.textContent = `Correct! The number was ${target}. 🎉`;
    feedback.className = 'feedback win';
    addHistoryChip(guess, 'win');
    input.disabled = true;
    form.querySelector('button').disabled = true;

    const best = bestScores[difficultyKey()];
    if (!best || attempts < best) {
      bestScores[difficultyKey()] = attempts;
      saveBestScores();
      updateBestDisplay();
    }
  } else if (guess < target) {
    feedback.textContent = 'Too low — try a higher number.';
    feedback.className = 'feedback low';
    addHistoryChip(guess, 'low');
  } else {
    feedback.textContent = 'Too high — try a lower number.';
    feedback.className = 'feedback high';
    addHistoryChip(guess, 'high');
  }

  input.value = '';
  input.focus();
});

resetBtn.addEventListener('click', startNewGame);

startNewGame();
