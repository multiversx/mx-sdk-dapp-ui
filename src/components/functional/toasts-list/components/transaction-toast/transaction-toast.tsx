import type { EventEmitter, JSX } from '@stencil/core';
import { Component, Event, h, Prop } from '@stencil/core';

import type { IToastDataState, ITransaction, ITransactionProgressState } from './transaction-toast.type';

@Component({
  tag: 'transaction-toast',
  styleUrl: 'transaction-toast.css',
  shadow: true,
})
export class TransactionToast {
  @Prop() toastId: string = '';
  @Prop() wrapperClass: string;
  @Prop() processedTransactionsStatus: string | JSX.Element = '';
  @Prop() transactions: ITransaction[] = [];
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
