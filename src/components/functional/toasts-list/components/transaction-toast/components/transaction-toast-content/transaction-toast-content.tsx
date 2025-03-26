import { faTimes } from '@fortawesome/free-solid-svg-icons';
import type { EventEmitter, JSX } from '@stencil/core';
import { Component, Event, h, Prop } from '@stencil/core';
import { DefaultToastsIcon } from 'components/visual/default-icon/default-icon';
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
  @Prop() fullWidth?: boolean;
  @Event() deleteToast: EventEmitter<void>;

  private handleDeleteToast() {
    this.deleteToast.emit();
  }

  private renderPrimaryIcon() {
    const transaction = this.transactions[0];

    if (!transaction?.asset) {
      return <DefaultToastsIcon />;
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

    return <DefaultToastsIcon />;
  }

  private renderDetails() {
    const transaction = this.transactions[0];

    if (!transaction) {
      return null;
    }

    return (
      <div class="transaction-toast-details-info">
        {transaction.directionLabel && <span class="transaction-toast-details-info-text">{transaction.directionLabel}</span>}
        <div class="transaction-toast-details-info-icon">
          {transaction.initiatorAsset ? <img src={transaction.initiatorAsset} alt="Service icon" loading="lazy" /> : <DefaultToastsIcon />}
        </div>
        <trim-text text={transaction.initiator} class="transaction-toast-details-info-text" />
      </div>
    );
  }

  render() {
    const { title, hasCloseButton } = this.toastDataState;
    const transaction = this.transactions[0];
    const showExplorerLinkButton = transaction?.link && this.transactions.length === 1;

    return (
      <div
        class={{
          'transaction-toast-content-wrapper': true,
          'full-width': this.fullWidth,
        }}
        data-testid={DataTestIdsEnum.transactionToastContent}
      >
        <div class="transaction-toast-content">
          <div class="transaction-toast-icon">{this.renderPrimaryIcon()}</div>

          <div class="transaction-toast-details">
            <div class="transaction-toast-details-header">
              <h4 class="transaction-toast-title">{title || transaction?.action?.name}</h4>
              {transaction?.amount && <div class="transaction-toast-amount">{transaction.amount}</div>}
            </div>
            {this.renderDetails()}
          </div>

          {hasCloseButton && (
            <button onClick={this.handleDeleteToast.bind(this)} type="button" class="transaction-toast-action-button" innerHTML={getIconHtmlFromIconDefinition(faTimes)}></button>
          )}

          {!hasCloseButton && showExplorerLinkButton && <explorer-link link={transaction.link} class="transaction-toast-action-button"></explorer-link>}
        </div>

        {!showExplorerLinkButton && <transaction-toast-details transactions={this.transactions} processedTransactionsStatus={this.processedTransactionsStatus} />}
      </div>
    );
  }
}
