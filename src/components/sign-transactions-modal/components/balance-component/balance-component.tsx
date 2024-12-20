import { Component, Prop, h } from '@stencil/core';
@Component({
  tag: 'balance-component',
  styleUrl: 'balance-component.css',
  shadow: true,
})
export class BalanceComponent {
  @Prop() amount: string = '';
  @Prop() ticker: string = '';
  @Prop() usdValue?: string;

  render() {
    return (
      <div class="balance-container">
        <div class="amount-container">
          <span class="amount-value">{this.amount}</span>
          <span class="amount-ticker">{this.ticker}</span>
        </div>
        {this.usdValue && <span>{this.usdValue}</span>}
      </div>
    );
  }
}
