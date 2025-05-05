import { Component, h, Prop } from '@stencil/core';
import { formatAddress } from 'utils/utils';

@Component({
  tag: 'mvx-transaction-header',
  styleUrl: 'transaction-header.css',
})
export class TransactionHeader {
  @Prop() address: string = '';
  @Prop() currentTransaction: number = 1;
  @Prop() totalTransactions: number = 1;

  render() {
    const hasMultipleTransactions = this.totalTransactions > 1;

    return (
      <div class="transaction-header">
        <div class="header-subtext">
          <p class="signing-address">Sign with {formatAddress(this.address, 10)}</p>
        </div>

        {hasMultipleTransactions && (
          <div class="transaction-counter">
            <p>
              Transaction {this.currentTransaction} of {this.totalTransactions}
            </p>
          </div>
        )}
      </div>
    );
  }
}
