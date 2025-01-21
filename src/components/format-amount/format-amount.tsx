import { Component, Prop, h } from '@stencil/core';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

@Component({
  tag: 'format-amount',
  styleUrl: 'format-amount.css',
  shadow: true
})
export class FormatAmount {
  @Prop() class?: string;
  @Prop() dataTestId?: string = DataTestIdsEnum.formatAmountComponent;
  @Prop() isValid: boolean;
  @Prop() label?: string;
  @Prop() labelClass?: string;
  @Prop() valueDecimal: string;
  @Prop() valueInteger: string;


  render() {
    return this.isValid ? this.renderValid() : this.renderInvalid();
  }

  private renderInvalid() {
    return (
      <span data-testid={this.dataTestId} class={this.class}>
        <span class='int-amount' data-testid={DataTestIdsEnum.formatAmountInt}>
          ...
        </span>
      </span>
    );
  }

  private renderValid() {
    return (
      <span data-testid={this.dataTestId} class={this.class}>
        <span class='int-amount' data-testid={DataTestIdsEnum.formatAmountInt}>
          {this.valueInteger}
        </span>
        {this.valueDecimal && (
          <span class='decimals' data-testid={DataTestIdsEnum.formatAmountDecimals}>
            .{this.valueDecimal}
          </span>
        )}
        {this.label && (
          <span
            class={{
              'symbol': true,
              [this.labelClass]: Boolean(this.labelClass)
            }}
            data-testid={DataTestIdsEnum.formatAmountSymbol}
          >
            {this.label}
          </span>
        )}
      </span>
    );
  }

}
