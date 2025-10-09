import { Component, h, Prop } from '@stencil/core';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

// prettier-ignore
const styles = {
  transactionMethodBadge: 'transaction-method-badge mvx:inline-block mvx:py-1 mvx:px-1.5 mvx:font-normal mvx:text-center mvx:whitespace-pre-wrap mvx:text-xs mvx:leading-none mvx:break-all mvx:align-baseline mvx:rounded-sm mvx:transition-colors mvx:duration-200 mvx:ease-in-out mvx:motion-reduce:transition-none mvx:text-transaction-method mvx:border-1 mvx:border-transaction-method mvx:bg-transparent mvx:font-light',
  transactionMethodBadgeEmpty: 'transaction-method-badge-empty mvx:hidden',
  transactionMethodText: 'transaction-method-text mvx:truncate mvx:capitalize'

} satisfies Record<string, string>;

@Component({
  tag: 'mvx-transaction-method',
  styleUrl: 'transaction-method.scss',
})
export class TransactionMethod {
  @Prop() class?: string;
  @Prop() actionDescription: string;
  @Prop() method: string;

  render() {
    return (
      <span
        class={{
          [styles.transactionMethodBadge]: true,
          [styles.transactionMethodBadgeEmpty]: this.method === '',
          [this.class]: Boolean(this.class),
        }}
        data-testid={DataTestIdsEnum.method}
        title={this.actionDescription}
      >
        <div class={styles.transactionMethodText}>{this.method}</div>
      </span>
    );
  }
}
