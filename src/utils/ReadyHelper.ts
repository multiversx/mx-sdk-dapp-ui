/**
 * Utility to manage a "ready" state with a Promise.
 *
 * Some methods (e.g., getEventBus) should only be usable after
 * initialization. This class provides a promise you can await and
 * a resolver to mark readiness.
 */
export class ReadyHelper {
  readyResolver!: () => void;
  readyPromise: Promise<void>;

  constructor() {
    this.readyPromise = new Promise(resolve => {
      this.readyResolver = resolve;
    });
  }

  resolveReady() {
    this.readyResolver();
  }
}
