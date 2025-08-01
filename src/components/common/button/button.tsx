import type { EventEmitter } from '@stencil/core';
import { Component, Event, h, Prop } from '@stencil/core';
import classNames from 'classnames';

export type ButtonVariant = 'primary' | 'secondary' | 'cancel' | 'danger';
export type ButtonSize = 'small' | 'medium' | 'large';

@Component({
  tag: 'mvx-button',
  styleUrl: 'button.scss',
  shadow: true,
})
export class Button {
  @Prop() variant: ButtonVariant = 'primary';
  @Prop() size: ButtonSize = 'medium';
  @Prop() disabled: boolean = false;
  @Prop() loading: boolean = false;
  @Prop() fullWidth: boolean = false;
  @Prop() type: string = 'button';
  @Prop() dataTestId?: string;

  @Event() buttonClick: EventEmitter<MouseEvent>;

  private handleClick = (event: MouseEvent) => {
    if (this.disabled || this.loading) {
      event.preventDefault();
      return;
    }
    this.buttonClick.emit(event);
  };

  render() {
    const buttonClasses = classNames('mvx-button', {
      [`mvx-button--${this.variant}`]: true,
      [`mvx-button--${this.size}`]: true,
      'mvx-button--disabled': this.disabled,
      'mvx-button--loading': this.loading,
      'mvx-button--full-width': this.fullWidth,
    });

    return (
      <button type={this.type} class={buttonClasses} onClick={this.handleClick} data-testid={this.dataTestId}>
        <span class="mvx-button__content">
          <slot />
        </span>
        {this.loading && (
          <span class="mvx-button__spinner">
            <mvx-spinner-icon />
          </span>
        )}
      </button>
    );
  }
}
