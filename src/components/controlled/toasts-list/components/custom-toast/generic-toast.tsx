import type { EventEmitter } from '@stencil/core';
import { Component, Event, h, Prop } from '@stencil/core';
import type { CustomToastType, IComponentToast, ISimpleToast } from 'components/controlled/toasts-list/components/transaction-toast/transaction-toast.type';

@Component({
  tag: 'generic-toast',
})
export class GenericToast {
  @Prop() toast: CustomToastType;
  @Event() handleDeleteToast: EventEmitter<string>;

  render() {
    const isComponentToast = 'instantiateToastElement' in this.toast;
    if (isComponentToast) {
      return <custom-toast toast={this.toast as IComponentToast} onHandleDeleteToast={() => this.handleDeleteToast.emit(this.toast.toastId)} />;
    }

    return <simple-toast toast={this.toast as ISimpleToast} onHandleDeleteToast={() => this.handleDeleteToast.emit(this.toast.toastId)} />;
  }
}
