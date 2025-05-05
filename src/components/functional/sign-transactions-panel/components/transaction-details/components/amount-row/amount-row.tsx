import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'mvx-amount-row',
  styleUrl: 'amount-row.css',
})
export class AmountRow {
  @Prop() amount?: string;
  @Prop() identifier?: string;
  @Prop() usdValue?: string;

  render() {
    const amountValue = this.usdValue ?? `${this.amount} ${this.identifier}`;

    return (
      <div class="info-row">
        <div class="info-label">Amount</div>
        <div class="info-value">{amountValue}</div>
      </div>
    );
  }
}
