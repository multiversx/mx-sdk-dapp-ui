import type { EventEmitter } from '@stencil/core';
import { Component, Element, Event, h, Prop } from '@stencil/core';
import { Button as ButtonComponent } from 'common/Button/Button';

import type { ButtonSizeEnum, ButtonVariantEnum } from '../../../common/Button/button.types';

@Component({
  tag: 'mvx-button',
  styleUrl: 'button.scss',
  shadow: true,
})
export class Button {
  @Element() hostElement!: HTMLElement;

  @Event() buttonClick: EventEmitter<MouseEvent>;

  @Prop() class?: string = '';
  @Prop({ attribute: 'data-testid' }) dataTestId?: string = '';
  @Prop() disabled?: boolean = false;
  @Prop() size?: `${ButtonSizeEnum}` = 'large';
  @Prop() variant?: `${ButtonVariantEnum}` = 'primary';

  /**
   * Stencil reflects `data-testid` to the host element based on the Prop decorator above.
   * That causes two DOM nodes with the same `data-testid`: the `<mvx-button>` host and
   * the inner `<button>`, which breaks Playwright strict mode. We keep using the
   * attribute to populate `dataTestId`, but remove it from the host after render so that
   * only the inner `<button>` keeps the `data-testid`.
   */
  componentDidRender() {
    if (this.hostElement.hasAttribute('data-testid')) {
      this.hostElement.removeAttribute('data-testid');
    }
  }

  private handleClick = (event: MouseEvent) => {
    this.buttonClick.emit(event);
  };

  render() {
    return (
      <ButtonComponent
        class={this.class}
        data-testid={this.dataTestId}
        disabled={this.disabled}
        size={this.size}
        variant={this.variant}
        onClick={this.handleClick}
      >
        <slot />
      </ButtonComponent>
    );
  }
}
