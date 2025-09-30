import { Component, h, Prop } from '@stencil/core';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import type { TransactionRowType } from '../../transactions-table.type';

// prettier-ignore
const styles = {
  transactionHash: 'transaction-hash mvx:flex mvx:gap-1 mvx:items-center mvx:justify-center',
  transactionHashExplorerLink: 'transaction-hash-explorer-link mvx:text-primary!',
  transactionHashIcon: 'transaction-hash-icon mvx:flex mvx:items-center mvx:justify-center',
} satisfies Record<string, string>;

@Component({
  tag: 'mvx-transaction-hash',
  styleUrl: 'transaction-hash.scss',
})
export class TransactionHash {
  @Prop() class?: string;
  @Prop() transaction: TransactionRowType;

  render() {
    if (!this.transaction) {
      return null;
    }

    return (
      <div
        class={{
          [styles.transactionHash]: true,
          [this.class]: Boolean(this.class),
        }}
      >
        <mvx-transaction-icon iconInfo={this.transaction.iconInfo} class={styles.transactionHashIcon} />

        <mvx-explorer-link
          dataTestId={DataTestIdsEnum.transactionLink}
          link={this.transaction.link}
          class={styles.transactionHashExplorerLink}
        >
          <mvx-trim text={this.transaction.txHash} />
        </mvx-explorer-link>
      </div>
    );
  }
}
