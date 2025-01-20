import { Component, Prop, h } from '@stencil/core';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';
import { forceUpdate, Method } from '../../../dist/types/stencil-public-runtime';

export interface FormatAmountDataType {
  class?: string;
  dataTestId?: string;
  isValid: boolean;
  label?: string;
  labelClass?: string;
  valueDecimal: string;
  valueInteger: string;
}

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

  @Method() public updateData(data: FormatAmountDataType) {
    for (const key in data) {
      this[key] = data[key];
    }

    forceUpdate(this);
  }


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
