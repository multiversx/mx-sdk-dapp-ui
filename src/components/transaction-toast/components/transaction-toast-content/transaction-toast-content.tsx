import { Component, EventEmitter, Prop, Event, h } from '@stencil/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import { IToastDataState, ITransaction } from '../../transaction-toast.type';
import { getIconHtmlFromIconName } from 'utils/icons/getIconHtmlFromIconName';
import { getIconHtmlFromIconDefinition } from 'utils/icons/getIconHtmlFromIconDefinition';

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
            <h5 class="content-heading-title">{title}</h5>
            {hasCloseButton && <button onClick={() => this.deleteToast.emit()} type="button" class="icon-close" innerHTML={getIconHtmlFromIconDefinition(faTimes)}></button>}
          </div>

          <div class="content-heading-title">
            <transaction-toast-details transactions={this.transactions} processedTransactionsStatus={this.processedTransactionsStatus} />
          </div>
        </div>
      </div>
    );
  }
}
