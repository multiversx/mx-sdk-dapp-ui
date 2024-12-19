import { Component, Fragment, JSX, Prop, h } from '@stencil/core';
import { ITransaction } from './../../transaction-toast.type';

@Component({
  tag: 'transaction-toast-details',
  styleUrl: 'transaction-toast-details.css',
  shadow: true,
})
export class TransactionDetails {
  @Prop() processedTransactionsStatus?: JSX.Element | string;
  @Prop() transactions?: ITransaction[];
  @Prop() transactionClass: string;

  render() {
    if (this.transactions == null) {
      return null;
    }

    return (
      <Fragment>
        <div class="status-title">{this.processedTransactionsStatus}</div>

        {this.transactions.map(({ hash, status }) => (
          <transaction-toast-details-body transactionClass={this.transactionClass} hash={hash} status={status} key={hash} />
        ))}
      </Fragment>
    );
  }
}
