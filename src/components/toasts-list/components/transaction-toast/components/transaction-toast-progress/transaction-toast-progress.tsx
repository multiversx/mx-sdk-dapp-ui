import { Component, h,Prop } from '@stencil/core';

@Component({
  tag: 'transaction-toast-progress',
  styleUrl: 'transaction-toast-progress.css',
  shadow: true,
})
export class ToastProgress {
  @Prop() progressClass: string = 'transaction-toast-progress';
  @Prop() currentRemaining?: number;

  render() {
    if (!this.currentRemaining) {
      return <slot></slot>;
    }

    return (
      <div class={this.progressClass}>
        <div
          class="transaction-toast-bar"
          style={{ width: `${this.currentRemaining}%` }}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valnow={this.currentRemaining}
        />
        <slot></slot>
      </div>
    );
  }
}
