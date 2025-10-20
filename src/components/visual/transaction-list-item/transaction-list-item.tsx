import { Component, h, Prop } from '@stencil/core';
import classNames from 'classnames';
import { IconSizeEnumType, TransactionAssetIcon } from 'common/TransactionAssetIcon/TransactionAssetIcon';
import { getAmountParts } from 'components/functional/toasts-list/helpers';
import { TransactionStatusEnum } from 'constants/transactionStatus.enum';

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
    const amount = getAmountParts(this.transaction?.amount ?? '');
    const showTooltip = this.transaction.amount && amount.label.length > 12;

    return (
      <a class="transaction-link" href={this.transaction.link} target="_blank" rel="noreferrer">
        <div class="transaction-item">
          <div
            class={classNames('transaction-icon', {
              'transaction-icon-failed': this.transaction.status === TransactionStatusEnum.fail || this.transaction.status === TransactionStatusEnum.invalid,
            })}
          >
            <TransactionAssetIcon transaction={this.transaction} iconSize={IconSizeEnumType.large} />
          </div>

          <div class="transaction-details">
            <div class="transaction-details-header">
              <div class="transaction-header-left">
                <h4 class={classNames('transaction-title', { truncate: showTooltip })}>
                  {this.transaction.action.name}
                </h4>

                {showTooltip && (
                  <mvx-tooltip position="bottom" trigger={<mvx-circle-info-icon />}>
                    {amount.label}
                  </mvx-tooltip>
                )}
              </div>

              {this.transaction.amount && (
                <mvx-format-amount
                  class={classNames('transaction-amount', {
                    'amount-negative': this.transaction.amount.startsWith('-'),
                    'amount-positive': !this.transaction.amount.startsWith('-'),
                    'transaction-failed': this.transaction.status === TransactionStatusEnum.fail || this.transaction.status === TransactionStatusEnum.invalid,
                  })}
                  isValid
                  label={amount.label}
                  valueDecimal={amount.amountDecimal}
                  valueInteger={amount.amountInteger}
                  labelClass="transaction-amount-label"
                  decimalClass="transaction-amount-decimal"
                />
              )}
            </div>
            <div class="transaction-details-info">
              {this.transaction.directionLabel && (
                <span class="transaction-details-info-text">{this.transaction.directionLabel}</span>
              )}

              <div class="transaction-details-info-icon">
                {this.transaction.interactorAsset ? (
                  <img src={this.transaction.interactorAsset} alt="Service icon" loading="lazy" />
                ) : (
                  <mvx-default-transaction-icon-small />
                )}
              </div>

              <mvx-trim text={this.transaction.interactor} class="transaction-details-info-text" />
            </div>
          </div>
        </div>
      </a>
    );
  }
}
