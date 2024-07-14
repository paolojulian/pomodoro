import ControlButtons from './ControlButtons.js';
import { Timer } from './Timer.js';
import TimerWorker from './TimerWorker.js';

/**
 * @typedef {'initial' | 'focused' | 'taking-a-break' | 'break'} States
 */

// TODO - convert to local storage later for user settings
const FOCUS_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

export default class Pomodoro {
  /**
   * Represents the current state of the Pomodoro app.
   * @type {States} Possible values are 'initial', 'focus', and 'break'.
   * @default 'initial'
   */
  state = 'initial';

  /**
   * Represents the control buttons.
   * @type {ControlButtons}
   */
  controlButtons;

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
   * Represents the title element.
   * @type {HTMLHeadingElement}
   */
  titleEl;

  constructor() {
    this.titleEl = document.getElementById('title');

    this.controlButtons = new ControlButtons();
    this.controlButtons.focusBtn.addEventListener('click', () => this.focus());
    this.controlButtons.breakBtn.addEventListener('click', () => this.break());
    this.controlButtons.stopFocusBtn.addEventListener('click', () =>
      this.stop()
    );

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

    if (this.state === 'taking-a-break') {
      this.timeLeft.resetTime(this.getFocusTime());
      this.controlButtons.showTakingABreakState();
      this.titleEl.textContent = 'Break time is over!';
      return;
    }

    // If the break time has finished, prep the focus time
    if (this.state === 'break') {
      return this.setState('focused');
    }
  }

  getFocusTime() {
    return FOCUS_TIME;
  }

  getBreakTime() {
    return BREAK_TIME;
  }

  focus() {
    // Ensure the timer is stopped before starting it
    this.timerWorker.stop();
    this.setState('focused');
    this.timerWorker.start();
  }

  break() {
    // Ensure the timer is stopped before starting it
    this.timerWorker.stop();
    this.setState('taking-a-break');
    this.timerWorker.start();
  }

  stop() {
    if (this.state === 'initial' || this.state === 'taking-a-break') {
      return;
    }

    this.timerWorker.stop();
    this.setState('break');
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
        this.controlButtons.showFocusState();
        break;
      case 'break':
        this.controlButtons.showStoppedOnBreakState();
        this.titleEl.textContent = 'Take a break!';
        this.timeLeft.resetTime(this.getBreakTime());
        break;
      case 'taking-a-break':
        this.titleEl.textContent = 'Break time';
        this.controlButtons.showTakingABreakState();
        this.timeLeft.resetTime(this.getBreakTime());
        break;
      default:
        this.titleEl.textContent = 'Pomodoro';
        break;
    }
  }
}
