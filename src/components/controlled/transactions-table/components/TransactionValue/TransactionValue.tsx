import { h } from '@stencil/core';
import { Icon } from 'common/Icon';
import type { TransactionValueType } from 'components/controlled/transactions-table/transactions-table.type';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import styles from './transactionValue.styles';
import classNames from 'classnames';

interface TransactionValuePropsType {
    class?: string;
    value: TransactionValueType;
}

export function TransactionValue({ value, class: className }: TransactionValuePropsType) {
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

                    <mvx-format-amount
                        class={classNames(styles.transactionValueFormatAmount, {
                            [styles.transactionValueTextTruncate]: value.svgUrl,
                        })}
                        dataTestId={DataTestIdsEnum.transactionActionFormattedAmount}
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
                <mvx-explorer-link
                    link={value.link}
                    class={classNames({
                        [styles.transactionValueLink]: value.svgUrl,
                        [styles.transactionValueTextTruncate]: !value.svgUrl,
                    })}
                >
                    <div class={styles.transactionValue}>
                        {value.svgUrl && (
                            <img src={value.svgUrl} alt={value.name ?? ''} class={styles.transactionValueImg} />
                        )}

                        {value.linkText && (
                            <span
                                class={{
                                    [styles.transactionValueTextTruncate]:
                                        value.ticker === value.collection && value.ticker != null,
                                }}
                            >
                                {value.linkText}
                            </span>
                        )}
                    </div>
                </mvx-explorer-link>
            )}

            {value.titleText && (
                <mvx-tooltip trigger={<Icon name="layers" class={styles.transactionValueIcon} />}>
                    {value.titleText}
                </mvx-tooltip>
            )}
        </div>
    );
}

