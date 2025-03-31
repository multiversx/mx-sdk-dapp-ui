import { faTimes } from '@fortawesome/free-solid-svg-icons';
import type { EventEmitter } from '@stencil/core';
import { Component, Event, h, Prop } from '@stencil/core';
import type { IComponentToast } from 'components/functional/toasts-list/components/transaction-toast/transaction-toast.type';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';
import { getIconHtmlFromIconDefinition } from 'utils/icons/getIconHtmlFromIconDefinition';

@Component({
  tag: 'custom-toast',
  styleUrl: 'custom-toast.css',
  shadow: false,
})
export class CustomToast {
  @Prop() toast: IComponentToast;
  @Event() deleteToast: EventEmitter<string>;

  private handleDeleteToast() {
    this.deleteToast.emit();
  }

  render() {
    return (
      <div class="toast-wrapper" data-testid={DataTestIdsEnum.transactionToastContent}>
        <button onClick={this.handleDeleteToast.bind(this)} type="button" class="icon-close" innerHTML={getIconHtmlFromIconDefinition(faTimes)}></button>
        <div class="toast-body" ref={container => this.initializeToast(container)}></div>
      </div>
    );
  }

  private initializeToast(container: HTMLElement) {
    if (!container || container.hasChildNodes()) {
      return;
    }
    const customElement = this.toast.instantiateToastElement();
    if (!customElement) {
      return;
    }
    container.appendChild(customElement);
  }
}
