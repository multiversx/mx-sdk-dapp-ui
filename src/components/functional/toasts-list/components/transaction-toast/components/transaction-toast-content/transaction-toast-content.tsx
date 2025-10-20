import type { EventEmitter, JSX } from '@stencil/core';
import { Component, Event, h, Prop } from '@stencil/core';
import classNames from 'classnames';
import { Icon } from 'common/Icon';
import { IconSizeEnumType, TransactionAssetIcon } from 'common/TransactionAssetIcon/TransactionAssetIcon';
import { getAmountParts } from 'components/functional/toasts-list/helpers';
import type { ITransactionListItem } from 'components/visual/transaction-list-item/transaction-list-item.types';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import type { IToastDataState } from '../../transaction-toast.type';
import { TransactionStatusEnum } from 'constants/transactionStatus.enum';
import { getIsTransactionFailed } from 'utils/getTransactionStatus';

// prettier-ignore
const styles = {
  transactionToastClose: 'transaction-toast-close mvx:flex mvx:flex-col mvx:justify-center mvx:shrink-0 mvx:cursor-pointer mvx:text-primary'
} satisfies Record<string, string>;

@Component({
  tag: 'mvx-transaction-toast-content',
  styleUrl: 'transaction-toast-content.scss',
})
export class TransactionToastContent {
  @Prop() transactions: ITransactionListItem[];
  @Prop() toastDataState: IToastDataState;
  @Prop() processedTransactionsStatus?: string | JSX.Element;
  @Prop() fullWidth?: boolean;
  @Event() deleteToast: EventEmitter<void>;

  private handleDeleteToast() {
    this.deleteToast.emit();
  }

  render() {
    const { title, hasCloseButton } = this.toastDataState;
    const [transaction] = this.transactions;
    const showAmount = this.transactions.length === 1 && transaction?.amount;
    const showExplorerLinkButton = transaction?.link && this.transactions.length === 1;
    const amount = transaction && getAmountParts(transaction.amount);
    const showTooltip = showAmount && amount.label.length > 10;

    return (
      <div
        class={{
          'transaction-toast-content-wrapper': true,
          'full-width': this.fullWidth,
        }}
        data-testid={DataTestIdsEnum.transactionToastContent}
      >
        <div class="transaction-toast-content">
          {this.toastDataState.icon ? (
            <Icon
              name={this.toastDataState.icon}
              class={classNames('transaction-toast-icon',
                {
                  'transaction-toast-icon-failed': this.toastDataState.iconClassName === 'danger',
                  'transaction-toast-icon-pending': this.toastDataState.iconClassName === 'warning',
                  'transaction-toast-icon-success': this.toastDataState.iconClassName === 'success',

                })}
            />
          ) : (
            <div
              class={classNames('transaction-toast-icon', {
                'transaction-toast-icon-failed': getIsTransactionFailed(transaction.status),
                'transaction-toast-icon-pending': transaction.status === TransactionStatusEnum.pending,
                'transaction-toast-icon-success': transaction.status === TransactionStatusEnum.success,
              })}
            >
              <TransactionAssetIcon transaction={transaction} iconSize={IconSizeEnumType.small} />
            </div>
          )}
          <div class="transaction-toast-details">
            <div class="transaction-toast-details-header">
              <div class="transaction-toast-header-left">
                <h4
                  class={{
                    'transaction-toast-title': true,
                    'transaction-toast-title-short': Boolean(showAmount),
                    'truncate-toast-title': showTooltip,
                  }}
                >
                  {title}
                </h4>

                {showTooltip && (
                  <mvx-tooltip position="bottom" trigger={<mvx-circle-info-icon />}>
                    {amount.label}
                  </mvx-tooltip>
                )}
              </div>
              {showAmount && (
                <mvx-format-amount
                  class={classNames('transaction-toast-amount', {
                    'amount-negative': transaction.amount.startsWith('-'),
                    'amount-positive': !transaction.amount.startsWith('-'),
                    'transaction-toast-failed': getIsTransactionFailed(transaction.status)
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
            {transaction && (
              <div class="transaction-toast-details-info">
                {transaction.directionLabel && (
                  <span class="transaction-toast-details-info-text">{transaction.directionLabel}</span>
                )}
                <div class="transaction-toast-details-info-icon">
                  {transaction.interactorAsset ? (
                    <img src={transaction.interactorAsset} alt="Service icon" loading="lazy" />
                  ) : (
                    <mvx-default-transaction-icon-small />
                  )}
                </div>
                <mvx-trim text={transaction.interactor} class="transaction-toast-details-info-text" />
              </div>
            )}
          </div>

          {hasCloseButton && (
            <Icon name="close" class={styles.transactionToastClose} onClick={this.handleDeleteToast.bind(this)} />
          )}

          {!hasCloseButton && showExplorerLinkButton && (
            <mvx-explorer-link link={transaction.link} class="transaction-toast-action-button" />
          )}
        </div>

        {!showExplorerLinkButton && (
          <mvx-transaction-toast-details
            transactions={this.transactions}
            processedTransactionsStatus={this.processedTransactionsStatus}
          />
        )}
      </div>
    );
  }
}
