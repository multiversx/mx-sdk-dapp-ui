import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'format-amount',
  styleUrl: 'format-amount.css',
  shadow: true
})
export class FormatAmount {
  @Prop() class?: string;
  @Prop() isValid: boolean;
  @Prop() label?: string;
  @Prop() labelClass?: string;
  @Prop() valueDecimal: string;
  @Prop() valueInteger: string;

  private renderInvalid() {
    return (
      <span data-testid='formatAmountComponent' class={this.class}>
        <span class='int-amount' data-testid='formatAmountInt'>
          ...
        </span>
      </span>
    );
  }

  private renderValid() {
    return (
      <span data-testid='formatAmountComponent' class={this.class}>
        <span class='int-amount' data-testid='formatAmountInt'>
          {this.valueInteger}
        </span>
        {this.valueDecimal && (
          <span class='decimals' data-testid='formatAmountDecimals'>
            .{this.valueDecimal}
          </span>
        )}
        {this.label && (
          <span
            class={{
              'symbol': true,
              [this.labelClass]: Boolean(this.labelClass)
            }}
            data-testid='formatAmountSymbol'
          >
            {this.label}
          </span>
        )}
      </span>
    );
  }

  render() {
    return this.isValid ? this.renderValid() : this.renderInvalid();
  }
}
