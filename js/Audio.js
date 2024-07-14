export default class AppAudio {
  /**
   * Represents the audio for the Pomodoro alert.
   * @type {HTMLAudioElement}
   */
  pomodoroAlertAudio;

  constructor() {
    this.pomodoroAlertAudio = document.getElementById('pomodoroAlertAudio');
  }

  play() {
    this.pomodoroAlertAudio.currentTime = 0;
    this.pomodoroAlertAudio.play();
  }

  stop() {
    this.pomodoroAlertAudio.currentTime = 0;
    this.pomodoroAlertAudio.pause();
  }
}
