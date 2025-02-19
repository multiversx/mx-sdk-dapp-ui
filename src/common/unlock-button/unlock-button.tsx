import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'unlock-button',
  styleUrl: 'unlock-button.scss',
  shadow: true,
})
export class UnlockButton {
  @Prop() label: string;
  @Prop() icon: HTMLElement;

  render() {
    return (
      <div class="unlock-button">
        <div class="unlock-icon">{this.icon}</div>
        <span class="unlock-label">{this.label}</span>
      </div>
    );
  }
}
