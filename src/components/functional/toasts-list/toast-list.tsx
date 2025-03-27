import { Component, forceUpdate, h, Method, Prop } from '@stencil/core';
import type { IEventBus } from 'utils/EventBus';
import { EventBus } from 'utils/EventBus';

import type { CustomToastType, ITransactionToast } from './components/transaction-toast/transaction-toast.type';
import { ToastEventsEnum } from './toast-list.types';

@Component({
  tag: 'toast-list',
  styleUrl: 'toast-list.css',
})
export class ToastList {
  private eventBus: IEventBus = new EventBus();
  @Prop() transactionToasts: ITransactionToast[];
  @Prop() customToasts: CustomToastType[];

  @Method() async getEventBus() {
    return this.eventBus;
  }

  disconnectedCallback() {
    this.eventBus.unsubscribe(ToastEventsEnum.TRANSACTION_TOAST_DATA_UPDATE, this.transactionToastUpdate.bind(this));
    this.eventBus.unsubscribe(ToastEventsEnum.CUSTOM_TOAST_DATA_UPDATE, this.customToastsUpdate.bind(this));
  }

  private handleCustomToastDelete(toastId: string) {
    this.eventBus.publish(ToastEventsEnum.CLOSE_TOAST, toastId);
  }

  private handleTransactionToastDelete(toastId: string) {
    this.eventBus.publish(ToastEventsEnum.CLOSE_TOAST, toastId);
  }

  private handleViewAllClick() {
    this.eventBus.publish(ToastEventsEnum.OPEN_NOTIFICATIONS_FEED);
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
        {this.customToasts?.map(toast => <generic-toast toast={toast} onDeleteToast={this.handleCustomToastDelete.bind(this, toast.toastId)}></generic-toast>)}
        {this.transactionToasts?.map(toast => <transaction-toast {...toast} onDeleteToast={this.handleTransactionToastDelete.bind(this, toast.toastId)}></transaction-toast>)}
        {hasTransactionToasts && (
          <div class="view-all-button-container">
            <button class="view-all-button" onClick={this.handleViewAllClick.bind(this)}>
              View All
            </button>
          </div>
        )}
      </div>
    );
  }

  private transactionToastUpdate(payload: ITransactionToast[]) {
    this.transactionToasts = [...payload];
    forceUpdate(this);
  }

  private customToastsUpdate(payload: CustomToastType[]) {
    this.customToasts = [...payload];
    forceUpdate(this);
  }

  componentDidLoad() {
    this.eventBus.subscribe(ToastEventsEnum.TRANSACTION_TOAST_DATA_UPDATE, this.transactionToastUpdate.bind(this));
    this.eventBus.subscribe(ToastEventsEnum.CUSTOM_TOAST_DATA_UPDATE, this.customToastsUpdate.bind(this));
  }
}
