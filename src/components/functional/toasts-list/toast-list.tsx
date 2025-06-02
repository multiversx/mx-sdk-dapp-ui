import { Component, h, Method, State } from '@stencil/core';
import type { IEventBus } from 'utils/EventBus';
import { EventBus } from 'utils/EventBus';

import type { CustomToastType, ITransactionToast } from './components/transaction-toast/transaction-toast.type';
import { ToastEventsEnum } from './toast-list.types';

@Component({
  tag: 'mvx-toast-list',
  styleUrl: 'toast-list.scss',
})
export class ToastList {
  private eventBus: IEventBus = new EventBus();
  private unsubscribeFunctions: (() => void)[] = [];

  @State() transactionToasts: ITransactionToast[] = [];
  @State() customToasts: CustomToastType[] = [];

  @Method()
  async getEventBus() {
    return this.eventBus;
  }

  componentDidLoad() {
    const unsubTransaction = this.eventBus.subscribe(
      ToastEventsEnum.TRANSACTION_TOAST_DATA_UPDATE,
      this.transactionToastUpdate,
    );

    const unsubCustom = this.eventBus.subscribe(ToastEventsEnum.CUSTOM_TOAST_DATA_UPDATE, this.customToastsUpdate);

    this.unsubscribeFunctions.push(unsubTransaction, unsubCustom);
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

  private handleCustomToastDelete = (toastId: string) => {
    this.eventBus.publish(ToastEventsEnum.CLOSE, toastId);
  };

  private handleTransactionToastDelete = (toastId: string) => {
    this.eventBus.publish(ToastEventsEnum.CLOSE, toastId);
  };

  private handleViewAllClick = () => {
    this.eventBus.publish(ToastEventsEnum.OPEN_NOTIFICATIONS_FEED);
  };

  private transactionToastUpdate = (payload: ITransactionToast[]) => {
    this.transactionToasts = [...payload];
  };

  private customToastsUpdate = (payload: CustomToastType[]) => {
    this.customToasts = [...payload];
  };

  private resetState() {
    this.transactionToasts = [];
    this.customToasts = [];
  }

  render() {
    const hasTransactionToasts = this.transactionToasts?.length > 0;

    return (
      <div
        class={{
          'toast-list': true,
          'toast-list-bottom': hasTransactionToasts,
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
