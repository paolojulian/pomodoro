import { Timer } from './timer.js';
import TimerWorker from './timerWorker.js';

/**
 * @typedef {'initial' | 'focused' | 'break'} States
 */

// TODO - convert to local storage later for user settings
// const FOCUS_TIME = 25 * 60;
// const BREAK_TIME = 5 * 60;
const FOCUS_TIME = 5;
const BREAK_TIME = 5;

export default class Pomodoro {
  /**
   * Represents the current state of the Pomodoro app.
   * @type {States} Possible values are 'initial', 'focus', and 'break'.
   * @default 'initial'
   */
  state = 'initial';

  /**
   * Represents the countdown timer.
   * @type {Timer}
   */
  timeLeft;

  /**
   * Represents the countdown timer.
   * @type {Timer}
   */
  totalFocusTime;

  /**
   * Represents the Web Worker instance.
   * @type {TimerWorker}
   */
  timerWorker;

  /**
   * Represents the focus button.
   * @type {HTMLButtonElement}
   */
  focusBtn;

  /**
   * Represents the "Take a break" button.
   * @type {HTMLButtonElement}
   */
  breakBtn;

  /**
   * Represents the title element.
   * @type {HTMLHeadingElement}
   */
  titleEl;

  constructor() {
    this.focusBtn = document.getElementById('startFocusBtn');
    this.breakBtn = document.getElementById('takeABreakBtn');
    this.titleEl = document.getElementById('title');

    this.timeLeft = new Timer(FOCUS_TIME, 'timer');
    this.totalFocusTime = new Timer(0, 'totalFocusTime');
    this.timerWorker = new TimerWorker();
    this.timerWorker.addEventListener(this.handleWorkerMessage);
  }

  handleWorkerMessage = ({ data }) => {
    if (data === 'tick') {
      this.onTick();
    }
  };

  onTick() {
    /**
     * @type {boolean}
     */
    const hasFinished = this.timeLeft.time_sec <= 0;

    if (hasFinished) {
      return this.onTimerFinished();
    }

    this.timeLeft.countDown();
    if (this.state === 'focused') {
      this.totalFocusTime.countUp();
    }
  }

  /**
   * Handles the timer finishing.
   * If the state is 'focused', the timer will switch to 'break'.
   * If the state is 'break', the timer will switch to 'focused'.
   */
  onTimerFinished() {
    this.timerWorker.stop();

    // If the focus time has finished, prep the break time
    if (this.state === 'focused') {
      return this.setState('break');
    }

    // If the break time has finished, prep the focus time
    if (this.state === 'break') {
      return this.setState('focused');
    }
  }

  showFocusBtn() {
    this.focusBtn.style.display = 'flex';
    this.breakBtn.style.display = 'none';
  }

  showBreakBtn() {
    this.focusBtn.style.display = 'none';
    this.breakBtn.style.display = 'flex';
  }

  getFocusTime() {
    return FOCUS_TIME;
  }

  getBreakTime() {
    return BREAK_TIME;
  }

  focus() {
    if (this.state === 'focused') {
      return;
    }

    // Ensure the timer is stopped before starting it
    this.timerWorker.stop();

    this.setState('focused');
    this.showBreakBtn();
    this.timerWorker.start();
  }

  break() {
    if (this.state === 'break' || this.state === 'initial') {
      return;
    }

    // Ensure the timer is stopped before starting it
    this.timerWorker.stop();
    this.setState('break');
    this.timerWorker.start();
    this.showFocusBtn();
  }

  /**
   * Set the state of the Pomodoro app.
   * @param {States} state
   */
  setState(state) {
    this.state = state;
    switch (state) {
      case 'focused':
        this.titleEl.textContent = 'Focus on your task!';
        this.timeLeft.resetTime(this.getFocusTime());
        break;
      case 'break':
        this.titleEl.textContent = 'Take a break!';
        this.timeLeft.resetTime(this.getBreakTime());
        break;
      default:
        this.titleEl.textContent = 'Pomodoro';
        break;
    }
  }
}
