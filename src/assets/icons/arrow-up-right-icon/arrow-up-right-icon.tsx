import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'mvx-arrow-up-right-icon',
  styleUrl: 'arrow-up-right-icon.scss',
  shadow: true,
})
export class ArrowUpRightIcon {
  @Prop() class?: string;

  render() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 10 10"
        class={{ 'arrow-up-right-icon': true, [this.class]: Boolean(this.class) }}
      >
        <path d="M8.9375 0.944824C9.15625 0.944824 9.375 1.16357 9.375 1.38232V7.50732C9.375 7.75342 9.15625 7.94482 8.9375 7.94482C8.69141 7.94482 8.5 7.75342 8.5 7.50732V2.44873L1.36328 9.58545C1.19922 9.74951 0.898438 9.74951 0.734375 9.58545C0.570312 9.42139 0.570312 9.12061 0.734375 8.95654L7.87109 1.81982H2.8125C2.56641 1.81982 2.375 1.62842 2.375 1.38232C2.375 1.16357 2.56641 0.944824 2.8125 0.944824H8.9375Z" />
      </svg>
    );
  }
}
