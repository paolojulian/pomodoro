export default class ControlButtons {
  focusBtn;
  stopFocusBtn;
  breakBtn;

  constructor() {
    this.focusBtn = document.getElementById('startFocusBtn');
    this.stopFocusBtn = document.getElementById('stopFocusBtn');
    this.breakBtn = document.getElementById('takeABreakBtn');
  }

  showFocusState() {
    this.stopFocusBtn.style.display = 'flex';

    this.focusBtn.style.display = 'none';
    this.breakBtn.style.display = 'none';
  }

  showTakingABreakState() {
    this.focusBtn.style.display = 'flex';

    this.stopFocusBtn.style.display = 'none';
    this.breakBtn.style.display = 'none';
  }

  showStoppedOnBreakState() {
    this.breakBtn.style.display = 'flex';

    this.focusBtn.style.display = 'none';
    this.stopFocusBtn.style.display = 'none';
  }
}
