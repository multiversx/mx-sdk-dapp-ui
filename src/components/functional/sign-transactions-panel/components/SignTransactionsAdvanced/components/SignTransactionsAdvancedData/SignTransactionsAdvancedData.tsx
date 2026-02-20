import { Fragment, h } from '@stencil/core';
import classNames from 'classnames';
import { Tooltip } from 'common/Tooltip/Tooltip';
import { DecodeMethodEnum } from 'components/functional/sign-transactions-panel/sign-transactions-panel.types';
import state from 'components/functional/sign-transactions-panel/signTransactionsPanelStore';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import { SignTransactionsAdvancedDataDecode } from './components/SignTransactionsAdvancedDataDecode/SignTransactionsAdvancedDataDecode';
import { getProcessedHighlightedData } from './helpers/getProcessedHighlightedData';
import styles from './signTransactionsAdvancedData.styles';

export interface IDataHightlight {
  beforeHighlight?: string;
  highlight: string;
  afterHighlight?: string;
}

interface SignTransactionsAdvancedDataPropsType {
  decodeMethod?: DecodeMethodEnum;
  onDecodeMethodChange?: (method: DecodeMethodEnum) => void;
  decodeTooltipVisible?: boolean;
  onDecodeTooltipVisibilityChange?: (isVisible: boolean) => void;
}

export function SignTransactionsAdvancedData({
  decodeMethod = DecodeMethodEnum.raw,
  onDecodeMethodChange,
  decodeTooltipVisible,
  onDecodeTooltipVisibilityChange,
}: SignTransactionsAdvancedDataPropsType) {
  const { data, highlight } = state.commonData;
  let highlightElement: HTMLElement;

  const setDecodeMethod = (method: DecodeMethodEnum) => {
    if (onDecodeMethodChange) {
      onDecodeMethodChange(method);
    }
  };

  const getComputedDisplayData = (): IDataHightlight => {
    if (decodeMethod === DecodeMethodEnum.raw) {
      return !highlight || !data?.includes(highlight)
        ? { highlight: data || '' }
        : getProcessedHighlightedData({ data, highlightedData: highlight });
    }

    const { displayValue = '', highlight: decodedHighlight = '' } = state.commonData.decodedData
      ? (state.commonData.decodedData[decodeMethod] ?? {})
      : {};

    return !decodedHighlight || !displayValue.includes(decodedHighlight)
      ? { highlight: displayValue }
      : getProcessedHighlightedData({ data: displayValue, highlightedData: decodedHighlight });
  };

  const computedDisplayData = getComputedDisplayData();
  const { beforeHighlight, afterHighlight, highlight: highlightText } = computedDisplayData;

  if ((beforeHighlight || afterHighlight) && highlightElement) {
    const timeoutId = setTimeout(() => {
      highlightElement?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    });

    clearTimeout(timeoutId);
  }

  return (
    <div class={styles.signTransactionsAdvancedData} data-testid={DataTestIdsEnum.signTransactionsAdvancedData}>
      <div class={styles.signTransactionsAdvancedDataTop}>
        <div class={styles.signTransactionsAdvancedDataLabel}>Data</div>

        <Tooltip
          onVisibilityChange={(isVisible: boolean) => {
            if (onDecodeTooltipVisibilityChange) {
              onDecodeTooltipVisibilityChange(isVisible);
            }
          }}
          isTooltipVisible={decodeTooltipVisible}
          trigger={
            <SignTransactionsAdvancedDataDecode isToggled={decodeTooltipVisible} currentDecodeMethod={decodeMethod} />
          }
        >
          <div
            class={styles.signTransactionsAdvancedDataDecodeOptions}
            data-testid={DataTestIdsEnum.signTransactionsAdvancedDataDecodeOptions}
            onClick={(event: MouseEvent) => event.stopPropagation()}
          >
            {Object.values(DecodeMethodEnum).map((method: DecodeMethodEnum) => (
              <div
                onClick={() => setDecodeMethod(method)}
                data-testid={DataTestIdsEnum.signTransactionsAdvancedDataDecodeOption}
                class={{
                  [styles.signTransactionsAdvancedDataDecodeOption]: true,
                  [styles.signTransactionsAdvancedDataDecodeOptionActive]: method === decodeMethod,
                }}
              >
                {method}
              </div>
            ))}
          </div>
        </Tooltip>
      </div>

      <div class={styles.signTransactionsAdvancedDataBottom}>
        <div class={styles.signTransactionsAdvancedDataWrapper} part="sign-transactions-advanced-data-wrapper">
          {beforeHighlight || afterHighlight ? (
            <Fragment>
              {beforeHighlight && (
                <div
                  class={styles.signTransactionsAdvancedDataText}
                  data-testid={DataTestIdsEnum.signTransactionsAdvancedDataText}
                >
                  {beforeHighlight}
                </div>
              )}

              <div
                class={classNames(
                  styles.signTransactionsAdvancedDataHighlight,
                  styles.signTransactionsAdvancedDataHighlightBolded,
                )}
                data-testid={DataTestIdsEnum.signTransactionsAdvancedDataHighlight}
                part="sign-transactions-advanced-data-highlight"
                ref={el => (highlightElement = el)}
              >
                {highlightText}
              </div>

              {afterHighlight && (
                <div
                  class={styles.signTransactionsAdvancedDataText}
                  data-testid={DataTestIdsEnum.signTransactionsAdvancedDataText}
                >
                  {afterHighlight}
                </div>
              )}
            </Fragment>
          ) : (
            <div
              class={styles.signTransactionsAdvancedDataHighlight}
              data-testid={DataTestIdsEnum.signTransactionsAdvancedDataHighlight}
              part="sign-transactions-advanced-data-highlight"
            >
              {highlightText}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
