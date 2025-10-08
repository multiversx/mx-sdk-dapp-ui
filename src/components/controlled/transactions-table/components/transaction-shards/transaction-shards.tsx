import { Component, h, Prop } from '@stencil/core';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import type { TransactionRowType } from '../../transactions-table.type';

// prettier-ignore
const styles = {
  transactionShards: 'transaction-shards mvx:items-center mvx:flex mvx:gap-2 mvx:w-max mvx:fill-label',
  transactionShardsArrowIcon: 'transaction-shards-arrow-icon mvx:w-4 mvx:h-4',
  explorerLink: 'explorer-link mvx:text-primary!'
} satisfies Record<string, string>;

@Component({
  tag: 'mvx-transaction-shards',
  styleUrl: 'transaction-shards.scss',
})
export class TransactionShards {
  @Prop() class?: string;
  @Prop() transaction: TransactionRowType;

  render() {
    return (
      <div class={{ [this.class]: Boolean(this.class), [styles.transactionShards]: true }}>
        <mvx-explorer-link
          link={this.transaction.sender.shardLink}
          class={styles.explorerLink}
          data-testid={DataTestIdsEnum.shardFromLink}
        >
          <span data-testid={DataTestIdsEnum.senderShard}>{this.transaction.sender.shard}</span>
        </mvx-explorer-link>

        <mvx-arrow-right-icon class={styles.transactionShardsArrowIcon} />

        <mvx-explorer-link
          link={this.transaction.receiver.shardLink}
          data-testid={DataTestIdsEnum.shardToLink}
          class={styles.explorerLink}
        >
          <span data-testid={DataTestIdsEnum.receiverShard}>{this.transaction.receiver.shard}</span>
        </mvx-explorer-link>
      </div>
    );
  }
}
