const workerCode = () => {
  let intervalId;
  self.addEventListener('message', ({ data }) => {
    const { action } = data;
    if (action === 'start') {
      clearInterval(intervalId);
      intervalId = setInterval(() => {
        self.postMessage('tick');
      }, 1000);
    } else if (action === 'stop') {
      clearInterval(intervalId);
    }
  });
};

let code = workerCode.toString();
code = code.substring(code.indexOf('{') + 1, code.lastIndexOf('}'));

const blob = new Blob([code], { type: 'application/javascript' });
const worker_script = URL.createObjectURL(blob);

export default class TimerWorker {
  /**
   * @type {Worker | null}
   */
  worker = null;

  constructor() {
    if (typeof Worker !== 'undefined') {
      this.worker = new Worker(worker_script);
    }
  }

  start() {
    if (!this.worker) {
      alert('Web Workers are not supported in this browser.');
      return;
    }
    this.worker.postMessage({ action: 'start' });
  }

  stop() {
    if (!this.worker) {
      alert('Web Workers are not supported in this browser.');
      return;
    }
    this.worker.postMessage({ action: 'stop' });
  }

  addEventListener(handler) {
    if (!this.worker) {
      return;
    }
    this.worker.addEventListener('message', handler);
  }
}
