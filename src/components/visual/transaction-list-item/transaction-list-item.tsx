import { Component, h, Host, Prop } from '@stencil/core';

import type { ITransactionListItem } from './transaction-list-item.types';

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

  render() {
    if (!this.transaction) {
      return <Host></Host>;
    }

    return (
      <Host
        class={{
          'transaction-item-sent': this.transaction.title.toLowerCase() === 'sent',
          'transaction-item-received': this.transaction.title.toLowerCase() === 'received',
          'transaction-item-claim': this.transaction.title.toLowerCase().includes('claim'),
        }}
      >
        <div class="transaction-item">
          <div class={`transaction-icon ${this.transaction.title.toLowerCase()}`}>
            {this.transaction.icon ? <fa-icon icon={this.transaction.icon}></fa-icon> : <span>{this.transaction.title.charAt(0)}</span>}
          </div>

          <div class="transaction-details">
            <h4 class="transaction-title">{this.transaction.title}</h4>
            <div class="transaction-info">
              {this.transaction.to && (
                <span class="transaction-target">
                  To <span class="entity-name">{this.transaction.to}</span>
                </span>
              )}
              {this.transaction.from && (
                <span class="transaction-target">
                  From <span class="entity-name">{this.transaction.from}</span>
                </span>
              )}
            </div>
          </div>

          {this.transaction.amount && (
            <div class={`transaction-amount ${this.getAmountClass()}`}>
              {this.transaction.amount} {this.transaction.label}
            </div>
          )}

          {this.renderAssets()}
        </div>
      </Host>
    );
  }
}
