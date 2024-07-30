import Timer from './AppTimer.js';

const TOTAL_FOCUS_TIME_STORAGE_KEY = 'totalFocusTime';

export default class TotalFocusTime {
  /**
   * Represents the total focus time.
   *
   * @type {Timer}
   */
  value;

  constructor() {
    const defaultFocusTime =
      Number(localStorage.getItem(TOTAL_FOCUS_TIME_STORAGE_KEY)) || 0;
    localStorage.setItem(
      TOTAL_FOCUS_TIME_STORAGE_KEY,
      defaultFocusTime.toString()
    );
    this.value = new Timer(defaultFocusTime, 'totalFocusTime');
  }

  countUp() {
    this.value.countUp();
    localStorage.setItem(
      TOTAL_FOCUS_TIME_STORAGE_KEY,
      this.value.time_sec.toString()
    );
  }

  resetTime() {
    this.value.resetTime(0);
    localStorage.setItem(TOTAL_FOCUS_TIME_STORAGE_KEY, '0');
  }
}
