import { faTimes } from '@fortawesome/free-solid-svg-icons';
import type { EventEmitter } from '@stencil/core';
import { Component, Event, h, Prop } from '@stencil/core';
import type { IComponentToast } from 'components/functional/toasts-list/components/transaction-toast/transaction-toast.type';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';
import { getIconHtmlFromIconDefinition } from 'utils/icons/getIconHtmlFromIconDefinition';

@Component({
  tag: 'mvx-custom-toast',
  styleUrl: 'custom-toast.scss',
})
export class CustomToast {
  @Prop() toast: IComponentToast;
  @Event({ bubbles: false, composed: false }) deleteToast: EventEmitter<string>;

  private handleDeleteToast() {
    this.deleteToast.emit();
  }

  render() {
    return (
      <div class="toast-wrapper" data-testid={DataTestIdsEnum.transactionToastContent}>
        {this.toast.hasCloseButton !== false && (
          <button
            onClick={this.handleDeleteToast.bind(this)}
            type="button"
            class="icon-close"
            innerHTML={getIconHtmlFromIconDefinition(faTimes)}
          />
        )}
        <div class="toast-body" ref={container => this.initializeToast(container)}></div>
      </div>
    );
  }

  private initializeToast(container: HTMLElement) {
    if (!container) {
      return;
    }

    // Clear previous toast element
    if (container.hasChildNodes()) {
      container.innerHTML = '';
    }

    const customElement = this.toast.instantiateToastElement();
    if (!customElement) {
      return;
    }
    container.appendChild(customElement);
  }
}
