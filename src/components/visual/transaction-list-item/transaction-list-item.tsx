import { Component, h, Host, Prop } from '@stencil/core';

import { DefaultIcon } from './assets/default-icon';
import type { ITransactionListItem } from './transaction-list-item.types';

@Component({
  tag: 'transaction-list-item',
  styleUrl: 'transaction-list-item.scss',
  shadow: true,
})
export class TransactionListItem {
  @Prop() transaction: ITransactionListItem;

  private renderPrimaryIcon() {
    if (!this.transaction.asset) {
      return <DefaultIcon />;
    }

    if (this.transaction.asset.imageUrl) {
      return <img src={this.transaction.asset.imageUrl} alt="Transaction icon" class="icon-image" loading="lazy" />;
    }

    if (this.transaction.asset.icon) {
      return <fa-icon icon={this.transaction.asset.icon} class="icon-text"></fa-icon>;
    }

    if (this.transaction.asset.text) {
      return <span class="icon-text">{this.transaction.asset.text}</span>;
    }

    return <DefaultIcon />;
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
          <div class="transaction-icon">{this.renderPrimaryIcon()}</div>

          <div class="transaction-details">
            <h4 class="transaction-title">{this.transaction.action.name}</h4>
            {this.renderDetails()}
          </div>

          {this.transaction.amount && (
            <div class="transaction-right">
              <div
                class={{
                  'transaction-amount': true,
                  'amount-negative': this.transaction.amount.startsWith('-'),
                  'amount-positive': !this.transaction.amount.startsWith('-'),
                }}
              >
                {this.transaction.amount}
              </div>
            </div>
          )}
        </div>
      </Host>
    );
  }
}
