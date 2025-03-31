import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'mvx-unlock-button',
  styleUrl: 'mvx-unlock-button.scss',
})
export class MvxUnlockButton {
  @Prop() label: string;
  @Prop() icon: HTMLElement;

  render() {
    return (
      <div class="unlock-button mvx:bg-blue-500 text-white p-4">
        <div class="unlock-icon">{this.icon}</div>
        <span class="unlock-label">{this.label}</span>
      </div>
    );
  }
}
