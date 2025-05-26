import { Component, Fragment, h, Prop, State } from '@stencil/core';

import { DecodeMethodEnum } from '../../sign-transactions-panel.types';
import state from '../../signTransactionsPanelStore';
import type { DataFieldType } from './sign-transactions-advanced.types';

const DECODE_METHODS = Object.values(DecodeMethodEnum);

@Component({
  tag: 'mvx-sign-transactions-advanced',
  styleUrl: 'sign-transactions-advanced.css',
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

  getHighlight(data: string, highlight: string): DataFieldType {
    const highlightIndex = data.indexOf(highlight);
    const beforeText = data.slice(0, highlightIndex);
    const text = data.slice(highlightIndex, highlightIndex + highlight.length);
    const afterText = data.slice(highlightIndex + highlight.length);

    return { beforeText, text, afterText };
  }

  get computedDisplayData(): DataFieldType {
    if (this.decodeMethod !== DecodeMethodEnum.raw) {
      const {
        commonData: { decodedData },
      } = state;

      const { displayValue, highlight } = decodedData?.[this.decodeMethod] ?? {};

      if (!highlight || !displayValue.includes(highlight)) {
        return { text: displayValue };
      }

      return this.getHighlight(displayValue, highlight);
    }

    if (!this.highlight || !this.data.includes(this.highlight)) {
      return { text: this.data };
    }

    return this.getHighlight(this.data, this.highlight);
  }

  render() {
    const { beforeText, afterText, text } = this.computedDisplayData;

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
          <select class="data-decode-method-select" onInput={(e: Event) => this.setDecodeMethod((e.target as HTMLSelectElement).value as DecodeMethodEnum)}>
            {DECODE_METHODS.map(method => (
              <option value={method} selected={this.decodeMethod === method}>
                {method.toUpperCase()}
              </option>
            ))}
          </select>
          <div class="data-field">
            <div class="data-label">Data</div>
            <div class="data-content">
              <span class="data-text">
                {beforeText || afterText ? (
                  <Fragment>
                    {beforeText && <span>{beforeText}</span>}
                    <span class="data-highlight">{text}</span>
                    {afterText && <span>{afterText}</span>}
                  </Fragment>
                ) : (
                  text
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
