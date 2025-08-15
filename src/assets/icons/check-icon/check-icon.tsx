import { Component, h, Prop } from '@stencil/core';

// prettier-ignore
const styles = {
  checkIcon: 'check-icon mvx:w-auto mvx:h-full mvx:text-primary mvx:fill-current',
} satisfies Record<string, string>;

@Component({
  shadow: false,
  tag: 'mvx-check-icon',
})
export class CheckIcon {
  @Prop() class?: string;

  render() {
    return (
      <svg
        viewBox="0 0 448 512"
        xmlns="http://www.w3.org/2000/svg"
        class={{ [styles.checkIcon]: true, [this.class]: Boolean(this.class) }}
      >
        <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
      </svg>
    );
  }
}
