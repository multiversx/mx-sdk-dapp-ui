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

  @State() decodeMethod: DecodeMethodEnum = DecodeMethodEnum.raw;

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

  get activeSpeed() {
    const {
      commonData: { ppu, ppuOptions },
    } = state;

    if (ppuOptions.length === 0) {
      return ppu;
    }

    const currentOption = ppuOptions.find(option => option.value === ppu);
    return currentOption.value;
  }

  render() {
    const { beforeText, afterText, text } = this.computedDisplayData;
    const {
      commonData: { needsSigning, ppuOptions, gasLimit, gasPrice },
    } = state;

    return (
      <div class="advanced-details">
        <div class="gas-settings">
          <div class="gas-wrapper">
            <div class="gas-header">
              <span class="gas-price">Gas Price</span>
              <span class="gas-price-value">{gasPrice} EGLD</span>
            </div>
            <div class="gas-speed-selector">
              {ppuOptions.map(ppuOption => (
                <button
                  key={ppuOption.label}
                  disabled={!needsSigning}
                  class={`speed-option ${this.activeSpeed === ppuOption.value ? 'active' : ''}`}
                  onClick={() => state.onSetPpu(ppuOption.value)}
                >
                  <span class="speed-text">{ppuOption.label}</span>
                </button>
              ))}
            </div>
            <div class="gas-limit-row">
              <span class="gas-limit">Gas Limit</span>
              <span class="gas-limit-value">{gasLimit}</span>
            </div>
          </div>
        </div>

        <div class="data-section">
          <select
            class="data-decode-method-select"
            onInput={(e: Event) => this.setDecodeMethod((e.target as HTMLSelectElement).value as DecodeMethodEnum)}
          >
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
