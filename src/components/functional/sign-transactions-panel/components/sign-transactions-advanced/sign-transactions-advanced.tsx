import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'mvx-sign-transactions-advanced',
  styleUrl: 'sign-transactions-advanced.css',
})
export class SignTransactionsAdvanced {
  @Prop() data: string;

  render() {
    return (
      <div class="advanced-details">
        <div class="gas-settings">
          <div class="gas-wrapper">
            <div class="gas-header">
              <span class="gas-price">Gas Price</span>
              <span class="gas-price-value">0.000000003 EGLD</span>
            </div>
            <div class="gas-speed-selector">
              <div class="speed-option active">
                <span class="speed-text">Standard</span>
              </div>
              <div class="speed-option">
                <span class="speed-text">Fast</span>
              </div>
              <div class="speed-option">
                <span class="speed-text">Faster</span>
              </div>
            </div>
            <div class="gas-limit-row">
              <span class="gas-limit">Gas Limit</span>
              <span class="gas-limit-value">6,000,000</span>
            </div>
          </div>
        </div>

        <div class="data-section">
          <div class="data-label">Data</div>
          <div class="data-content">
            <span class="data-text">{this.data}</span>
          </div>
        </div>
      </div>
    );
  }
}
