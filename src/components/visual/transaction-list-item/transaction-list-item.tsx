import { Component, h, Prop } from '@stencil/core';
import classNames from 'classnames';

import type { ITransactionListItem } from './transaction-list-item.types';

@Component({
  tag: 'mvx-transaction-list-item',
  styleUrl: 'transaction-list-item.scss',
})
export class TransactionListItem {
  @Prop() transaction: ITransactionListItem;

  render() {
    if (!this.transaction) {
      return null;
    }
    const amount = this.getAmount();

    return (
      <a class="transaction-link" href={this.transaction.link} target="_blank" rel="noreferrer">
        <div class="transaction-item">
          <div class="transaction-icon">
            <mvx-primary-icon transaction={this.transaction} defaultIcon={<mvx-default-transaction-icon-large />} />
          </div>

          <div class="transaction-details">
            <div class="transaction-details-header">
              <h4 class="transaction-title">{this.transaction.action.name}</h4>
              {this.transaction.amount && (
                <mvx-format-amount
                  class={classNames('transaction-amount', {
                    'amount-negative': this.transaction.amount.startsWith('-'),
                    'amount-positive': !this.transaction.amount.startsWith('-'),
                    'transaction-failed': this.transaction.status === 'fail' || this.transaction.status === 'invalid',
                  })}
                  isValid={true}
                  label={amount.label}
                  valueDecimal={amount.amountDecimal}
                  valueInteger={amount.amountInteger}
                  labelClass="transaction-amount-label"
                  decimalClass="transaction-amount-decimal"
                />
              )}
            </div>
            <div class="transaction-details-info">
              {this.transaction.directionLabel && <span class="transaction-details-info-text">{this.transaction.directionLabel}</span>}

              <div class="transaction-details-info-icon">
                {this.transaction.interactorAsset ? <img src={this.transaction.interactorAsset} alt="Service icon" loading="lazy" /> : <mvx-default-transaction-icon-small />}
              </div>

              <mvx-trim-text text={this.transaction.interactor} class="transaction-details-info-text" />
            </div>
          </div>
        </div>
      </a>
    );
  }

  private getAmount() {
    const amount = this.transaction.amount.split(' ');
    const value = amount[0].split('.');
    return {
      amountInteger: value[0],
      amountDecimal: `.${value[1]}`,
      label: amount[1],
    };
  }
}
