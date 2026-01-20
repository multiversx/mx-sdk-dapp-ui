import { Component, h, Prop } from '@stencil/core';
import { FormatAmount as FormatAmountComponent } from 'common/FormatAmount/FormatAmount';

@Component({
  tag: 'mvx-format-amount',
  styleUrl: 'format-amount.scss',
})
export class FormatAmount {
  @Prop() class?: string;
  @Prop() 'data-testid'?: string;
  @Prop() isValid: boolean;
  @Prop() label?: string;
  @Prop() labelClass?: string;
  @Prop() showLabel?: boolean = true;
  @Prop() valueDecimal: string;
  @Prop() valueInteger: string;
  @Prop() decimalClass?: string;

  render() {
    return (
      <FormatAmountComponent
        class={this.class}
        data-testid={this['data-testid']}
        isValid={this.isValid}
        label={this.label}
        labelClass={this.labelClass}
        showLabel={this.showLabel}
        valueDecimal={this.valueDecimal}
        valueInteger={this.valueInteger}
        decimalClass={this.decimalClass}
      />
    );
  }
}
