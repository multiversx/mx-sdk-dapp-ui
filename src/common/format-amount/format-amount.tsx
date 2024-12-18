import { Component, Prop, h } from '@stencil/core';
import BigNumber from 'bignumber.js';
import { DECIMALS, DIGITS, formatAmount, ZERO } from '@multiversx/sdk-dapp-utils/out';

@Component({
  tag: 'format-amount',
  styleUrl: 'format-amount.css',
  shadow: true
})
export class FormatAmount {
  @Prop() class?: string;
  @Prop() decimals?: number = DECIMALS;
  @Prop() digits?: number = DIGITS;
  @Prop() egldLabel?: string;
  @Prop() showLabel?: boolean = true;
  @Prop() showLastNonZeroDecimal?: boolean = false;
  @Prop() styles?: { [key: string]: string } = {};
  @Prop() token?: string;
  @Prop() value: string;

  private renderInvalid() {
    return (
      <span data-testid='formatAmountComponent' class={this.class}>
        <span class={this.styles['int-amount']} data-testid='formatAmountInt'>
          ...
        </span>
      </span>
    );
  }

  private renderValid() {
    const formattedValue = formatAmount({
      input: this.value,
      decimals: this.decimals,
      digits: this.digits,
      showLastNonZeroDecimal: this.showLastNonZeroDecimal,
      addCommas: true
    });

    const valueParts = formattedValue.split('.');
    const hasNoDecimals = valueParts.length === 1;
    const isNotZero = formattedValue !== ZERO;

    if (this.digits > 0 && hasNoDecimals && isNotZero) {
      valueParts.push(ZERO.repeat(this.digits));
    }

    return (
      <span data-testid='formatAmountComponent' class={this.class}>
        <span class={this.styles['int-amount']} data-testid='formatAmountInt'>
          {valueParts[0]}
        </span>
        {valueParts.length > 1 && (
          <span class={this.styles.decimals} data-testid='formatAmountDecimals'>
            .{valueParts[1]}
          </span>
        )}
        {this.showLabel && (
          <span
            class={{
              [this.styles.symbol]: true,
              [this.token]: !!this.token
            }}
            data-testid='formatAmountSymbol'
          >
            {` ${this.token ?? this.egldLabel}`}
          </span>
        )}
      </span>
    );
  }

  render() {
    const isInteger = new BigNumber(this.value).isInteger();
    return !isInteger ? this.renderInvalid() : this.renderValid();
  }
}
