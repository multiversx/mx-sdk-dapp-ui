import { h } from '@stencil/core';
import classNames from 'classnames';
import { ExplorerLink } from 'common/ExplorerLink/ExplorerLink';
import { FormatAmount } from 'common/FormatAmount/FormatAmount';
import { Icon } from 'common/Icon';
import type { TransactionValueType } from 'components/controlled/transactions-table/transactions-table.type';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import styles from './transactionValue.styles';

interface TransactionValuePropsType {
  class?: string;
  value: TransactionValueType;
}

const riskWarnings: Partial<Record<NonNullable<TransactionValueType['displayRisk']>, string>> = {
  suspicious: 'This token name contains hidden or look-alike characters',
  blocked: 'This token name contains characters that can hide or reorder text',
};

export function TransactionValue({ value, class: className }: TransactionValuePropsType) {
  const isNameBlocked = value.displayRisk === 'blocked';
  const riskWarning = value.displayRisk ? riskWarnings[value.displayRisk] : undefined;

  return (
    <div class={{ [className]: Boolean(className), [styles.transactionValue]: true }}>
      {value.badge && (
        <div data-testid={DataTestIdsEnum.transactionNftBadge} class={styles.transactionValueBadge}>
          {value.badge}
        </div>
      )}

      {value.showFormattedAmount && (
        <div class={styles.transactionValueAmount}>
          {value.egldLabel && <mvx-multiversx-symbol-icon class={styles.transactionValueAmountSymbol} />}

          <FormatAmount
            class={classNames(styles.transactionValueFormatAmount, {
              [styles.transactionValueTextTruncate]: value.svgUrl,
            })}
            data-testid={DataTestIdsEnum.transactionActionFormattedAmount}
            isValid
            label={value.egldLabel}
            valueDecimal={value.valueDecimal}
            valueInteger={value.valueInteger}
            decimalClass="opacity-70"
            labelClass="opacity-70"
          />
        </div>
      )}

      {value.link && (
        <ExplorerLink
          link={value.link}
          class={classNames({
            [styles.transactionValueLink]: value.svgUrl,
            [styles.transactionValueTextTruncate]: !value.svgUrl,
          })}
        >
          <div class={styles.transactionValue}>
            {value.svgUrl && (
              <img
                referrerPolicy="no-referrer"
                src={value.svgUrl}
                alt={isNameBlocked ? '' : (value.name ?? '')}
                class={styles.transactionValueImg}
              />
            )}

            {value.linkText && (
              <span
                class={{
                  [styles.transactionValueTextTruncate]: value.ticker === value.collection && value.ticker != null,
                }}
              >
                {isNameBlocked ? 'Unknown token' : value.linkText}
              </span>
            )}
          </div>
        </ExplorerLink>
      )}

      {riskWarning && (
        <mvx-tooltip
          data-testid={DataTestIdsEnum.transactionValueRiskWarning}
          trigger={<Icon name="triangular-warning" class={styles.transactionValueRiskIcon} />}
        >
          {riskWarning}
        </mvx-tooltip>
      )}

      {value.titleText && (
        <mvx-tooltip trigger={<Icon name="layers" class={styles.transactionValueIcon} />}>
          {value.titleText}
        </mvx-tooltip>
      )}
    </div>
  );
}
