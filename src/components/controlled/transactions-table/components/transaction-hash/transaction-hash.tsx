import { Component, h, Prop } from '@stencil/core';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import type { TransactionRowType } from '../../transactions-table.type';

const transactionHashClasses: Record<string, string> = {
  explorerLink: 'mvx:text-primary!',
};

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
          'transaction-hash': true,
          [this.class]: Boolean(this.class),
        }}
      >
        <mvx-transaction-icon
          iconInfo={this.transaction.iconInfo}
          class="mvx:flex mvx:items-center mvx:justify-center"
        />

        <mvx-explorer-link
          dataTestId={DataTestIdsEnum.transactionLink}
          link={this.transaction.link}
          class={transactionHashClasses.explorerLink}
        >
          <mvx-trim text={this.transaction.txHash} />
        </mvx-explorer-link>
      </div>
    );
  }
}
