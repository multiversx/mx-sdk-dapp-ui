import { Component, h, Prop } from '@stencil/core';

@Component({
  shadow: true,
  styleUrl: 'back-arrow-icon.scss',
  tag: 'mvx-back-arrow-icon',
})
export class BackArrowIcon {
  @Prop() class?: string;

  render() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 22 20"
        class={{ 'back-arrow-icon': true, [this.class]: Boolean(this.class) }}
      >
        <path d="M0.6875 9.48438L8.9375 1.23438C9.21875 0.953125 9.73438 0.953125 10.0156 1.23438C10.2969 1.51562 10.2969 2.03125 10.0156 2.3125L3.03125 9.25H20.75C21.125 9.25 21.5 9.625 21.5 10C21.5 10.4219 21.125 10.75 20.75 10.75H3.03125L10.0156 17.7344C10.2969 18.0156 10.2969 18.5312 10.0156 18.8125C9.73438 19.0938 9.21875 19.0938 8.9375 18.8125L0.6875 10.5625C0.40625 10.2812 0.40625 9.76562 0.6875 9.48438Z" />
      </svg>
    );
  }
}
