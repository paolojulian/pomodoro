import AppAudio from './Audio.js';
import ControlButtons from './ControlButtons.js';
import DoneModal from './DoneModal.js';
import Images from './Images.js';
import TimerWorker from './AppTimerWorker.js';
import Timer from './AppTimer.js';
import TotalFocusTime from './TotalFocusTime.js';

/**
 * @typedef {'initial' | 'focused' | 'taking-a-break' | 'finished-break-time' | 'finished-focus-time'} States
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
   * Represents the modal state.
   * @type {DoneModal}
   */
  doneModal;

  /**
   * Represents the control buttons.
   * @type {ControlButtons}
   */
  controlButtons;

  /**
   * Represents the audio files.
   * @type {AppAudio}
   */
  appAudio;

  /**
   * Represents the images
   * @type {Images}
   */
  images;

  /**
   * Represents the countdown timer.
   * @type {Timer}
   */
  timeLeft;

  /**
   * Represents the countdown timer.
   * @type {TotalFocusTime}
   */
  totalFocusTime;

  /**
   * Represents the reset total focus time element.
   * @type {HTMLButtonElement}
   */
  resetTotalFocusTimeBtnEl;

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

    this.resetTotalFocusTimeBtnEl = document.getElementById(
      'resetTotalFocusTimeBtn'
    );
    this.resetTotalFocusTimeBtnEl.addEventListener('click', () => {
      this.totalFocusTime.resetTime(0);
    });

    this.controlButtons = new ControlButtons();
    this.controlButtons.focusBtn.addEventListener('click', () => this.focus());
    this.controlButtons.breakBtn.addEventListener('click', () => this.break());
    this.controlButtons.takeEarlyBreakBtn.addEventListener('click', () =>
      this.takeEarlyBreak()
    );

    this.images = new Images();
    this.images.showFocusState();

    this.appAudio = new AppAudio();

    this.doneModal = new DoneModal(() => this.handleCloseModal());

    this.timeLeft = new Timer(FOCUS_TIME, 'timer');
    this.totalFocusTime = new TotalFocusTime();

    this.timerWorker = new TimerWorker();
    this.timerWorker.addEventListener(this.handleWorkerMessage);
  }

  handleCloseModal() {
    if (this.state === 'finished-break-time') {
      this.focus();
      return;
    }
    if (this.state === 'finished-focus-time') {
      this.break();
      return;
    }
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
    this.images.setOpacity(this.getTimeLeftPercentage());
    if (this.state === 'focused') {
      this.totalFocusTime.countUp();
    }
  }

  /**
   * Calculates the time left percentage.
   * The minimum opacity is 20
   * @returns {number} - The time left percentage e.g. 0.4 for 40%
   */
  getTimeLeftPercentage() {
    let totalTime = this.getFocusTime();
    if (this.state === 'focused') {
      totalTime = this.getFocusTime();
    } else if (this.state === 'taking-a-break') {
      totalTime = this.getBreakTime();
    }

    return this.timeLeft.time_sec / totalTime;
  }

  /**
   * Handles the timer finishing.
   */
  onTimerFinished() {
    this.appAudio.play();
    this.timerWorker.stop();

    if (this.state === 'focused') {
      this.doneModal.openModal('finished-focus');
      this.setState('finished-focus-time');

      return;
    }

    if (this.state === 'taking-a-break') {
      this.doneModal.openModal('finished-break');
      this.setState('finished-break-time');

      return;
    }
  }

  getFocusTime() {
    return FOCUS_TIME;
  }

  getBreakTime() {
    return BREAK_TIME;
  }

  focus() {
    this.appAudio.stop();
    // Ensure the timer is stopped before starting it
    this.timerWorker.stop();
    this.setState('focused');
    this.timerWorker.start();
  }

  break() {
    this.appAudio.stop();
    // Ensure the timer is stopped before starting it
    this.timerWorker.stop();
    this.setState('taking-a-break');
    this.timerWorker.start();
  }

  /**
   * This handles the user taking an early break.
   * only available on "Focus" mode.
   * @returns {void}
   */
  takeEarlyBreak() {
    if (this.state !== 'focused') {
      return;
    }

    this.appAudio.stop();
    this.timerWorker.stop();
    this.setState('taking-a-break');
    this.timerWorker.start();
  }

  /**
   * Set the state of the Pomodoro app.
   * @param {States} state
   */
  setState(state) {
    this.state = state;
    switch (state) {
      case 'focused':
        this.titleEl.textContent = 'Focus on your task';
        this.timeLeft.resetTime(this.getFocusTime());
        this.images.showFocusState();
        this.controlButtons.showFocusState();
        break;
      case 'finished-focus-time':
        this.controlButtons.showFinishedFocusState();
        this.titleEl.textContent = 'Take a break';
        this.timeLeft.resetTime(this.getBreakTime());
        break;
      case 'taking-a-break':
        this.titleEl.textContent = 'Break time';
        this.controlButtons.showTakingABreakState();
        this.timeLeft.resetTime(this.getBreakTime());
        this.images.showBreakState();
        break;
      case 'finished-break-time':
        this.titleEl.textContent = 'Break time is over';
        this.controlButtons.showTakingABreakState();
        this.timeLeft.resetTime(this.getFocusTime());
        break;
      default:
        this.titleEl.textContent = 'Pomodoro';
        break;
    }
  }
}
