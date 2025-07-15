/**
 * Utility to manage a "ready" state with a Promise.
 *
 * Some methods (e.g., getEventBus) should only be usable after
 * initialization. This class provides a promise you can await and
 * a resolver to mark readiness.
 */
export class ConnectionMonitor {
  private resolveFn: () => void;
  private readonly ready: Promise<void>;

  constructor() {
    this.ready = new Promise<void>(resolve => {
      this.resolveFn = resolve;
    });
  }

  /**
   * Wait until the connection is marked as ready.
   *
   * @returns A promise that resolves when `connect()` is called.
   *
   * @example
   * ```ts
   * await connectionMonitor.waitForConnection();
   * ```
   */
  waitForConnection(): Promise<void> {
    return this.ready;
  }

  /**
   * Mark the connection as ready, resolving all waiters.
   *
   * Once called, `waitForConnection()` will resolve for any pending
   * and future calls.
   *
   * @example
   * ```ts
   * connectionMonitor.connect();
   * ```
   */
  connect(): void {
    this.resolveFn();
  }
}
