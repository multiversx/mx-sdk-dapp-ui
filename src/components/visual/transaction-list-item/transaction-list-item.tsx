import { Component, h, Host, Prop } from '@stencil/core';

import type { ITransactionListItem } from './transaction-list-item.types';
import { TransactionBatchStatusesEnum, TransactionServerStatusesEnum } from './transaction-list-item.types';

@Component({
  tag: 'transaction-list-item',
  styleUrl: 'transaction-list-item.scss',
  shadow: true,
})
export class TransactionListItem {
  @Prop() transaction!: ITransactionListItem;

  private renderAssets() {
    if (!this.transaction?.assets) {
      return null;
    }

    const assets = Array.isArray(this.transaction.assets) ? this.transaction.assets : [this.transaction.assets];
    const displayAssets = assets.slice(0, 3);
    const remainingAssets = assets.length > 3 ? assets.length - 3 : 0;

    return (
      <div class="asset-container">
        {displayAssets.map((asset, index) => (
          <div class="asset" style={{ 'z-index': `${displayAssets.length - index}` }}>
            <img src={asset} alt="Token asset" class="asset-image" loading="lazy" />
          </div>
        ))}
        {remainingAssets > 0 && (
          <div class="asset asset-more" style={{ 'z-index': '0' }}>
            +{remainingAssets}
          </div>
        )}
      </div>
    );
  }

  private getAmountClass() {
    if (!this.transaction?.amount) {
      return '';
    }

    // Check if amount starts with + or - to determine transaction type
    if (this.transaction.amount.startsWith('+')) {
      return 'amount-positive';
    } else if (this.transaction.amount.startsWith('-')) {
      return 'amount-negative';
    }

    return '';
  }

  private getStatusClass() {
    if (!this.transaction?.status) {
      return '';
    }

    switch (this.transaction.status) {
      case TransactionServerStatusesEnum.success:
      case TransactionBatchStatusesEnum.success:
        return 'status-success';
      case TransactionServerStatusesEnum.pending:
      case TransactionBatchStatusesEnum.sent:
        return 'status-pending';
      case TransactionServerStatusesEnum.fail:
      case TransactionBatchStatusesEnum.fail:
        return 'status-fail';
      case TransactionServerStatusesEnum.invalid:
      case TransactionBatchStatusesEnum.invalid:
        return 'status-invalid';
      default:
        return '';
    }
  }

  render() {
    if (!this.transaction) {
      return <Host></Host>;
    }

    const transactionTitle = this.transaction.title || '';
    const transactionTitleLower = transactionTitle.toLowerCase();
    const statusClass = this.getStatusClass();

    return (
      <Host
        class={{
          'transaction-item-sent': transactionTitleLower === 'sent',
          'transaction-item-received': transactionTitleLower === 'received',
          'transaction-item-claim': transactionTitleLower.includes('claim'),
          'transaction-in-transit': this.transaction.inTransit,
          [statusClass]: true,
        }}
      >
        <div class="transaction-item">
          <div class={`transaction-icon ${transactionTitleLower}`}>
            {this.transaction.icon ? <fa-icon icon={this.transaction.icon}></fa-icon> : <span>{transactionTitle.charAt(0)}</span>}
          </div>

          <div class="transaction-details">
            <h4 class="transaction-title">{transactionTitle}</h4>
            <div class="transaction-info">
              {(this.transaction.to || this.transaction.receiver) && (
                <span class="transaction-target">
                  To <span class="entity-name">{this.transaction.receiverUsername || this.transaction.to || this.transaction.receiver}</span>
                </span>
              )}
              {(this.transaction.from || this.transaction.sender) && (
                <span class="transaction-target">
                  From <span class="entity-name">{this.transaction.senderUsername || this.transaction.from || this.transaction.sender}</span>
                </span>
              )}
              {this.transaction.status && <span class="transaction-status">{this.transaction.status}</span>}
            </div>
          </div>

          {(this.transaction.amount || this.transaction.value) && (
            <div class={`transaction-amount ${this.getAmountClass()}`}>
              {this.transaction.amount || this.transaction.value} {this.transaction.label}
            </div>
          )}

          {this.renderAssets()}
        </div>
      </Host>
    );
  }
}
