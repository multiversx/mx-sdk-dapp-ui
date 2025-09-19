import { faTimes } from '@fortawesome/free-solid-svg-icons';
import type { EventEmitter } from '@stencil/core';
import { Component, Event, h, Prop } from '@stencil/core';
import classNames from 'classnames';
import type { ISimpleToast } from 'components/functional/toasts-list/components/transaction-toast/transaction-toast.type';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';
import { getIconHtmlFromIconDefinition } from 'utils/icons/getIconHtmlFromIconDefinition';
import { getIconHtmlFromIconName } from 'utils/icons/getIconHtmlFromIconName';

@Component({
  tag: 'mvx-simple-toast',
  styleUrl: 'simple-toast.scss',
})
export class SimpleToast {
  @Prop() toast: ISimpleToast;
  @Event({ bubbles: false, composed: false }) deleteToast: EventEmitter<void>;

  private handleDeleteToast() {
    this.deleteToast.emit();
  }

  private renderIcon() {
    const { icon, iconClassName } = this.toast;

    let iconHtml = null;
    if (typeof icon === 'string') {
      iconHtml = getIconHtmlFromIconName(icon);
    }
    if (icon instanceof HTMLElement) {
      iconHtml = icon.outerHTML;
    }

    if (!iconHtml) {
      return null;
    }

    return (
      <div
        class={{
          'content-icon': true,
          [iconClassName]: Boolean(iconClassName),
        }}
        innerHTML={iconHtml}
      ></div>
    );
  }

  render() {
    const { title, message, subtitle } = this.toast;

    return (
      <div class="content" data-testid={DataTestIdsEnum.transactionToastContent} id={`toast-${this.toast.toastId}`}>
        <div class="content-left">
          {this.renderIcon()}
          <div class="content-right">
            <div class="content-heading">
              {title && (
                <h5 class="content-heading-title" data-testid={DataTestIdsEnum.transactionToastTitle}>
                  {title}
                </h5>
              )}
              <button
                onClick={this.handleDeleteToast.bind(this)}
                type="button"
                class="icon-close"
                innerHTML={getIconHtmlFromIconDefinition(faTimes)}
              ></button>
            </div>
            {subtitle && <div class="subtitle">{subtitle}</div>}
            {message && (
              <div class={classNames('content-message', { 'no-margin': !title && !subtitle })}>{message}</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
