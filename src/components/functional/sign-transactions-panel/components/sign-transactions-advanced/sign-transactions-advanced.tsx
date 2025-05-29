import { Component, h, Prop, State } from '@stencil/core';

import { DecodeMethodEnum } from '../../sign-transactions-panel.types';

@Component({
  tag: 'mvx-sign-transactions-advanced',
  styleUrl: 'sign-transactions-advanced.scss',
  shadow: true,
})
export class SignTransactionsAdvanced {
  @Prop() data: string;
  @Prop() highlight?: string;

  @State() activeSpeed: string = 'Standard';
  @State() decodeMethod: DecodeMethodEnum = DecodeMethodEnum.raw;

  setActiveSpeed(speed: string) {
    this.activeSpeed = speed;
  }

  setDecodeMethod(method: DecodeMethodEnum) {
    this.decodeMethod = method;
  }

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
              <button
                class={`speed-option ${this.activeSpeed === 'Standard' ? 'active' : ''}`}
                onClick={() => this.setActiveSpeed('Standard')}
              >
                <span class="speed-text">Standard</span>
              </button>
              <button
                class={`speed-option ${this.activeSpeed === 'Fast' ? 'active' : ''}`}
                onClick={() => this.setActiveSpeed('Fast')}
              >
                <span class="speed-text">Fast</span>
              </button>
              <button
                class={`speed-option ${this.activeSpeed === 'Faster' ? 'active' : ''}`}
                onClick={() => this.setActiveSpeed('Faster')}
              >
                <span class="speed-text">Faster</span>
              </button>
            </div>
            <div class="gas-limit-row">
              <span class="gas-limit">Gas Limit</span>
              <span class="gas-limit-value">6,000,000</span>
            </div>
          </div>
        </div>

        <mvx-sign-transactions-advanced-data highlight={this.highlight} data={this.data} />
      </div>
    );
  }
}
