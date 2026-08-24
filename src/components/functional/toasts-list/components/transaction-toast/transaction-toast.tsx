import type { EventEmitter, VNode } from '@stencil/core';
import { Component, Event, h, Prop } from '@stencil/core';
import type { ITransactionListItem } from 'components/functional/notifications-feed/components/TransactionListItem/transactionListItem.types';
import { TransactionStatusEnum } from 'constants/transactionStatus.enum';

import type { IToastDataState, ITransactionProgressState } from './transaction-toast.type';

@Component({
  tag: 'mvx-transaction-toast',
  styleUrl: './transaction-toast.scss',
})
export class TransactionToast {
  @Prop() toastId: string = '';
  @Prop() wrapperClass: string;
  @Prop() fullWidth?: boolean;
  @Prop() processedTransactionsStatus: string | VNode = '';
  @Prop() transactions: ITransactionListItem[] = [];
  @Prop() toastDataState: IToastDataState;
  @Prop() transactionProgressState?: ITransactionProgressState;
  @Event() deleteToast: EventEmitter<void>;

  private handleDeleteToast() {
    this.deleteToast.emit();
  }

  render() {
    const isStatusPending = this.transactions.every(tx => tx.status === TransactionStatusEnum.pending);

    return (
      <div
        class={{
          'mvx-transaction-toast': true,
          'mvx:max-w-100': !this.fullWidth,
        }}
      >
        <mvx-transaction-toast-progress
          key={this.toastId}
          toastId={this.toastId}
          startTime={this.transactionProgressState?.startTime}
          endTime={this.transactionProgressState?.endTime}
          isStatusPending={isStatusPending}
          fullWidth={this.fullWidth}
        >
          <mvx-transaction-toast-content
            fullWidth={this.fullWidth}
            toastDataState={this.toastDataState}
            transactions={this.transactions}
            processedTransactionsStatus={this.processedTransactionsStatus}
            onDeleteToast={this.handleDeleteToast.bind(this)}
          />
        </mvx-transaction-toast-progress>
      </div>
    );
  }
}
