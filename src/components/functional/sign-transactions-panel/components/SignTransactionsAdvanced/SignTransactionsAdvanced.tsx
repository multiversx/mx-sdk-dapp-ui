import { h } from '@stencil/core';
import classNames from 'classnames';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import type { DecodeMethodEnum } from '../../sign-transactions-panel.types';
import state from '../../signTransactionsPanelStore';
import { SignTransactionsAdvancedData } from './components/SignTransactionsAdvancedData/SignTransactionsAdvancedData';
import styles from './signTransactionsAdvanced.styles';

interface SignTransactionsAdvancedPropsType {
  decodeMethod?: DecodeMethodEnum;
  onDecodeMethodChange?: (method: DecodeMethodEnum) => void;
  decodeTooltipVisible?: boolean;
  onDecodeTooltipVisibilityChange?: (isVisible: boolean) => void;
}

export function SignTransactionsAdvanced(props: SignTransactionsAdvancedPropsType) {
  const { decodeMethod, onDecodeMethodChange, decodeTooltipVisible, onDecodeTooltipVisibilityChange } = props;
  const { needsSigning, gasPriceOptions, gasLimit, gasPrice, egldLabel, gasPriceOption } = state.commonData;

  return (
    <div class={styles.signTransactionsAdvancedDetails} data-testid={DataTestIdsEnum.signTransactionsAdvanced}>
      <div class={styles.signTransactionsGasSettings} data-testid={DataTestIdsEnum.signTransactionsAdvancedGasSettings}>
        <div class={styles.signTransactionsGasWrapper}>
          <div class={styles.signTransactionsGasHeader} data-testid={DataTestIdsEnum.signTransactionsAdvancedGasPrice}>
            <span class={styles.signTransactionsGasPrice}>Gas Price</span>
            <span class={styles.signTransactionsGasPriceValue}>
              {gasPrice} {egldLabel}
            </span>
          </div>
          <div
            class={styles.signTransactionsGasSpeedSelector}
            data-testid={DataTestIdsEnum.signTransactionsAdvancedGasSpeedSelector}
          >
            {gasPriceOptions?.map(({ label, value }) => {
              const isActive = gasPriceOption?.toString() === value.toString();

              return (
                <button
                  key={label}
                  disabled={!needsSigning}
                  class={classNames(styles.signTransactionsSpeedOption, {
                    [styles.signTransactionsSpeedOptionActive]: isActive,
                  })}
                  data-testid={DataTestIdsEnum.signTransactionsAdvancedSpeedOption}
                  onClick={() => state.setGasPriceOption(value)}
                >
                  <span
                    class={classNames(styles.signTransactionsSpeedText, {
                      [styles.signTransactionsSpeedOptionActiveSpeedText]: isActive,
                    })}
                  >
                    {label}
                  </span>
                </button>
              );
            })}
          </div>
          <div
            class={styles.signTransactionsGasLimitRow}
            data-testid={DataTestIdsEnum.signTransactionsAdvancedGasLimit}
          >
            <span class={styles.signTransactionsGasLimit}>Gas Limit</span>
            <span class={styles.signTransactionsGasLimitValue}>{gasLimit}</span>
          </div>
        </div>
      </div>

      <SignTransactionsAdvancedData
        decodeMethod={decodeMethod}
        onDecodeMethodChange={onDecodeMethodChange}
        decodeTooltipVisible={decodeTooltipVisible}
        onDecodeTooltipVisibilityChange={onDecodeTooltipVisibilityChange}
      />
    </div>
  );
}
