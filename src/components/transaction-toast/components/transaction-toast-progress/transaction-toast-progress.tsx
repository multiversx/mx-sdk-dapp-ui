import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'transaction-toast-progress',
  styleUrl: 'transaction-toast-progress.css',
  shadow: true,
})
export class ToastProgress {
  @Prop() progressClass: string = 'transaction-toast-progress';
  @Prop() currentRemaining?: number;

  render() {
    return this.currentRemaining ? (
      <div class={this.progressClass} id="progress">
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
    ) : (
      <slot></slot>
    );
  }
}
