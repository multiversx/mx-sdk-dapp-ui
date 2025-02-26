import { faTimes } from '@fortawesome/free-solid-svg-icons';
import type { EventEmitter, JSX } from '@stencil/core';
import { Component, Event, h, Prop } from '@stencil/core';
import classNames from 'classnames';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';
import { getIconHtmlFromIconDefinition } from 'utils/icons/getIconHtmlFromIconDefinition';
import { getIconHtmlFromIconName } from 'utils/icons/getIconHtmlFromIconName';

import type { IToastDataState, ITransaction } from '../../transaction-toast.type';

@Component({
  tag: 'transaction-toast-content',
  styleUrl: 'transaction-toast-content.css',
  shadow: true,
})
export class TransactionToastContent {
  @Prop() transactions: ITransaction[];
  @Prop() toastDataState: IToastDataState;
  @Prop() processedTransactionsStatus?: string | JSX.Element;
  @Prop() maxTransactions: number = 5;
  @Event() deleteToast: EventEmitter<void>;

  private handleDeleteToast() {
    this.deleteToast.emit();
  }

  render() {
    const { icon, iconClassName, title, hasCloseButton } = this.toastDataState;

    let iconHtml = null;
    if (typeof icon === 'string') {
      iconHtml = getIconHtmlFromIconName(icon);
    }
    if (icon instanceof HTMLElement) {
      iconHtml = icon.outerHTML;
    }
    return (
      <div class="content" data-testid={DataTestIdsEnum.transactionToastContent}>
        <div class="content-left">
          <div class={classNames('content-icon', iconClassName)} innerHTML={iconHtml}></div>
        </div>

        <div class="content-right">
          <div class="content-heading">
            <h5 class="content-heading-title" data-testid={DataTestIdsEnum.transactionToastTitle}>
              {title}
            </h5>
            {hasCloseButton && <button onClick={this.handleDeleteToast.bind(this)} type="button" class="icon-close" innerHTML={getIconHtmlFromIconDefinition(faTimes)}></button>}
          </div>

          <div class="content-heading-title">
            <transaction-toast-details transactions={this.transactions} processedTransactionsStatus={this.processedTransactionsStatus} maxTransactions={this.maxTransactions} />
          </div>
        </div>
      </div>
    );
  }
}
