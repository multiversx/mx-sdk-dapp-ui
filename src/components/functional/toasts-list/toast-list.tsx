import { Component, h, Method, Prop, State, Watch } from '@stencil/core';
import type { IEventBus } from 'utils/EventBus';
import { EventBus } from 'utils/EventBus';

import type { CustomToastType, ITransactionToast } from './components/transaction-toast/transaction-toast.type';
import { ToastEventsEnum } from './toast-list.types';

@Component({
  tag: 'mvx-toast-list',
  styleUrl: 'toast-list.css',
})
export class ToastList {
  private eventBus: IEventBus = new EventBus();
  @Prop() transactionToasts: ITransactionToast[] = [];
  @Prop() customToasts: CustomToastType[] = [];

  @State() transactionToastsState: ITransactionToast[] = [];
  @State() customToastsState: CustomToastType[] = [];

  @Method() async getEventBus() {
    return this.eventBus;
  }

  @Watch('transactionToasts')
  handleTransactionToastsChange(newValue: ITransactionToast[]) {
    this.transactionToastsState = [...newValue];
  }

  @Watch('customToasts')
  handleCustomToastsChange(newValue: CustomToastType[]) {
    this.customToastsState = [...newValue];
  }

  componentWillLoad() {
    this.transactionToastsState = [...this.transactionToasts];
    this.customToastsState = [...this.customToasts];
  }

  componentDidLoad() {
    this.eventBus.subscribe(ToastEventsEnum.TRANSACTION_TOAST_DATA_UPDATE, this.transactionToastUpdate.bind(this));
    this.eventBus.subscribe(ToastEventsEnum.CUSTOM_TOAST_DATA_UPDATE, this.customToastsUpdate.bind(this));
  }

  disconnectedCallback() {
    this.resetState();
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
  private transactionToastUpdate(payload: ITransactionToast[]) {
    this.transactionToastsState = [...payload];
  }

  private customToastsUpdate(payload: CustomToastType[]) {
    this.customToastsState = [...payload];
  }

  private resetState() {
    this.transactionToastsState = [];
    this.customToastsState = [];
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
        {this.customToastsState?.map(toast => <mvx-generic-toast toast={toast} onDeleteToast={this.handleCustomToastDelete.bind(this, toast.toastId)}></mvx-generic-toast>)}
        {this.transactionToastsState?.map(toast => (
          <mvx-transaction-toast {...toast} onDeleteToast={this.handleTransactionToastDelete.bind(this, toast.toastId)}></mvx-transaction-toast>
        ))}
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
}
