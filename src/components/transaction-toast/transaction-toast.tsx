import { Component, Prop, Event, h, EventEmitter } from '@stencil/core';
import { ITransactionProgressState, IToastDataState, ITransaction } from './transaction-toast.type';

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

  render() {
    return (
      <transaction-toast-wrapper wrapperId={`toast-${this.toastId}`} wrapperClass={this.wrapperClass}>
        <transaction-toast-progress
          key={this.toastId}
          progressClass={this.transactionProgressState?.progressClass}
          currentRemaining={this.transactionProgressState?.currentRemaining}
        >
          <transaction-toast-content
            onDeleteToast={() => this.handleDeleteToast.emit(this.toastId)}
            processedTransactionsStatus={this.processedTransactionsStatus}
            toastDataState={this.toastDataState}
            transactions={this.transactions}
          />
        </transaction-toast-progress>
      </transaction-toast-wrapper>
    );
  }
}
