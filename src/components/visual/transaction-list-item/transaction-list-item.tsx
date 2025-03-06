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
        {this.transaction.asset?.imageUrl ? (
          <img src={this.transaction.asset.imageUrl} alt="Transaction icon" class="icon-image" loading="lazy" />
        ) : this.transaction.asset?.icon ? (
          <fa-icon icon={this.transaction.asset.icon} class="icon-text"></fa-icon>
        ) : this.transaction.asset?.text ? (
          <span class="icon-text">{this.transaction.asset.text}</span>
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
          {this.transaction.details.directionLabel && <span class="direction-label">{this.transaction.details.directionLabel}</span>}
          {this.transaction.details.initiatorAsset && <img src={this.transaction.details.initiatorAsset} alt="Service icon" class="service-icon" loading="lazy" />}
          <trim-text text={this.transaction.details.initiator} class="initiator" />
        </span>
      </div>
    );
  }

  render() {
    if (!this.transaction) {
      return <Host></Host>;
    }

    return (
      <Host>
        <div class="transaction-item">
          {this.renderLeftIcon()}

          <div class="transaction-details">
            <h4 class="transaction-title">{this.transaction.action.name}</h4>
            {this.renderDetails()}
          </div>

          {this.transaction.amount && (
            <div class="transaction-right">
              <div class={`transaction-amount ${this.transaction.amount?.startsWith('-') ? 'amount-negative' : 'amount-positive'}`}>{this.transaction.amount}</div>
            </div>
          )}
        </div>
      </Host>
    );
  }
}
