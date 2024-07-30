export default class Audio {
  /**
   * Represents the audio element for the pomodoro alert sound.
   */
  pomodoroAlertAudioEl: HTMLAudioElement | null = null;

  constructor() {
    const pomodoroAlertAudio = document.getElementById('pomodoroAlertAudio');
    if (pomodoroAlertAudio) {
      this.pomodoroAlertAudioEl = pomodoroAlertAudio as HTMLAudioElement;
    }
  }

  play() {
    if (!this.pomodoroAlertAudioEl) {
      return;
    }

    this.pomodoroAlertAudioEl.currentTime = 0;
    this.pomodoroAlertAudioEl.play();
  }

  stop() {
    if (!this.pomodoroAlertAudioEl) {
      return;
    }

    this.pomodoroAlertAudioEl.currentTime = 0;
    this.pomodoroAlertAudioEl.pause();
  }
}
