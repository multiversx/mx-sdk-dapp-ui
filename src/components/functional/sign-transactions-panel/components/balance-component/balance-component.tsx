import { Component, h, Prop } from '@stencil/core';
@Component({
  tag: 'mvx-balance-component',
  styleUrl: 'balance-component.css',
  shadow: true,
})
export class BalanceComponent {
  @Prop() amount: string = '';
  @Prop() ticker: string = '';
  @Prop() usdValue?: string;
  @Prop() header?: string = '';

  render() {
    return (
      <div class="balance-container">
        {this.header && <p>{this.header}</p>}
        <div class="amount-container">
          <span class="amount-value">{this.amount}</span>
          <span class="amount-ticker">{this.ticker}</span>
        </div>
        {this.usdValue && <span>{this.usdValue}</span>}
      </div>
    );
  }
}
