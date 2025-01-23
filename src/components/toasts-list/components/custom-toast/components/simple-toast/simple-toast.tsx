import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Component, EventEmitter, Prop, Event, h } from '@stencil/core';
import classNames from 'classnames';
import { ISimpleToast } from 'components/toasts-list/components/transaction-toast/transaction-toast.type';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';
import { getIconHtmlFromIconDefinition } from 'utils/icons/getIconHtmlFromIconDefinition';
import { getIconHtmlFromIconName } from 'utils/icons/getIconHtmlFromIconName';

@Component({
  tag: 'simple-toast',
  styleUrl: 'simple-toast.css',
  shadow: true,
})
export class SimpleToast {
  @Prop() toast: ISimpleToast;
  @Event() handleDeleteToast: EventEmitter<void>;

  render() {
    const { icon, iconClassName, title, message, subtitle } = this.toast;

    let iconHtml = null;
    if (typeof icon === 'string') {
      iconHtml = getIconHtmlFromIconName(icon);
    }
    if (icon instanceof HTMLElement) {
      iconHtml = icon.outerHTML;
    }

    return (
      <transaction-toast-wrapper wrapperId={`toast-${this.toast.toastId}`}>
        <div class="content" data-testid={DataTestIdsEnum.transactionToastContent}>
          {iconHtml && (
            <div class={classNames('content-left', { 'no-icon': !iconHtml })}>
              <div class={classNames('content-icon', iconClassName)} innerHTML={iconHtml}></div>
            </div>
          )}

          <div class="content-right">
            {title && (
              <div class="content-heading">
                <h5 class="content-heading-title" data-testid={DataTestIdsEnum.transactionToastTitle}>
                  {title}
                </h5>
              </div>
            )}

            <button onClick={() => this.handleDeleteToast.emit()} type="button" class="icon-close" innerHTML={getIconHtmlFromIconDefinition(faTimes)}></button>

            {subtitle && <div class="subtitle">{subtitle}</div>}
            {message && <div class={classNames('content-message', { 'no-margin': !title && !subtitle })}>{message}</div>}
          </div>
        </div>
      </transaction-toast-wrapper>
    );
  }
}
