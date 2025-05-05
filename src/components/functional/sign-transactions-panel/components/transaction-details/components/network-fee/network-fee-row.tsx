import { Component, Event, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'mvx-network-fee-row',
  styleUrl: 'network-fee-row.css',
})
export class NetworkFeeRow {
  @Prop() feeLimit?: string;
  @Prop() gasPrice?: string;
  @Prop() gasLimit?: string;
  @Prop() ppu?: string | number;
  @Prop() ppuOptions?: Array<{ value: string | number; label: string }>;
  @Prop() isEditable?: boolean;
  @Prop() feeInFiatLimit?: string;

  @Event() setPpu?: (value: string | number) => void;

  @State() isExpanded = false;

  toggleExpanded = () => {
    this.isExpanded = !this.isExpanded;
  };

  private handlePpuChange = (value: string | number) => () => {
    if (this.setPpu) {
      this.setPpu(value);
    }
  };

  renderNetworkFeeDetails() {
    return (
      <div class="network-fee-details">
        <div class="fee-details-container">
          <div class="fee-details-section">
            <div class="fee-details-row">
              <div class="fee-details-label">Gas Price</div>
              <div class="fee-details-value">{this.gasPrice}</div>
            </div>

            {this.ppuOptions && this.ppuOptions.length > 0 && (
              <div class="fee-radio-group">
                {this.ppuOptions.map(option => (
                  <div class="fee-radio-option">
                    <input
                      disabled={!this.isEditable}
                      type="radio"
                      id={`ppu${option.value}`}
                      name="ppu"
                      value={String(option.value)}
                      checked={String(this.ppu) === String(option.value)}
                      onChange={this.handlePpuChange(option.value)}
                    />
                    <label htmlFor={`ppu${option.value}`}>{option.label}</label>
                  </div>
                ))}
              </div>
            )}

            <div class="fee-details-row">
              <div class="fee-details-label">Gas Limit</div>
              <div class="fee-details-value">{this.gasLimit}</div>
            </div>
          </div>

          <div class="fee-fiat">
            <span>≈{this.feeInFiatLimit}</span>
          </div>
        </div>
      </div>
    );
  }

  renderInfoIcon() {
    return (
      <div class="info-icon">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="8" cy="8" r="7.5" stroke="#6c757d" />
          <text x="8" y="11" text-anchor="middle" font-size="10" fill="#6c757d">
            i
          </text>
        </svg>
      </div>
    );
  }

  render() {
    const feeValue = this.feeInFiatLimit || '—';

    return (
      <div class="network-fee-container">
        <div class="network-fee-row">
          <div class="network-fee-label">
            Network Fee
            {this.renderInfoIcon()}
          </div>
          <div class="network-fee-value">
            <span class="fee-amount">~{feeValue}</span>
            <div class={`expand-icon ${this.isExpanded ? 'expanded' : ''}`} onClick={this.toggleExpanded}>
              {this.isExpanded ? '▼' : '▶'}
            </div>
          </div>
        </div>
        {this.isExpanded && this.renderNetworkFeeDetails()}
      </div>
    );
  }
}
