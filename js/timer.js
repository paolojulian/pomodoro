import { formatTime } from './utils/timeFormat.utils.js';

export class Timer {
  /**
   * Represents the timer element
   * @type {HTMLSpanElement}
   */
  element;

  /**
   * Represents the time left in seconds.
   * @type {number}
   */
  time_sec = 0;

  /**
   * @param {number} initialTime_sec
   * @param {string} elementId
   */
  constructor(initialTime_sec, elementId) {
    this.time_sec = initialTime_sec;
    this.element = document.getElementById(elementId);
    if (!this.element) {
      throw new Error(`Element with id ${elementId} not found.`);
    }
    this.element.textContent = formatTime(initialTime_sec);
  }

  /**
   * Reset the timeLeft
   * @param {number} value - Seconds
   */
  resetTime(value) {
    this.time_sec = value;
    this.element.textContent = formatTime(value);
  }

  countDown() {
    this.time_sec -= 1;
    this.element.textContent = formatTime(this.time_sec);
  }

  countUp() {
    this.time_sec += 1;
    this.element.textContent = formatTime(this.time_sec);
  }
}
