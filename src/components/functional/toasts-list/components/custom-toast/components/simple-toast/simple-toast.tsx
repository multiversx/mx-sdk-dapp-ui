import type { EventEmitter } from '@stencil/core';
import { Component, Event, h, Prop } from '@stencil/core';
import classNames from 'classnames';
import { Icon } from 'common/Icon';
import type { ISimpleToast } from 'components/functional/toasts-list/components/transaction-toast/transaction-toast.type';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

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

    return (
      <div
        class={{
          'content-icon': true,
          [iconClassName]: Boolean(iconClassName),
        }}
      >
        <Icon name={icon} />
      </div>
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
              {this.toast.hasCloseButton !== false && (
                <button
                  onClick={this.handleDeleteToast.bind(this)}
                  type="button"
                  class="icon-close"
                >
                  <Icon name='close' />
                </button>
              )}
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
