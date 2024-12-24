import { Component, h, Prop, Method, forceUpdate } from '@stencil/core';
import { ITransactionToast } from '../../transaction-toast.type';
import { EventBus, IEventBus } from 'utils/EventBus';
import { TransactionToastEventsEnum } from './transaction-toast-list.types';
@Component({
  tag: 'transaction-toast-list',
  styleUrl: 'transaction-toast-list.css',
})
export class TransactionToastList {
  private eventBus: IEventBus = new EventBus();
  @Prop() data: ITransactionToast[];

  @Method() async getEventBus() {
    return this.eventBus;
  }

  render() {
    return (
      <div class="transaction-list" id="transaction-list">
        {this.data?.map(toast => (
          <transaction-toast {...toast} onHandleDeleteToast={() => this.eventBus.publish(TransactionToastEventsEnum.CLOSE_TOAST, toast.toastId)}></transaction-toast>
        ))}
      </div>
    );
  }

  private dataUpdate(payload: ITransactionToast[]) {
    this.data = [...payload];
    forceUpdate(this);
  }

  componentDidLoad() {
    this.eventBus.subscribe(TransactionToastEventsEnum.TRANSACTION_TOAST_DATA_UPDATE, this.dataUpdate.bind(this));
  }
}
