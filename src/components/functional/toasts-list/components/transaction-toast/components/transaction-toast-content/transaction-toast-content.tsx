import { faTimes } from '@fortawesome/free-solid-svg-icons';
import type { EventEmitter, JSX } from '@stencil/core';
import { Component, Event, h, Prop } from '@stencil/core';
import classNames from 'classnames';
import { DefaultIcon } from 'components/visual/default-icon/default-icon';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';
import { getIconHtmlFromIconDefinition } from 'utils/icons/getIconHtmlFromIconDefinition';

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
  @Event() deleteToast: EventEmitter<void>;

  private handleDeleteToast() {
    this.deleteToast.emit();
  }

  private renderIcon() {
    const { iconUrl, iconClassName } = this.toastDataState;

    if (iconUrl) {
      return (
        <div class={classNames('content-icon', iconClassName)}>
          <img src={iconUrl} alt="Transaction icon" class="icon-image" loading="lazy" />
        </div>
      );
    }

    return (
      <div class={classNames('content-icon', iconClassName)}>
        <DefaultIcon />
      </div>
    );
  }

  render() {
    const { title, hasCloseButton } = this.toastDataState;

    return (
      <div class="content" data-testid={DataTestIdsEnum.transactionToastContent}>
        <div class="content-header">
          {this.renderIcon()}
          <h5 class="content-heading-title" data-testid={DataTestIdsEnum.transactionToastTitle}>
            {title}
          </h5>
          {hasCloseButton && <button onClick={this.handleDeleteToast.bind(this)} type="button" class="icon-close" innerHTML={getIconHtmlFromIconDefinition(faTimes)}></button>}
        </div>

        <transaction-toast-details transactions={this.transactions} processedTransactionsStatus={this.processedTransactionsStatus} />
      </div>
    );
  }
}
