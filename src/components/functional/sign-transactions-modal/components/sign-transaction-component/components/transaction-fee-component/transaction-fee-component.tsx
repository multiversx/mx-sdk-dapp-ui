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

  private handlePpuChange = (value: ISignTransactionsModalCommonData['ppu']) => () => {
    state.onSetPpu(value);
  };

  render() {
    const { egldLabel, feeInFiatLimit, feeLimit, gasLimit, gasPrice, ppu, isEditable, ppuOptions } = state.commonData;

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

              {ppuOptions && ppuOptions.length > 0 && (
                <div class="radio-group">
                  {ppuOptions.map(option => (
                    <div class="radio-option">
                      <input
                        disabled={!isEditable}
                        type="radio"
                        id={`ppu${option.value}`}
                        name="ppu"
                        value={option.value}
                        checked={ppu === option.value}
                        onChange={this.handlePpuChange(option.value)}
                      />
                      <label htmlFor={`ppu${option.value}`}>{option.label}</label>
                    </div>
                  ))}
                </div>
              )}
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
