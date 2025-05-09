import { Component, h } from '@stencil/core';

@Component({
  tag: 'mvx-sign-transactions-advanced',
  styleUrl: 'sign-transactions-advanced.css',
})
export class SignTransactionsAdvanced {
  render() {
    return (
      <div class="advanced-details">
        <div class="advanced-content">
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
            <div class="data-container">
              <div class="data-header">
                <div class="data-title">
                  <span class="data-label">Data</span>
                  <div class="data-content">
                    <div class="data-box">
                      <div class="data-text-container">
                        <span class="data-text">
                          joinGame@0000000c5745474c442d6264346437390000000c4c45474c442d64373464613900000008299d5f7b060e76ff0000000000000000050000b4c094947e427d79931a8bad81316b797d238cdb3f00000019737761704d756c7469546f6b656e734669786564496e707574000000040000000101000000000000000c5745474c442d6264346437390000000c4c45474c442d6437346461390000000c4c45474c442d6437346461390000000a4f4e452d663939353466000000000000000000000000050000b4c094947e427d79931a8bad81316b797d238cdb3f00000019737761704d756c7469546f6b656e734669786564496e707574000000040000000101000000000000000c4c45474c442d6437346461390000000a4f4e452d6639393534660000000c5745474c442d6264346437390000000a4f4e452d6639393534660000000820a1a52c864889010000000000000000050000b4c094947e427d79931a8bad81316b797d238cdb3f00000019737761704d756c7469546f6b656e734669786564496e707574000000040000000101000000000000000c5745474c442d6264346437390000000a4f4e452d663939353466@0000000c5745474c442d626434643739000000000000000c4c45474c442d643734646139000000000000000a4f4e452d6639393534660000000935c0dc293353bb273b
                        </span>
                        <div class="data-cursor"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
