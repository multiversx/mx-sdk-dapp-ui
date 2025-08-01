import type { EventEmitter } from '@stencil/core';
import { Component, Event, h, Prop } from '@stencil/core';

import type { ButtonSizeEnum, ButtonVariantEnum } from './button.types';

@Component({
  tag: 'mvx-button',
  styleUrl: 'button.scss',
  shadow: true,
})
export class Button {
  @Event() buttonClick: EventEmitter<MouseEvent>;

  @Prop() class?: string = '';
  @Prop() dataTestId?: string = '';
  @Prop() disabled?: boolean = false;
  @Prop() size?: `${ButtonSizeEnum}` = 'large';
  @Prop() variant?: `${ButtonVariantEnum}` = 'primary';

  render() {
    return (
      <button
        data-testid={this.dataTestId}
        onClick={this.buttonClick.emit.bind(this)}
        disabled={this.disabled}
        class={{
          button: true,
          disabled: this.disabled,
          [this.size]: Boolean(this.size),
          [this.variant]: Boolean(this.variant),
          [this.class]: Boolean(this.class),
        }}
      >
        <slot />
      </button>
    );
  }
}
