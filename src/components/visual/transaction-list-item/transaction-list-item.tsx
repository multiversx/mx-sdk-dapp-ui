import { Component, h, Host, Prop } from '@stencil/core';

import type { ITransactionListItem } from './transaction-list-item.types';

const DefaultIcon = () => (
  <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0 3.91357C0 1.96045 1.60156 0.319824 3.59375 0.319824C5.54688 0.319824 7.1875 1.96045 7.1875 3.91357V5.63232H12.8125V3.91357C12.8125 1.96045 14.4141 0.319824 16.4062 0.319824C18.3594 0.319824 20 1.96045 20 3.91357V4.06982C20 6.14014 18.3203 7.81982 16.25 7.81982H14.6875V12.8198H16.25C18.3203 12.8198 20 14.4995 20 16.5698V16.7261C20 18.7183 18.3594 20.3198 16.4062 20.3198C14.4141 20.3198 12.8125 18.7183 12.8125 16.7261V15.0073H7.1875V16.7261C7.1875 18.7183 5.54688 20.3198 3.59375 20.3198C1.60156 20.3198 0 18.7183 0 16.7261V16.5698C0 14.4995 1.67969 12.8198 3.75 12.8198H5.3125V7.81982H3.75C1.67969 7.81982 0 6.14014 0 4.06982V3.91357ZM5.3125 5.94482V3.91357C5.3125 2.97607 4.53125 2.19482 3.59375 2.19482C2.61719 2.19482 1.875 2.97607 1.875 3.91357V4.06982C1.875 5.12451 2.69531 5.94482 3.75 5.94482H5.3125ZM7.1875 13.1323H12.8125V7.50732H7.1875V13.1323ZM5.3125 14.6948H3.75C2.69531 14.6948 1.875 15.5542 1.875 16.5698V16.7261C1.875 17.7026 2.61719 18.4448 3.59375 18.4448C4.53125 18.4448 5.3125 17.7026 5.3125 16.7261V14.6948ZM14.6875 16.7261C14.6875 17.7026 15.4297 18.4448 16.4062 18.4448C17.3438 18.4448 18.125 17.7026 18.125 16.7261V16.5698C18.125 15.5542 17.2656 14.6948 16.25 14.6948H14.6875V16.7261ZM14.6875 5.94482H16.25C17.2656 5.94482 18.125 5.12451 18.125 4.06982V3.91357C18.125 2.97607 17.3438 2.19482 16.4062 2.19482C15.4297 2.19482 14.6875 2.97607 14.6875 3.91357V5.94482Z"
      fill="#EEEEF1"
    />
  </svg>
);

@Component({
  tag: 'transaction-list-item',
  styleUrl: 'transaction-list-item.scss',
  shadow: true,
})
export class TransactionListItem {
  @Prop() transaction!: ITransactionListItem;

  private renderLeftIcon() {
    if (this.transaction?.assets?.length === 1) {
      return (
        <div class="transaction-icon">
          <img src={this.transaction.assets[0]} alt="Token asset" class="asset-image" loading="lazy" />
        </div>
      );
    }

    return <div class="transaction-icon">{this.transaction.icon ? <fa-icon icon={this.transaction.icon}></fa-icon> : <DefaultIcon />}</div>;
  }

  private renderMultipleAssets() {
    if (!this.transaction?.assets || this.transaction.assets.length <= 1) {
      return null;
    }

    const assets = Array.isArray(this.transaction.assets) ? this.transaction.assets : [this.transaction.assets];

    return (
      <div class="asset-container">
        {assets.map((asset, index) => (
          <div class="asset" style={{ 'z-index': `${assets.length - index}` }}>
            <img src={asset} alt="Token asset" class="asset-image" loading="lazy" />
          </div>
        ))}
      </div>
    );
  }

  private isOutgoingTransaction() {
    return Boolean(this.transaction?.to);
  }

  private formatAmount() {
    if (!this.transaction?.amount) {
      return '';
    }

    const amount = this.transaction.amount.replace(/^[+-]/, ''); // Remove existing sign if any
    return this.isOutgoingTransaction() ? `-${amount}` : `+${amount}`;
  }

  render() {
    if (!this.transaction) {
      return <Host></Host>;
    }

    const hasMultipleAssets = this.transaction.assets && this.transaction.assets.length > 1;

    return (
      <Host>
        <div class="transaction-item">
          {this.renderLeftIcon()}

          <div class="transaction-details">
            <h4 class="transaction-title">{this.transaction.title}</h4>
            <div class="transaction-info">
              {this.transaction.from && (
                <span class="transaction-target">
                  From <span class="entity-name">{this.transaction.senderUsername || this.transaction.from}</span>
                </span>
              )}
              {this.transaction.to && (
                <span class="transaction-target">
                  To <span class="entity-name">{this.transaction.receiverUsername || this.transaction.to}</span>
                </span>
              )}
            </div>
          </div>

          <div class="transaction-right">
            {hasMultipleAssets ? (
              this.renderMultipleAssets()
            ) : (
              <div class={`transaction-amount ${this.isOutgoingTransaction() ? 'amount-negative' : 'amount-positive'}`}>
                {this.formatAmount()} {this.transaction.label}
              </div>
            )}
          </div>
        </div>
      </Host>
    );
  }
}
