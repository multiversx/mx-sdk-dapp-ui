import { Component, h, State } from '@stencil/core';

import state from '../../../../signTransactionsModalStore';

@Component({
  tag: 'transaction-fee-component',
  styleUrl: 'transaction-fee-component.css',
  shadow: true,
})
export class TransactionFeeComponent {
  @State() showGasOptions: boolean = false;
  @State() selectedMultiplier: number = 1;

  private toggleGasOptions = () => {
    this.showGasOptions = !this.showGasOptions;
  };

  private handleMultiplierChange = (value: number) => {
    this.selectedMultiplier = value;
    console.log('selectedMultiplier', this.selectedMultiplier);
  };

  render() {
    const { egldLabel, feeInFiatLimit, feeLimit, gasLimit, gasPrice } = state.commonData;

    return (
      <div class="transaction-fee-container">
        <div class="fee-header">
          <p>Transaction fee</p>
          <button onClick={this.toggleGasOptions} class="edit-button">
            Edit
          </button>
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
                  <input type="radio" id="multiplier1" name="gasMultiplier" value="1" checked={this.selectedMultiplier === 1} onChange={() => this.handleMultiplierChange(1)} />
                  <label htmlFor="multiplier1">x1</label>
                </div>

                <div class="radio-option">
                  <input type="radio" id="multiplier2" name="gasMultiplier" value="2" checked={this.selectedMultiplier === 2} onChange={() => this.handleMultiplierChange(2)} />
                  <label htmlFor="multiplier2">x2</label>
                </div>

                <div class="radio-option">
                  <input type="radio" id="multiplier3" name="gasMultiplier" value="3" checked={this.selectedMultiplier === 3} onChange={() => this.handleMultiplierChange(3)} />
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
