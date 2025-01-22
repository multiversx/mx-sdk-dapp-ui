import { Component, Prop, Event, h, EventEmitter } from '@stencil/core';
import { IComponentToastType, ICustomToastType, ISimpleToastType } from 'components/toasts-list/components/transaction-toast/transaction-toast.type';

@Component({
  tag: 'custom-toast',
})
export class CustomToast {
  @Prop() toast: ICustomToastType;
  @Event() handleDeleteToast: EventEmitter<string>;

  render() {
    if (this.toast.instantiateToastElement) {
      return <custom-create-toast toast={this.toast as IComponentToastType} onHandleDeleteToast={() => this.handleDeleteToast.emit(this.toast.toastId)} />;
    }

    return <simple-toast toast={this.toast as ISimpleToastType} onHandleDeleteToast={() => this.handleDeleteToast.emit(this.toast.toastId)} />;
  }
}
