import { Component, h, Prop, State } from '@stencil/core';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import { DecodeMethodEnum } from '../../sign-transactions-panel.types';
import state from '../../signTransactionsPanelStore';

@Component({
  tag: 'mvx-sign-transactions-advanced',
  styleUrl: 'sign-transactions-advanced.scss',
  shadow: true,
})
export class SignTransactionsAdvanced {
  @Prop() data: string;
  @Prop() highlight?: string;

  @State() decodeMethod: DecodeMethodEnum = DecodeMethodEnum.raw;

  setDecodeMethod(method: DecodeMethodEnum) {
    this.decodeMethod = method;
  }

  render() {
    const {
      commonData: { needsSigning, gasPriceOptions, gasLimit, gasPrice, egldLabel, gasPriceOption },
    } = state;

    return (
      <div class="advanced-details" data-testid={DataTestIdsEnum.signTransactionsAdvanced}>
        <div class="gas-settings" data-testid={DataTestIdsEnum.signTransactionsAdvancedGasSettings}>
          <div class="gas-wrapper">
            <div class="gas-header" data-testid={DataTestIdsEnum.signTransactionsAdvancedGasPrice}>
              <span class="gas-price">Gas Price</span>
              <span class="gas-price-value">
                {gasPrice} {egldLabel}
              </span>
            </div>
            <div class="gas-speed-selector" data-testid={DataTestIdsEnum.signTransactionsAdvancedGasSpeedSelector}>
              {gasPriceOptions.map(({ label, value }) => (
                <button
                  key={label}
                  disabled={!needsSigning}
                  class={`speed-option ${gasPriceOption.toString() === value.toString() ? 'active' : ''}`}
                  data-testid={DataTestIdsEnum.signTransactionsAdvancedSpeedOption}
                  onClick={() => state.setGasPriceOption(value)}
                >
                  <span class="speed-text">{label}</span>
                </button>
              ))}
            </div>
            <div class="gas-limit-row" data-testid={DataTestIdsEnum.signTransactionsAdvancedGasLimit}>
              <span class="gas-limit">Gas Limit</span>
              <span class="gas-limit-value">{gasLimit}</span>
            </div>
          </div>
        </div>

        <mvx-sign-transactions-advanced-data highlight={this.highlight} data={this.data} />
      </div>
    );
  }
}
