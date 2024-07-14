/**
 * @typedef {'finished-focus' | 'finished-break'} DoneModalVariants
 */

export default class DoneModal {
  /**
   * @type {HTMLDivElement}
   * @private
   */
  modalContainerEl;

  /**
   * @type {HTMLHeadingElement}
   * @private
   */
  titleEl;

  /**
   * @type {HTMLButtonElement}
   * @private
   */
  tapToProceedBtnEl;

  /**
   *
   * @param {() => void} onClose
   */
  constructor(onClose) {
    this.modalContainerEl = document.getElementById('doneModal');
    if (!this.modalContainerEl) {
      throw new Error('doneModal element not found');
    }
    this.titleEl = document.getElementById('doneModalTitle');
    if (!this.titleEl) {
      throw new Error('doneModalTitle element not found');
    }

    this.tapToProceedBtnEl = document.getElementById('tapToProceedBtn');
    if (!this.tapToProceedBtnEl) {
      throw new Error('tapToProceedBtn element not found');
    }

    this.modalContainerEl.addEventListener('click', () => {
      onClose();
      this.closeModal();
    });
  }

  /**
   * @param {DoneModalVariants} variant
   */
  openModal(variant) {
    this.modalContainerEl.style.opacity = 100;
    this.modalContainerEl.style.pointerEvents = 'auto';
    this.setVariant(variant);
  }

  closeModal() {
    this.modalContainerEl.style.opacity = 0;
    this.modalContainerEl.style.pointerEvents = 'none';
  }

  /**
   * Set the variant of the DoneModal.
   * @param {DoneModalVariants} variant
   * @private
   */
  setVariant(variant) {
    if (variant === 'finished-break') {
      this.setTitle('Break time is over');
      this.setButtonContent('Tap anywhere to start focus.');
      this.setBackgroundColor('var(--primary)');
      return;
    }

    if (variant === 'finished-focus') {
      this.setTitle('Focus is done');
      this.setButtonContent('Tap anywhere to take a break.');
      this.setBackgroundColor('var(--black)');
      return;
    }

    throw new Error(`Unknown variant: ${variant}`);
  }

  /**
   * @param {string} title
   * @private
   */
  setTitle(title) {
    this.titleEl.textContent = title;
  }

  /**
   * @param {string} backgroundColor
   * @private
   */
  setBackgroundColor(backgroundColor) {
    this.modalContainerEl.style.backgroundColor = backgroundColor;
  }

  /**
   * @param {string} title
   * @private
   */
  setButtonContent(title) {
    this.tapToProceedBtnEl.textContent = title;
  }
}
