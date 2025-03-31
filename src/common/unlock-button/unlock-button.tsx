import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'mvx-unlock-button',
  styleUrl: 'unlock-button.scss',
})
export class UnlockButton {
  @Prop() label: string;
  @Prop() icon: HTMLElement;

  render() {
    return (
      <div class="unlock-button sdk:bg-blue-500 text-white p-4">
        <div class="unlock-icon">{this.icon}</div>
        <span class="unlock-label">{this.label}</span>
      </div>
    );
  }
}
