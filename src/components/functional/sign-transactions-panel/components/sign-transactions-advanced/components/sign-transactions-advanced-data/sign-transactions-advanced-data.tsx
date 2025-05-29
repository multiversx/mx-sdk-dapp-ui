import { Component, Fragment, h, Prop, State } from '@stencil/core';
import { DecodeMethodEnum } from 'components/functional/sign-transactions-panel/sign-transactions-panel.types';
import state from 'components/functional/sign-transactions-panel/signTransactionsPanelStore';

import { getProcessedHighlightedData } from './helpers/getProcessedHighlightedData';

export interface IDataHightlight {
  beforeHighlight?: string;
  highlight: string;
  afterHighlight?: string;
}

const signTransactionsAdvancedDataClasses: Record<string, string> = {
  tooltipTrigger: 'mvx:text-white mvx:capitalize',
};

@Component({
  tag: 'mvx-sign-transactions-advanced-data',
  styleUrl: 'sign-transactions-advanced-data.scss',
  shadow: true,
})
export class SignTransactionsAdvancedData {
  @State() decodeMethod: DecodeMethodEnum = DecodeMethodEnum.raw;

  @Prop() highlight?: string;
  @Prop() data: string;

  setDecodeMethod(method: DecodeMethodEnum) {
    this.decodeMethod = method;
  }

  get computedDisplayData(): IDataHightlight {
    if (this.decodeMethod === DecodeMethodEnum.raw) {
      return !this.highlight || !this.data.includes(this.highlight)
        ? { highlight: this.data }
        : getProcessedHighlightedData({ data: this.data, highlightedData: this.highlight });
    }

    const { displayValue = '', highlight = '' } = state.commonData.decodedData
      ? state.commonData.decodedData[this.decodeMethod] ?? {}
      : {};

    return !highlight || !displayValue.includes(highlight)
      ? { highlight: displayValue }
      : getProcessedHighlightedData({ data: displayValue, highlightedData: highlight });
  }

  render() {
    const { beforeHighlight, afterHighlight, highlight } = this.computedDisplayData;

    return (
      <div class="sign-transactions-advanced-data">
        <div class="sign-transactions-advanced-data-left">
          <div class="sign-transactions-advanced-data-label">Data</div>

          <mvx-tooltip
            trigger={
              <div
                class={{
                  'sign-transactions-advanced-data-tooltip-trigger': true,
                  [signTransactionsAdvancedDataClasses.tooltipTrigger]: true,
                }}
              >
                Decimal
              </div>
            }
          >
            <div class={{ 'sign-transactions-advanced-data-tooltip': true }}>
              {Object.values(DecodeMethodEnum).map(decodeMethod => (
                <div class={{ 'sign-transactions-advanced-data-tooltip-option': true }}>{decodeMethod}</div>
              ))}
            </div>
          </mvx-tooltip>
        </div>

        <div class="sign-transactions-advanced-data-right">
          <div class="sign-transactions-advanced-data-wrapper">
            {beforeHighlight || afterHighlight ? (
              <Fragment>
                {beforeHighlight && <div class="sign-transactions-advanced-data-text">{beforeHighlight}</div>}
                <div class="sign-transactions-advanced-data-highlight">{highlight}</div>
                {afterHighlight && <div class="sign-transactions-advanced-data-text">{afterHighlight}</div>}
              </Fragment>
            ) : (
              <div class="sign-transactions-advanced-data-highlight">{highlight}</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
