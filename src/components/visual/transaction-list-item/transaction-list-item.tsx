import { Component, h, Prop } from '@stencil/core';
import { StyledHost } from 'utils/StyledHost';

import { DefaultTransactionIconLarge, DefaultTransactionIconSmall } from '../default-icon/default-icon';
import type { ITransactionListItem } from './transaction-list-item.types';

@Component({
  tag: 'transaction-list-item',
  styleUrl: 'transaction-list-item.css',
  shadow: false,
})
export class TransactionListItem {
  @Prop() transaction: ITransactionListItem;

  private renderPrimaryIcon() {
    if (!this.transaction.asset) {
      return <DefaultTransactionIconLarge />;
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

    return <DefaultTransactionIconLarge />;
  }

  private renderDetails() {
    return (
      <div class="transaction-details-info">
        {this.transaction.directionLabel && <span class="transaction-details-info-text">{this.transaction.directionLabel}</span>}
        <div class="transaction-details-info-icon">
          {this.transaction.interactorAsset ? <img src={this.transaction.interactorAsset} alt="Service icon" loading="lazy" /> : <DefaultTransactionIconSmall />}
        </div>
        <trim-text text={this.transaction.interactor} class="transaction-details-info-text" />
      </div>
    );
  }

  render() {
    if (!this.transaction) {
      return null;
    }

    return (
      <StyledHost>
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
      </StyledHost>
    );
  }
}
