import './style.css';
import getScores, { postScore } from './server.js';

const refreshBtn = document.querySelector('.refresh-btn');
const addScore = document.querySelector('.addScore');
const error = document.querySelector('.error');
const scoresList = document.querySelector('.scores-list');
refreshBtn.addEventListener('click', (e) => {
  e.preventDefault();
  getScores().then((data) => {
    if (data.result.length === 0) {
      error.style.display = 'none';
    } else {
      error.style.display = 'none';
      scoresList.style.display = 'block';
      const scores = data.result;
      scoresList.innerHTML = '';
      scores.forEach((score) => {
        const li = document.createElement('li');
        li.innerHTML = `<li class="board-item">${score.user}: ${score.score}</li>`;
        scoresList.appendChild(li);
      });
    }
  });
});

addScore.addEventListener('click', (e) => {
  e.preventDefault();
  const user = document.querySelector('#name').value;
  const score = Number(document.querySelector('#score').value);
  const scoreObj = {
    user,
    score,
  };
  postScore(scoreObj)
    .then((data) => {
      document.querySelector('#name').value = '';
      document.querySelector('#score').value = '';
      alert(data.result);
    })
    .catch((err) => {
      error.style.display = 'block';
      error.innerHTML = err.message;
    });
});

window.onload = () => {
  getScores().then((data) => {
    if (data.result.length === 0) {
      error.style.display = 'none';
    } else {
      error.style.display = 'none';
      scoresList.style.display = 'block';
      const scores = data.result;
      scoresList.innerHTML = '';
      scores.forEach((score) => {
        const li = document.createElement('li');
        li.innerHTML = `<li class="board-item">${score.user}: ${score.score}</li>`;
        scoresList.appendChild(li);
      });
    }
  });
};