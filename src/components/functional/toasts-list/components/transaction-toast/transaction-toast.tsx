import type { EventEmitter, JSX } from '@stencil/core';
import { Component, Event, h, Prop } from '@stencil/core';

import type { IToastDataState, ITransaction, ITransactionProgressState } from './transaction-toast.type';

@Component({
  tag: 'transaction-toast',
  shadow: true,
})

//TODO: use State Tunnel
export class TransactionToast {
  @Prop() toastId: string = '';
  @Prop() wrapperClass: string;
  @Prop() processedTransactionsStatus: string | JSX.Element = '';
  @Prop() transactions: ITransaction[] = [];
  @Prop() toastDataState: IToastDataState;
  @Prop() transactionProgressState?: ITransactionProgressState;

  @Event() handleDeleteToast: EventEmitter<string>;

  private onDeleteToast() {
    this.handleDeleteToast.emit(this.toastId);
  }

  render() {
    return (
      <transaction-toast-wrapper wrapperId={`toast-${this.toastId}`} wrapperClass={this.wrapperClass}>
        <transaction-toast-progress key={this.toastId} startTime={this.transactionProgressState?.startTime} endTime={this.transactionProgressState?.endTime}>
          <transaction-toast-content
            onDeleteToast={this.onDeleteToast.bind(this)}
            processedTransactionsStatus={this.processedTransactionsStatus}
            toastDataState={this.toastDataState}
            transactions={this.transactions}
          />
        </transaction-toast-progress>
      </transaction-toast-wrapper>
    );
  }
}
