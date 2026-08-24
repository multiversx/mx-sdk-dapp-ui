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
          'mvx-content-icon': true,
          [String(iconClassName)]: Boolean(iconClassName),
        }}
      >
        <Icon name={icon} />
      </div>
    );
  }

  render() {
    const { title, message, subtitle } = this.toast;

    return (
      <div class="mvx-content" data-testid={DataTestIdsEnum.transactionToastContent} id={`toast-${this.toast.toastId}`}>
        <div class="mvx-content-left">
          {this.renderIcon()}
          <div class="mvx-content-right">
            <div class="mvx-content-heading">
              {title && (
                <h5 class="mvx-content-heading-title" data-testid={DataTestIdsEnum.transactionToastTitle}>
                  {title}
                </h5>
              )}
              {this.toast.hasCloseButton !== false && (
                <button onClick={this.handleDeleteToast.bind(this)} type="button" class="mvx-icon-close">
                  <Icon name="close" />
                </button>
              )}
            </div>
            {subtitle && <div class="mvx-subtitle">{subtitle}</div>}
            {message && (
              <div class={classNames('mvx-content-message', { 'mvx-no-margin': !title && !subtitle })}>{message}</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
