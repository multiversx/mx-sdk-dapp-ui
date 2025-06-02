import { Component, Fragment, h, Prop, State } from '@stencil/core';
import { DecodeMethodEnum } from 'components/functional/sign-transactions-panel/sign-transactions-panel.types';
import state from 'components/functional/sign-transactions-panel/signTransactionsPanelStore';

import { getProcessedHighlightedData } from './helpers/getProcessedHighlightedData';

export interface IDataHightlight {
  beforeHighlight?: string;
  highlight: string;
  afterHighlight?: string;
}

@Component({
  tag: 'mvx-sign-transactions-advanced-data',
  styleUrl: 'sign-transactions-advanced-data.scss',
  shadow: true,
})
export class SignTransactionsAdvancedData {
  private highlightElement: HTMLElement;

  @State() decodeMethod: DecodeMethodEnum = DecodeMethodEnum.raw;
  @State() isDecodeTooltipOpen: boolean = false;

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

  componentDidRender() {
    const { beforeHighlight, afterHighlight } = this.computedDisplayData;

    if ((beforeHighlight || afterHighlight) && this.highlightElement) {
      this.highlightElement.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    }
  }

  render() {
    const { beforeHighlight, afterHighlight, highlight } = this.computedDisplayData;

    return (
      <div class="sign-transactions-advanced-data">
        <div class="sign-transactions-advanced-data-top">
          <div class="sign-transactions-advanced-data-label">Data</div>

          <mvx-tooltip
            onTriggerRender={(event: CustomEvent) => {
              this.isDecodeTooltipOpen = event.detail;
            }}
            trigger={
              <mvx-sign-transactions-advanced-data-decode
                isToggled={this.isDecodeTooltipOpen}
                currentDecodeMethod={this.decodeMethod}
              />
            }
          >
            <div
              class="sign-transactions-advanced-data-decode-options"
              onClick={(event: MouseEvent) => event.stopPropagation()}
            >
              {Object.values(DecodeMethodEnum).map((decodeMethod: DecodeMethodEnum) => (
                <div
                  onClick={() => this.setDecodeMethod(decodeMethod)}
                  class={{
                    'sign-transactions-advanced-data-decode-option': true,
                    'active': decodeMethod === this.decodeMethod,
                  }}
                >
                  {decodeMethod}
                </div>
              ))}
            </div>
          </mvx-tooltip>
        </div>

        <div class="sign-transactions-advanced-data-bottom">
          <div class="sign-transactions-advanced-data-wrapper">
            {beforeHighlight || afterHighlight ? (
              <Fragment>
                {beforeHighlight && <div class="sign-transactions-advanced-data-text">{beforeHighlight}</div>}

                <div class="sign-transactions-advanced-data-highlight bolded" ref={el => (this.highlightElement = el)}>
                  {highlight}
                </div>

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
