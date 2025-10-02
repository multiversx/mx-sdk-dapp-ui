import { Component, h, Prop } from '@stencil/core';
import classNames from 'classnames';
import { Icon } from 'common/Icon';
import type { TransactionValueType } from 'components/controlled/transactions-table/transactions-table.type';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import styles from './transaction-value.styles';

@Component({
  tag: 'mvx-transaction-value',
  styleUrl: 'transaction-value.scss',
})
export class TransactionValue {
  @Prop() class?: string;
  @Prop() value: TransactionValueType;

  render() {
    return (
      <div class={classNames(this.class, styles.transactionValue)}>
        {this.value.badge && (
          <div data-testid={DataTestIdsEnum.transactionNftBadge} class={styles.transactionValueBadge}>
            {this.value.badge}
          </div>
        )}

        {this.value.showFormattedAmount && (
          <div class={styles.transactionValueAmount}>
            {this.value.egldLabel && <mvx-multiversx-symbol-icon class={styles.transactionValueAmountSymbol} />}

            <mvx-format-amount
              class={classNames(styles.transactionValueFormatAmount, {
                [styles.transactionValueTextTruncate]: this.value.svgUrl,
              })}
              dataTestId={DataTestIdsEnum.transactionActionFormattedAmount}
              isValid={true}
              label={this.value.egldLabel}
              valueDecimal={this.value.valueDecimal}
              valueInteger={this.value.valueInteger}
              decimalClass="opacity-70"
              labelClass="opacity-70"
            />
          </div>
        )}

        {this.value.link && (
          <mvx-explorer-link
            link={this.value.link}
            class={classNames({
              [styles.transactionValueLink]: this.value.svgUrl,
              [styles.transactionValueTextTruncate]: !this.value.svgUrl,
            })}
          >
            <div class={styles.transactionValue}>
              {this.value.svgUrl && (
                <img src={this.value.svgUrl} alt={this.value.name ?? ''} class={styles.transactionValueImg} />
              )}

              {this.value.linkText && (
                <span
                  class={{
                    [styles.transactionValueTextTruncate]:
                      this.value.ticker === this.value.collection && this.value.ticker != null,
                  }}
                >
                  {this.value.linkText}
                </span>
              )}
            </div>
          </mvx-explorer-link>
        )}

        {this.value.titleText && (
          <mvx-tooltip trigger={<Icon name="layers" class={styles.transactionValueIcon} />}>
            {this.value.titleText}
          </mvx-tooltip>
        )}
      </div>
    );
  }
}
