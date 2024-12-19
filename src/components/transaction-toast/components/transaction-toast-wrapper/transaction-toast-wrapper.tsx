import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'transaction-toast-wrapper',
  styleUrl: 'transaction-toast-wrapper.css',
})
export class TransactionToastWrapper {
  @Prop() wrapperClass: string = 'transaction-toast-wrapper';
  @Prop() wrapperId?: string;

  render() {
    return (
      <div id={this.wrapperId} class={this.wrapperClass}>
        <slot></slot>
      </div>
    );
  }
}
