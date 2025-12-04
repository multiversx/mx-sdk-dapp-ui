import { Component, h, Prop } from '@stencil/core';
import classNames from 'classnames';
import { FormatAmount } from 'common/FormatAmount/FormatAmount';
import { IconSizeEnumType, TransactionAssetIcon } from 'common/TransactionAssetIcon/TransactionAssetIcon';
import { Trim } from 'common/Trim/Trim';
import { getAmountParts } from 'components/functional/toasts-list/helpers';
import { getIsTransactionFailed } from 'utils/getTransactionStatus';
import styles from './transactionListItem.styles'

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
      <a href={this.transaction.link} target="_blank" rel="noreferrer">
        <div class={styles.transactionItem}>
          <div
            class={classNames(styles.transactionIcon, {
              [styles.transactionIconFailed]: getIsTransactionFailed(this.transaction.status),
            })}
          >
            <TransactionAssetIcon
              transaction={this.transaction}
              iconSize={IconSizeEnumType.large}
              iconClass={styles.transactionIconSvg}
              imgClass={styles.transactionIconImg}
              textClass={styles.transactionIconText}
            />
          </div>

          <div class={styles.transactionDetails}>
            <div class={styles.transactionDetailsHeader}>
              <div class={styles.transactionHeaderLeft}>
                <h4 class={classNames(styles.transactionTitle, { [styles.transactionTitleTruncate]: showTooltip })}>
                  {this.transaction.action.name}
                </h4>

                {showTooltip && (
                  <mvx-tooltip position="bottom" trigger={<mvx-circle-info-icon />}>
                    {amount.label}
                  </mvx-tooltip>
                )}
              </div>

              {this.transaction.amount && (
                <FormatAmount
                  class={classNames(styles.transactionAmount, {
                    [styles.transactionAmountNegative]: this.transaction.amount.startsWith('-'),
                    [styles.transactionAmountPositive]: !this.transaction.amount.startsWith('-'),
                    [styles.transactionFailed]: getIsTransactionFailed(this.transaction.status),
                  })}
                  isValid
                  label={amount.label}
                  valueDecimal={amount.amountDecimal}
                  valueInteger={amount.amountInteger}
                  labelClass={styles.transactionAmountLabel}
                  decimalClass={styles.transactionAmountDecimal}
                />
              )}
            </div>
            <div class={styles.transactionDetailsInfo}>
              {this.transaction.directionLabel && (
                <span class={classNames(styles.transactionDetailsInfoText, styles.transactionDetailsInfoTextSpan)}>{this.transaction.directionLabel}</span>
              )}

              <div class={styles.transactionDetailsInfoIcon}>
                {this.transaction.interactorAsset ? (
                  <img src={this.transaction.interactorAsset} alt="Service icon" loading="lazy" class={styles.transactionDetailsInfoIconImg} />
                ) : (
                  <mvx-default-transaction-icon-small />
                )}
              </div>

              <Trim text={this.transaction.interactor} class={styles.transactionDetailsInfoText} />
            </div>
          </div>
        </div>
      </a>
    );
  }
}
