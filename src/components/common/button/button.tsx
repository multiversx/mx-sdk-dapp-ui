import { Component, h, Prop } from '@stencil/core';
import type { ButtonSizeEnum, ButtonVariantEnum } from '../../../common/Button/button.types';
import { Button as ButtonComponent } from 'common/Button/Button';

@Component({
  tag: 'mvx-button',
  styleUrl: 'button.scss',
  shadow: true,
})

export class Button {
  @Prop() class?: string = '';
  @Prop() dataTestId?: string = '';
  @Prop() disabled?: boolean = false;
  @Prop() size?: `${ButtonSizeEnum}` = 'large';
  @Prop() variant?: `${ButtonVariantEnum}` = 'primary';

  render() {
    return (
      <ButtonComponent
        class={this.class}
        dataTestId={this.dataTestId}
        disabled={this.disabled}
        size={this.size}
        variant={this.variant}
      >
        <slot />
      </ButtonComponent>
    );
  }
}
