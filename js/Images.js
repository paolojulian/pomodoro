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

  /**
   * Represents the current opened state
   * @type {'focus' | 'break'}
   */
  currentOpenedState = 'focus';

  constructor() {
    this.focusingImgEl = document.getElementById('focusMode');
    this.takingABreakImgEl = document.getElementById('takingABreak');
  }

  showFocusState() {
    this.currentOpenedState = 'focus';
    this.focusingImgEl.style.display = 'block';
    this.takingABreakImgEl.style.display = 'none';
    this.setOpacity(1.0);
  }

  showBreakState() {
    this.currentOpenedState = 'break';
    this.focusingImgEl.style.display = 'none';
    this.takingABreakImgEl.style.display = 'block';
    this.setOpacity(1.0);
  }

  setOpacity(value) {
    const minOpacity = 0.2;
    const maxOpacity = 1.0;
    const adjustedOpacity = minOpacity + value * (maxOpacity - minOpacity);
    this.focusingImgEl.style.opacity = adjustedOpacity;
    this.takingABreakImgEl.style.opacity = adjustedOpacity;
  }
}
