import { h } from '@stencil/core';
import classNames from 'classnames';
import { FormatAmount } from 'common/FormatAmount/FormatAmount';
import { Icon } from 'common/Icon';
import { Tooltip } from 'common/Tooltip/Tooltip';
import { IconSizeEnumType, TransactionAssetIcon } from 'common/TransactionAssetIcon/TransactionAssetIcon';
import { Trim } from 'common/Trim/Trim';
import { getAmountParts } from 'components/functional/toasts-list/helpers/getAmountParts';
import { getIsTransactionFailed } from 'utils/getTransactionStatus';

import styles from './transactionListItem.styles';
import type { ITransactionListItem } from './transactionListItem.types';

interface TransactionListItemPropsType {
  transaction: ITransactionListItem;
}

export function TransactionListItem({ transaction }: TransactionListItemPropsType) {
  if (!transaction) {
    return null;
  }
  const amount = getAmountParts(transaction?.amount ?? '');
  const showTooltip = transaction.amount && amount.label.length > 12;

  return (
    <a href={transaction.link || '#'} target="_blank" rel="noopener noreferrer">
      <div class={styles.transactionItem}>
        <div
          class={classNames(styles.transactionIcon, {
            [styles.transactionIconFailed]: getIsTransactionFailed(transaction.status),
          })}
        >
          <TransactionAssetIcon
            transaction={transaction}
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
                {transaction.action?.name || 'Unknown Action'}
              </h4>

              {showTooltip && (
                <Tooltip position="bottom" trigger={<Icon name="circle-info" />}>
                  {amount.label}
                </Tooltip>
              )}
            </div>

            {transaction.amount && (
              <FormatAmount
                class={classNames(styles.transactionAmount, {
                  [styles.transactionAmountNegative]: transaction.amount.startsWith('-'),
                  [styles.transactionAmountPositive]: !transaction.amount.startsWith('-'),
                  [styles.transactionFailed]: getIsTransactionFailed(transaction.status),
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
            {transaction.directionLabel && (
              <span class={styles.transactionDetailsInfoText}>{transaction.directionLabel}</span>
            )}

            <div class={styles.transactionDetailsInfoIcon}>
              {transaction.interactorAsset ? (
                <img
                  src={transaction.interactorAsset}
                  alt="Service icon"
                  loading="lazy"
                  class={styles.transactionDetailsInfoIconImg}
                />
              ) : (
                <Icon name="default-transaction-icon-small" />
              )}
            </div>

            <Trim text={transaction.interactor} class={styles.transactionDetailsInfoText} />
          </div>
        </div>
      </div>
    </a>
  );
}
