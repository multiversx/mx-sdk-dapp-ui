import { Component, h, Host, Prop } from '@stencil/core';

import defaultIcon from './assets/default-icon.svg';
import type { ITransactionListItem } from './transaction-list-item.types';

@Component({
  tag: 'transaction-list-item',
  styleUrl: 'transaction-list-item.scss',
  shadow: true,
})
export class TransactionListItem {
  @Prop() transaction: ITransactionListItem;

  private renderLeftIcon() {
    return (
      <div class="transaction-icon">
        {this.transaction.mainIconUrl ? (
          <img src={this.transaction.mainIconUrl} alt="Transaction icon" class="icon-image" loading="lazy" />
        ) : (
          <img src={defaultIcon} alt="Default transaction icon" class="icon-image" />
        )}
      </div>
    );
  }

  private renderDetails() {
    if (!this.transaction.details) {
      return null;
    }

    return (
      <div class="transaction-info">
        <span class="transaction-target">
          {this.transaction.details.iconUrl && <img src={this.transaction.details.iconUrl} alt="Service icon" class="service-icon" loading="lazy" />}
          {this.transaction.details.directionLabel} <span class="entity-name">{this.transaction.details.initiator}</span>
        </span>
      </div>
    );
  }

  private renderRightIcons() {
    if (!this.transaction.rightIcons?.length) {
      return null;
    }

    return (
      <div class="asset-container">
        {this.transaction.rightIcons.map((iconUrl, index) => (
          <div class="asset" style={{ 'z-index': `${this.transaction.rightIcons!.length - index}` }}>
            <img src={iconUrl} alt="Token asset" class="asset-image" loading="lazy" />
          </div>
        ))}
      </div>
    );
  }

  render() {
    if (!this.transaction) {
      return <Host></Host>;
    }

    const hasRightIcons = this.transaction.rightIcons?.length > 0;

    return (
      <Host>
        <div class="transaction-item">
          {this.renderLeftIcon()}

          <div class="transaction-details">
            <h4 class="transaction-title">{this.transaction.title}</h4>
            {this.renderDetails()}
          </div>

          <div class="transaction-right">
            {hasRightIcons ? (
              this.renderRightIcons()
            ) : (
              <div class={`transaction-amount ${this.transaction.amount.startsWith('-') ? 'amount-negative' : 'amount-positive'}`}>{this.transaction.amount}</div>
            )}
          </div>
        </div>
      </Host>
    );
  }
}
