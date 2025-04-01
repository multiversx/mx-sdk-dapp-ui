import type { EventEmitter } from '@stencil/core';
import { Component, Event, h, Prop } from '@stencil/core';
import type { CustomToastType, IComponentToast, ISimpleToast } from 'components/functional/toasts-list/components/transaction-toast/transaction-toast.type';

@Component({
  tag: 'mvx-generic-toast',
})
export class GenericToast {
  @Prop() toast: CustomToastType;
  @Event() deleteToast: EventEmitter<string>;

  render() {
    const isComponentToast = 'instantiateToastElement' in this.toast;
    if (isComponentToast) {
      return <mvx-custom-toast toast={this.toast as IComponentToast} onDeleteToast={() => this.deleteToast.emit(this.toast.toastId)} />;
    }

    return <mvx-simple-toast toast={this.toast as ISimpleToast} onDeleteToast={() => this.deleteToast.emit(this.toast.toastId)} />;
  }
}
