import { sendToDevtools } from './devtools';

export interface IEventBus {
  subscribe(event: string, callback: Function): () => void;
  publish(event: string, data?: any): void;
  unsubscribe(event: string, callback: Function): void;
}

export class EventBus implements IEventBus {
  private subscribers: { [key: string]: Function[] } = {};

  public constructor() {}

  // Rest of the implementation remains the same
  subscribe(event: string, callback: Function) {
    if (!this.subscribers[event]) {
      this.subscribers[event] = [];
    }

    sendToDevtools(event, 'SUBSCRIBE');
    this.subscribers[event].push(callback);

    return () => {
      this.unsubscribe(event, callback);
    };
  }

  publish(event: string, data?: any) {
    if (!this.subscribers[event]) {
      return;
    }

    sendToDevtools(event, data);
    this.subscribers[event].forEach(callback => callback(data));
  }

  unsubscribe(event: string, callback: Function) {
    if (!this.subscribers[event]) {
      return;
    }

    sendToDevtools(event, 'UNSUBSCRIBE');
    this.subscribers[event] = this.subscribers[event].filter(cb => cb !== callback);
  }
}
