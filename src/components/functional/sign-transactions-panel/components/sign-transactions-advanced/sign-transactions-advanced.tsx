import { Component, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'mvx-sign-transactions-advanced',
  styleUrl: 'sign-transactions-advanced.css',
})
export class SignTransactionsAdvanced {
  @Prop() data: string;
  @Prop() highlight?: string;

  @State() activeSpeed: string = 'Standard';

  setActiveSpeed(speed: string) {
    this.activeSpeed = speed;
  }

  getHighlightedData() {
    if (!this.highlight || !this.data.includes(this.highlight)) {
      return this.data;
    }

    const highlightIndex = this.data.indexOf(this.highlight);
    const beforeText = this.data.slice(0, highlightIndex);
    const highlightText = this.data.slice(highlightIndex, highlightIndex + this.highlight.length);
    const afterText = this.data.slice(highlightIndex + this.highlight.length);

    return [h('span', null, beforeText), h('span', { class: { 'data-highlight': true } }, highlightText), h('span', null, afterText)];
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
              <button class={`speed-option ${this.activeSpeed === 'Standard' ? 'active' : ''}`} onClick={() => this.setActiveSpeed('Standard')}>
                <span class="speed-text">Standard</span>
              </button>
              <button class={`speed-option ${this.activeSpeed === 'Fast' ? 'active' : ''}`} onClick={() => this.setActiveSpeed('Fast')}>
                <span class="speed-text">Fast</span>
              </button>
              <button class={`speed-option ${this.activeSpeed === 'Faster' ? 'active' : ''}`} onClick={() => this.setActiveSpeed('Faster')}>
                <span class="speed-text">Faster</span>
              </button>
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
            <span class="data-text">{this.getHighlightedData()}</span>
          </div>
        </div>
      </div>
    );
  }
}
