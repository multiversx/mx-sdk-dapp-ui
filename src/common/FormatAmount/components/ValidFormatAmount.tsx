import { h } from '@stencil/core';
import classNames from 'classnames';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

// prettier-ignore
const styles = {
    formatAmount: 'format-amount mvx:items-center',
    intAmount: 'int-amount mvx:text-inherit',
    decimals: 'decimals mvx:text-inherit',
    symbol: 'symbol mvx:text-inherit mvx:ml-1'
} satisfies Record<string, string>;

interface ValidFormatAmountPropsType {
  class?: string;
  'data-testid'?: string;
  label?: string;
  labelClass?: string;
  showLabel?: boolean;
  valueDecimal: string;
  valueInteger: string;
  decimalClass?: string;
}

export function ValidFormatAmount({
  'data-testid': dataTestId,
  class: className,
  valueInteger,
  valueDecimal,
  decimalClass,
  showLabel,
  label,
  labelClass,
}: ValidFormatAmountPropsType) {
  return (
    <span data-testid={dataTestId} class={classNames(className, styles.formatAmount)}>
      <span class={styles.intAmount} data-testid={DataTestIdsEnum.formatAmountInt}>
        {valueInteger}
      </span>
      {valueDecimal && (
        <span
          class={{ [styles.decimals]: true, [decimalClass]: Boolean(decimalClass) }}
          data-testid={DataTestIdsEnum.formatAmountDecimals}
        >
          {valueDecimal}
        </span>
      )}
      {showLabel && label && (
        <span
          class={{
            [styles.symbol]: true,
            [labelClass]: Boolean(labelClass),
          }}
          data-testid={DataTestIdsEnum.formatAmountSymbol}
        >
          {label}
        </span>
      )}
    </span>
  );
}
