import { Component, h, State } from '@stencil/core';

import type { ISignTransactionsModalCommonData } from '../../../../sign-transactions-modal.types';
import state from '../../../../signTransactionsModalStore';

@Component({
  tag: 'transaction-fee-component',
  styleUrl: 'transaction-fee-component.css',
  shadow: true,
})
export class TransactionFeeComponent {
  @State() showGasOptions = false;

  private toggleGasOptions = () => {
    this.showGasOptions = !this.showGasOptions;
  };

  private handleMultiplierChange = (value: ISignTransactionsModalCommonData['gasPriceMultiplier']) => () => {
    state.onSetGasPriceMultiplier(value);
  };

  render() {
    const { egldLabel, feeInFiatLimit, feeLimit, gasLimit, gasPrice, gasPriceMultiplier, isEditable } = state.commonData;

    return (
      <div class="transaction-fee-container">
        <div class="fee-header">
          <p>Transaction fee</p>
          {isEditable && (
            <button onClick={this.toggleGasOptions} class="edit-button">
              Edit
            </button>
          )}
        </div>
        {feeLimit && (
          <p>
            <span>{feeLimit}</span>&nbsp;
            <span>{egldLabel}</span>
          </p>
        )}
        <p>≈{feeInFiatLimit}</p>

        {this.showGasOptions && (
          <div class="gas-options">
            <div class="top-section">
              <div class="gas-price-section">
                <div class="label">Gas Price</div>
                <div class="value">{gasPrice}</div>
              </div>

              <div class="radio-group">
                <div class="radio-option">
                  <input
                    disabled={!isEditable}
                    type="radio"
                    id="multiplier1"
                    name="gasMultiplier"
                    value="1"
                    checked={gasPriceMultiplier === 1}
                    onChange={this.handleMultiplierChange(1)}
                  />
                  <label htmlFor="multiplier1">x1</label>
                </div>

                <div class="radio-option">
                  <input
                    disabled={!isEditable}
                    type="radio"
                    id="multiplier2"
                    name="gasMultiplier"
                    value="2"
                    checked={gasPriceMultiplier === 2}
                    onChange={this.handleMultiplierChange(2)}
                  />
                  <label htmlFor="multiplier2">x2</label>
                </div>

                <div class="radio-option">
                  <input
                    disabled={!isEditable}
                    type="radio"
                    id="multiplier3"
                    name="gasMultiplier"
                    value="3"
                    checked={gasPriceMultiplier === 3}
                    onChange={this.handleMultiplierChange(3)}
                  />
                  <label htmlFor="multiplier3">x3</label>
                </div>
              </div>
            </div>

            <div class="gas-limit-section">
              <div class="label">Gas Limit</div>
              <div class="value">{gasLimit}</div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
