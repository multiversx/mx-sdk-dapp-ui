import { faTimes } from '@fortawesome/free-solid-svg-icons';
import type { EventEmitter, JSX } from '@stencil/core';
import { Component, Event, h, Prop } from '@stencil/core';
import { IconSizeEnumType } from 'components/common/transaction-asset-icon/transaction-asset-icon';
import { getAmountParts } from 'components/functional/toasts-list/helpers';
import type { ITransactionListItem } from 'components/visual/transaction-list-item/transaction-list-item.types';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import type { IToastDataState } from '../../transaction-toast.type';
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
    const showPrimaryIcon =
      transaction.asset == null || transaction.asset.imageUrl || transaction.asset.icon || transaction.asset.text;

    return (
      <div
        class={{
          'transaction-toast-content-wrapper': true,
          'full-width': this.fullWidth,
        }}
        data-testid={DataTestIdsEnum.transactionToastContent}
      >
        <div class="transaction-toast-content">
          {!showPrimaryIcon && this.toastDataState.icon ? (
            <fa-icon
              icon={this.toastDataState.icon}
              class={`transaction-toast-icon ${this.toastDataState.iconClassName ?? ''}`}
            ></fa-icon>
          ) : (
            <div class="transaction-toast-icon">
              <mvx-transaction-asset-icon transaction={transaction} iconSize={IconSizeEnumType.small} />
            </div>
          )}
          <div class="transaction-toast-details">
            <div class="transaction-toast-details-header">
              <h4
                class={{
                  'transaction-toast-title': true,
                  'transaction-toast-title-short': Boolean(showAmount),
                }}
              >
                {transaction?.action?.name || title}
              </h4>
              {showAmount && (
                <mvx-format-amount
                  class="transaction-toast-amount"
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
            <fa-icon
              icon={faTimes}
              class="transaction-toast-close-icon"
              onClick={this.handleDeleteToast.bind(this)}
            ></fa-icon>
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
