import { Component, h, Host, Prop } from '@stencil/core';

import { DefaultTransactionIcon } from '../default-icon/default-icon';
import type { ITransactionListItem } from './transaction-list-item.types';

@Component({
  tag: 'mvx-transaction-list-item',
  styleUrl: 'transaction-list-item.scss',
  shadow: true,
})
export class TransactionListItem {
  @Prop() transaction: ITransactionListItem;

  private renderPrimaryIcon() {
    if (!this.transaction.asset) {
      return <DefaultTransactionIcon />;
    }

    if (this.transaction.asset.imageUrl) {
      return <img src={this.transaction.asset.imageUrl} alt="Transaction icon" class="icon-image" loading="lazy" />;
    }

    if (this.transaction.asset.icon) {
      return <mvx-fa-icon icon={this.transaction.asset.icon} class="icon-text"></mvx-fa-icon>;
    }

    if (this.transaction.asset.text) {
      return <span class="icon-text">{this.transaction.asset.text}</span>;
    }

    return <DefaultTransactionIcon />;
  }

  private renderDetails() {
    return (
      <div class="transaction-info">
        <span class="transaction-target">
          {this.transaction.directionLabel && <span class="direction-label">{this.transaction.directionLabel}</span>}
          {this.transaction.interactorAsset && (
            <div class="transaction-icon">
              <img src={this.transaction.interactorAsset} alt="Service icon" class="service-icon" loading="lazy" />
            </div>
          )}
          <mvx-trim-text text={this.transaction.interactor} class="interactor" />
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
            <div class="transaction-details-header">
              <h4 class="transaction-title">{this.transaction.action.name}</h4>
              {this.transaction.amount && (
                <div
                  class={{
                    'transaction-amount': true,
                    'amount-negative': this.transaction.amount.startsWith('-'),
                    'amount-positive': !this.transaction.amount.startsWith('-'),
                  }}
                >
                  {this.transaction.amount}
                </div>
              )}
            </div>
            {this.renderDetails()}
          </div>
        </div>
      </Host>
    );
  }
}
