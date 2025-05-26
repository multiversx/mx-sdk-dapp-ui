import { Component, h, Prop } from '@stencil/core';

@Component({
  shadow: true,
  tag: 'mvx-check-icon',
  styleUrl: 'check-icon.scss',
})
export class CheckIcon {
  @Prop() class?: string;

  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class={{ 'check-icon': true, [this.class]: Boolean(this.class) }}>
        <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
      </svg>
    );
  }
}
