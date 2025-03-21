import type { EventEmitter, JSX } from '@stencil/core';
import { Component, Event, h, Prop } from '@stencil/core';
import type { ITransactionListItem } from 'components/visual/transaction-list-item/transaction-list-item.types';

import type { IToastDataState, ITransactionProgressState } from './transaction-toast.type';

@Component({
  tag: 'transaction-toast',
})
export class TransactionToast {
  @Prop() toastId: string = '';
  @Prop() wrapperClass: string;
  @Prop() processedTransactionsStatus: string | JSX.Element = '';
  @Prop() transactions: ITransactionListItem[] = [];
  @Prop() toastDataState: IToastDataState;
  @Prop() transactionProgressState?: ITransactionProgressState;
  @Event() deleteToast: EventEmitter<void>;

  private handleDeleteToast() {
    this.deleteToast.emit();
  }

  render() {
    return (
      <transaction-toast-progress key={this.toastId} startTime={this.transactionProgressState?.startTime} endTime={this.transactionProgressState?.endTime}>
        <transaction-toast-content
          toastDataState={this.toastDataState}
          transactions={this.transactions}
          processedTransactionsStatus={this.processedTransactionsStatus}
          onDeleteToast={this.handleDeleteToast.bind(this)}
        />
      </transaction-toast-progress>
    );
  }
}
