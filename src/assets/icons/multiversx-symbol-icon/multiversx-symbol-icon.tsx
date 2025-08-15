import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'mvx-multiversx-symbol-icon',
  styleUrl: 'multiversx-symbol-icon.scss',
  shadow: true,
})
export class MultiversXSymbolIcon {
  @Prop() class?: string;

  render() {
    return (
      <svg
        viewBox="0 0 33 24"
        xmlns="http://www.w3.org/2000/svg"
        class={{ 'multiversx-symbol-icon': true, [this.class]: Boolean(this.class) }}
      >
        <path d="M17.8956 12.0018L32.0458 4.52327L29.6668 0L16.7098 5.18441C16.3761 5.31809 16.0062 5.31809 15.6726 5.18441L2.71192 0L0.333008 4.52327L14.4832 12.0018L0.333008 19.4767L2.71192 24L15.669 18.8156C16.0027 18.6819 16.3725 18.6819 16.7061 18.8156L29.6632 24L32.0421 19.4767L17.8919 11.9982L17.8956 12.0018Z" />
      </svg>
    );
  }
}
