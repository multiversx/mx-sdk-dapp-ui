import { h } from '@stencil/core';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import state from '../../signTransactionsPanelStore';

import styles from './signTransactionsAdvanced.styles';
import { SignTransactionsAdvancedData } from './components/SignTransactionsAdvancedData/SignTransactionsAdvancedData';
import { DecodeMethodEnum } from '../../sign-transactions-panel.types';

interface SignTransactionsAdvancedPropsType {
  data: string;
  highlight?: string;
  needsSigning?: boolean;
  gasPriceOptions?: Array<{ label: string; value: number }>;
  gasLimit?: string;
  gasPrice?: string;
  egldLabel?: string;
  gasPriceOption?: number;
  decodeMethod?: DecodeMethodEnum;
  onDecodeMethodChange?: (method: DecodeMethodEnum) => void;
  decodeTooltipVisible?: boolean;
  onDecodeTooltipVisibilityChange?: (isVisible: boolean) => void;
}

export function SignTransactionsAdvanced(props: SignTransactionsAdvancedPropsType) {
  const { data, highlight, needsSigning, gasPriceOptions, gasLimit, gasPrice, egldLabel, gasPriceOption, decodeMethod, onDecodeMethodChange, decodeTooltipVisible, onDecodeTooltipVisibilityChange } = props;

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
          <div class={styles.signTransactionsGasSpeedSelector} data-testid={DataTestIdsEnum.signTransactionsAdvancedGasSpeedSelector}>
            {gasPriceOptions.map(({ label, value }) => (
              <button
                key={label}
                disabled={!needsSigning}
                class={`
                    ${styles.signTransactionsSpeedOption}
                    ${gasPriceOption.toString() === value.toString()
                    ? styles.signTransactionsSpeedOptionActive
                    : ''
                  }
                    `}
                data-testid={DataTestIdsEnum.signTransactionsAdvancedSpeedOption}
                onClick={() => state.setGasPriceOption(value)}
              >
                <span
                  class={`
                      ${styles.signTransactionsSpeedText}
                      ${gasPriceOption.toString() === value.toString()
                      ? styles.signTransactionsSpeedOptionActiveSpeedText
                      : ''
                    }
                    `}
                >
                  {label}
                </span>
              </button>
            ))}
          </div>
          <div class={styles.signTransactionsGasLimitRow} data-testid={DataTestIdsEnum.signTransactionsAdvancedGasLimit}>
            <span class={styles.signTransactionsGasLimit}>Gas Limit</span>
            <span class={styles.signTransactionsGasLimitValue}>{gasLimit}</span>
          </div>
        </div>
      </div>

      <SignTransactionsAdvancedData highlight={highlight} data={data} decodeMethod={decodeMethod} onDecodeMethodChange={onDecodeMethodChange} decodeTooltipVisible={decodeTooltipVisible} onDecodeTooltipVisibilityChange={onDecodeTooltipVisibilityChange} />
    </div>
  );
}

