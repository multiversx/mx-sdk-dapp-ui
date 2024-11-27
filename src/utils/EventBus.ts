export class EventBus {
  private static instance: EventBus;
  private subscribers: { [key: string]: Function[] } = {};

  private constructor() {}

  static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }

  subscribe(event: string, callback: Function) {
    if (!this.subscribers[event]) {
      this.subscribers[event] = [];
    }
    this.subscribers[event].push(callback);
  }

  publish(event: string, data?: any) {
    if (!this.subscribers[event]) {
      return;
    }
    this.subscribers[event].forEach((callback) => callback(data));
  }

  unsubscribe(event: string, callback: Function) {
    if (!this.subscribers[event]) {
      return;
    }
    this.subscribers[event] = this.subscribers[event].filter(
      (cb) => cb !== callback
    );
  }
}
