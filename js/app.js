import Pomodoro from './pomodoro.js';

const pomodoro = new Pomodoro();

// Initialize
pomodoro.focusBtn.addEventListener('click', () => {
  pomodoro.focus();
});
pomodoro.breakBtn.addEventListener('click', () => {
  pomodoro.break();
});
