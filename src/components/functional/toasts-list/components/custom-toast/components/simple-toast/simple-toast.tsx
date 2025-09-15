import { faTimes } from '@fortawesome/free-solid-svg-icons';
import type { EventEmitter } from '@stencil/core';
import { Component, Event, h, Prop, State, Watch } from '@stencil/core';
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
  @State() private iconHtml?: string | null;

  private handleDeleteToast() {
    this.deleteToast.emit();
  }

  async componentWillLoad() {
    await this.updateIconHtml(this.toast.icon);
  }

  @Watch('toast')
  async onToastChange(newValue: ISimpleToast) {
    await this.updateIconHtml(newValue?.icon);
  }

  private async updateIconHtml(icon: ISimpleToast['icon']) {
    if (!icon) {
      this.iconHtml = null;
      return;
    }
    if (typeof icon === 'string') {
      this.iconHtml = await getIconHtmlFromIconName(icon);
      return;
    }
    if (icon instanceof HTMLElement) {
      this.iconHtml = icon.outerHTML;
      return;
    }
    this.iconHtml = null;
  }

  private renderIcon() {
    const { iconClassName } = this.toast;

    if (!this.iconHtml) {
      return null;
    }

    return (
      <div
        class={{
          'content-icon': true,
          [iconClassName]: Boolean(iconClassName),
        }}
        innerHTML={this.iconHtml}
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
