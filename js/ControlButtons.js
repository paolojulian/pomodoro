export default class ControlButtons {
  focusBtn;
  takeEarlyBreakBtn;
  breakBtn;

  constructor() {
    this.focusBtn = document.getElementById('startFocusBtn');
    this.takeEarlyBreakBtn = document.getElementById('takeEarlyBreakBtn');
    this.breakBtn = document.getElementById('takeABreakBtn');
  }

  showFocusState() {
    this.takeEarlyBreakBtn.style.display = 'flex';

    this.focusBtn.style.display = 'none';
    this.breakBtn.style.display = 'none';
  }

  showTakingABreakState() {
    this.focusBtn.style.display = 'flex';

    this.takeEarlyBreakBtn.style.display = 'none';
    this.breakBtn.style.display = 'none';
  }

  showFinishedFocusState() {
    this.breakBtn.style.display = 'flex';

    this.focusBtn.style.display = 'none';
    this.takeEarlyBreakBtn.style.display = 'none';
  }
}
