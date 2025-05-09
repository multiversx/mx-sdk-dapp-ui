import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'mvx-sign-transactions-overview',
  styleUrl: 'sign-transactions-overview.css',
})
export class SignTransactionsOverview {
  @Prop() identifier: string;
  @Prop() usdValue: string;

  render() {
    return (
      <div class="transaction-details">
        <div class="transaction-info">
          <div class="send-section">
            <div class="address-row">
              <span class="send">Send</span>
              <div class="token-info">
                <div class="amount-container">
                  <div class="amount-display">
                    <div class="currency-amount">
                      <div class="numbers">
                        <span class="comma">1</span>
                        <span class="point-fifty">.12</span>
                      </div>
                      <span class="token-identifier">{this.identifier}</span>
                    </div>
                    <span class="dollar-amount">{this.usdValue}</span>
                  </div>
                </div>
                <div class="token-icon">
                  <div class="token-logo">
                    <div class="egld-token-logo"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="receiver-section">
            <div class="address-row">
              <span class="to">To</span>
              <div class="receiver-info">
                <div class="receiver-logo-container">
                  <div class="receiver-logo">
                    <div class="receiver-image"></div>
                  </div>
                </div>
                <div class="receiver-details">
                  <div class="receiver-name-container">
                    <span class="receiver-name">Staking Agency</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="fee-section">
          <div class="fee-row">
            <div class="fee-label-container">
              <span class="network-fee">Network Fee</span>
            </div>
            <div class="fee-amount-container">
              <span class="currency-amount">~$0.00078</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
