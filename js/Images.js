export default class Images {
  /**
   * Represents the focusing image element
   * @type {HTMLImageElement}
   */
  focusingImgEl;

  /**
   * Represents the taking a break image element
   * @type {HTMLImageElement}
   */
  takingABreakImgEl;

  constructor() {
    this.focusingImgEl = document.getElementById('focusMode');
    this.takingABreakImgEl = document.getElementById('takingABreak');
  }

  showFocusState() {
    this.focusingImgEl.style.display = 'block';
    this.takingABreakImgEl.style.display = 'none';
  }

  showBreakState() {
    this.focusingImgEl.style.display = 'none';
    this.takingABreakImgEl.style.display = 'block';
  }

  setOpacity(value) {
    this.focusingImgEl.style.opacity = value;
    this.takingABreakImgEl.style.opacity = value;
  }
}
