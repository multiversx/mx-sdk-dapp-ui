import { Component, h, Prop } from '@stencil/core';
import classNames from 'classnames';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import type { TransactionRowType } from '../../transactions-table.type';

// prettier-ignore
const styles = {
  transactionShards :'transaction-shards mvx:items-center mvx:flex mvx:gap-2 mvx:w-max mvx:fill-label',
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
      <div class={classNames(this.class, styles.transactionShards)}>
        <mvx-explorer-link
          link={this.transaction.sender.shardLink}
          class={styles.explorerLink}
          data-testid={DataTestIdsEnum.shardFromLink}
        >
          <span data-testid={DataTestIdsEnum.senderShard}>{this.transaction.sender.shard}</span>
        </mvx-explorer-link>

        <span class={styles.transactionShards}>
          <mvx-arrow-right-icon />
        </span>

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
