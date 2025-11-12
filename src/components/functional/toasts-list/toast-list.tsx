import { Component, h, Method, State } from '@stencil/core';
import { ConnectionMonitor } from 'utils/ConnectionMonitor';
import type { IEventBus } from 'utils/EventBus';
import { EventBus } from 'utils/EventBus';

import type { CustomToastType, ITransactionToast } from './components/transaction-toast/transaction-toast.type';
import { ToastEventsEnum } from './toast-list.types';

@Component({
  tag: 'mvx-toast-list',
  styleUrl: 'toast-list.scss',
})
export class ToastList {
  private readonly eventBus: IEventBus = new EventBus();
  private unsubscribeFunctions: (() => void)[] = [];
  private readonly connectionMonitor = new ConnectionMonitor();

  @State() transactionToasts: ITransactionToast[] = [];
  @State() customToasts: CustomToastType[] = [];
  @State() isVisible: boolean = true;

  @Method()
  async getEventBus() {
    await this.connectionMonitor.waitForConnection();
    return this.eventBus;
  }

  componentDidLoad() {
    const unsubTransaction = this.eventBus.subscribe(
      ToastEventsEnum.TRANSACTION_TOAST_DATA_UPDATE,
      this.transactionToastUpdate,
    );

    const unsubCustom = this.eventBus.subscribe(ToastEventsEnum.CUSTOM_TOAST_DATA_UPDATE, this.customToastsUpdate);

    const unsubHide = this.eventBus.subscribe(ToastEventsEnum.HIDE, this.handleHide);

    const unsubShow = this.eventBus.subscribe(ToastEventsEnum.SHOW, this.handleShow);

    this.unsubscribeFunctions.push(unsubTransaction, unsubCustom, unsubHide, unsubShow);

    this.connectionMonitor.connect();
  }

  disconnectedCallback() {
    this.resetState();
    this.unsubscribeFunctions.forEach(unsubscribe => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    });
    this.unsubscribeFunctions = [];
  }

  private readonly handleHide = () => {
    this.isVisible = false;
  };

  private readonly handleShow = () => {
    this.isVisible = true;
  };

  private readonly handleCustomToastDelete = (toastId: string) => {
    this.eventBus.publish(ToastEventsEnum.CLOSE, toastId);
  };

  private readonly handleTransactionToastDelete = (toastId: string) => {
    this.eventBus.publish(ToastEventsEnum.CLOSE, toastId);
  };

  private readonly handleViewAllClick = () => {
    this.eventBus.publish(ToastEventsEnum.OPEN_NOTIFICATIONS_FEED);
  };

  private readonly transactionToastUpdate = (payload: ITransactionToast[]) => {
    this.transactionToasts = [...payload];
  };

  private readonly customToastsUpdate = (payload: CustomToastType[]) => {
    this.customToasts = [...payload];
  };

  private resetState() {
    this.transactionToasts = [];
    this.customToasts = [];
    this.isVisible = true;
  }

  render() {
    const hasTransactionToasts = this.transactionToasts?.length > 0;

    return (
      <div
        class={{
          'toast-list': true,
          'toast-list-bottom': hasTransactionToasts,
          'hidden': !this.isVisible,
        }}
        id="toast-list"
      >
        {this.customToasts?.map(toast => (
          <mvx-generic-toast toast={toast} onDeleteToast={() => this.handleCustomToastDelete(toast.toastId)} />
        ))}

        {this.transactionToasts?.map(toast => (
          <mvx-transaction-toast {...toast} onDeleteToast={() => this.handleTransactionToastDelete(toast.toastId)} />
        ))}

        {hasTransactionToasts && (
          <div class="view-all-button-container">
            <button class="view-all-button" onClick={this.handleViewAllClick}>
              View All
            </button>
          </div>
        )}
      </div>
    );
  }
}
