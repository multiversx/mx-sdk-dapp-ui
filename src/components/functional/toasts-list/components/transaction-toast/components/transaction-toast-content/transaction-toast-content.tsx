import { faTimes } from '@fortawesome/free-solid-svg-icons';
import type { EventEmitter, JSX } from '@stencil/core';
import { Component, Event, h, Prop } from '@stencil/core';
import { DefaultIcon } from 'components/visual/default-icon/default-icon';
import type { ITransactionListItem } from 'components/visual/transaction-list-item/transaction-list-item.types';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';
import { getIconHtmlFromIconDefinition } from 'utils/icons/getIconHtmlFromIconDefinition';

import type { IToastDataState } from '../../transaction-toast.type';
@Component({
  tag: 'transaction-toast-content',
  styleUrl: 'transaction-toast-content.css',
  shadow: true,
})
export class TransactionToastContent {
  @Prop() transactions: ITransactionListItem[];
  @Prop() toastDataState: IToastDataState;
  @Prop() processedTransactionsStatus?: string | JSX.Element;
  @Event() deleteToast: EventEmitter<void>;

  private handleDeleteToast() {
    this.deleteToast.emit();
  }

  private renderPrimaryIcon() {
    const transaction = this.transactions[0];

    if (!transaction?.asset) {
      return <DefaultIcon />;
    }

    if (transaction.asset.imageUrl) {
      return <img src={transaction.asset.imageUrl} alt="Transaction icon" class="icon-image" loading="lazy" />;
    }

    if (transaction.asset.icon) {
      return <fa-icon icon={transaction.asset.icon} class="icon-text"></fa-icon>;
    }

    if (transaction.asset.text) {
      return <span class="icon-text">{transaction.asset.text}</span>;
    }

    return <DefaultIcon />;
  }

  private renderDetails() {
    const transaction = this.transactions[0];

    if (!transaction?.details) {
      return null;
    }

    return (
      <div class="transaction-info">
        <span class="transaction-target">
          {transaction.details.directionLabel && <span class="direction-label">{transaction.details.directionLabel}</span>}
          {transaction.details.initiatorAsset && (
            <div class="transaction-icon">
              <img src={transaction.details.initiatorAsset} alt="Service icon" class="service-icon" loading="lazy" />
            </div>
          )}
          <trim-text text={transaction.details.initiator} class="initiator" />
        </span>
      </div>
    );
  }

  render() {
    const { title, hasCloseButton } = this.toastDataState;
    const transaction = this.transactions[0];

    return (
      <div class="content" data-testid={DataTestIdsEnum.transactionToastContent}>
        <div class="transaction-item">
          <div class="transaction-icon">{this.renderPrimaryIcon()}</div>

          <div class="transaction-details">
            <h4 class="transaction-title">{title || transaction?.action?.name}</h4>
            {this.renderDetails()}
          </div>

          {transaction?.amount && (
            <div class="transaction-right">
              <div
                class={{
                  'transaction-amount': true,
                  'amount-negative': transaction.amount.startsWith('-'),
                  'amount-positive': !transaction.amount.startsWith('-'),
                }}
              >
                {transaction.amount}
              </div>
            </div>
          )}

          {hasCloseButton && <button onClick={this.handleDeleteToast.bind(this)} type="button" class="icon-close" innerHTML={getIconHtmlFromIconDefinition(faTimes)}></button>}
        </div>

        <transaction-toast-details transactions={this.transactions} processedTransactionsStatus={this.processedTransactionsStatus} />
      </div>
    );
  }
}
