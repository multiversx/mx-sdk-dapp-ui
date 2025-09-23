import { Component, h, Prop } from '@stencil/core';
import classNames from 'classnames';
import { Icon } from 'common/Icon';
import type { TransactionValueType } from 'components/controlled/transactions-table/transactions-table.type';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

@Component({
  tag: 'mvx-transaction-value',
  styleUrl: 'transaction-value.scss',
})
export class TransactionValue {
  @Prop() class?: string;
  @Prop() value: TransactionValueType;

  render() {
    return (
      <div class={classNames(this.class, 'transaction-value')}>
        {this.value.badge && (
          <div
            data-testid={DataTestIdsEnum.transactionNftBadge}
            class="badge badge-secondary badge-pill font-weight-light transaction-value-badge"
          >
            {this.value.badge}
          </div>
        )}

        {this.value.showFormattedAmount && (
          <div class="amount">
            {this.value.egldLabel && <mvx-multiversx-symbol-icon class="amount-symbol" />}

            <mvx-format-amount
              class={classNames('mr-1 mvx:text-primary', { 'text-truncate': this.value.svgUrl })}
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
            class={classNames('transaction-value-link', {
              'side-link d-flex': this.value.svgUrl,
              'text-truncate': !this.value.svgUrl,
            })}
          >
            <div class="transaction-value-content">
              {this.value.svgUrl && (
                <img src={this.value.svgUrl} alt={this.value.name ?? ''} class="transaction-value-img" />
              )}

              {this.value.linkText && (
                <span
                  class={classNames('transaction-value-link-text', {
                    truncate: this.value.ticker === this.value.collection && this.value.ticker != null,
                  })}
                >
                  {this.value.linkText}
                </span>
              )}
            </div>
          </mvx-explorer-link>
        )}

        {this.value.titleText && (
          <mvx-tooltip trigger={<Icon name="layers" class="transaction-value-icon" />}>
            {this.value.titleText}
          </mvx-tooltip>
        )}
      </div>
    );
  }
}
