import { Component, h, Prop } from '@stencil/core';
import classNames from 'classnames';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

@Component({
  tag: 'mvx-format-amount',
  styleUrl: 'format-amount.scss',
})
export class FormatAmount {
  @Prop() class?: string;
  @Prop() dataTestId?: string;
  @Prop() isValid: boolean;
  @Prop() label?: string;
  @Prop() labelClass?: string;
  @Prop() showLabel?: boolean = true;
  @Prop() valueDecimal: string;
  @Prop() valueInteger: string;
  @Prop() decimalClass?: string;

  render() {
    return this.isValid ? this.renderValid() : this.renderInvalid();
  }

  private renderInvalid() {
    return (
      <span data-testid={this.dataTestId ?? DataTestIdsEnum.formatAmountComponent} class={this.class}>
        <span class="int-amount" data-testid={DataTestIdsEnum.formatAmountInt}>
          ...
        </span>
      </span>
    );
  }

  private renderValid() {
    return (
      <span data-testid={this.dataTestId} class={classNames(this.class, 'format-amount')}>
        <span class="int-amount" data-testid={DataTestIdsEnum.formatAmountInt}>
          {this.valueInteger}
        </span>
        {this.valueDecimal && (
          <span
            class={{ decimals: true, [this.decimalClass]: Boolean(this.decimalClass) }}
            data-testid={DataTestIdsEnum.formatAmountDecimals}
          >
            {this.valueDecimal}
          </span>
        )}
        {this.showLabel && this.label && (
          <span
            class={{
              symbol: true,
              [this.labelClass]: Boolean(this.labelClass),
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
