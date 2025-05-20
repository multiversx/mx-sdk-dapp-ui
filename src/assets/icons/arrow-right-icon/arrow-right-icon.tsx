import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'mvx-arrow-right-icon',
  styleUrl: 'arrow-right-icon.scss',
  shadow: true,
})
export class ArrowRightIcon {
  @Prop() class?: string;

  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class={{ 'arrow-right-icon': true, [this.class]: Boolean(this.class) }}>
        <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
      </svg>
    );
  }
}
