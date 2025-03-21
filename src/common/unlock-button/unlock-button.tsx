import { Component, h, Prop } from '@stencil/core';
import { StyledHost } from 'utils/StyledHost';

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
      <StyledHost>
        <div class="unlock-button sdk:bg-blue-500 sdk:text-white p-4">
          <div class="unlock-icon">{this.icon}</div>
          <span class="unlock-label">{this.label}</span>
        </div>
      </StyledHost>
    );
  }
}
