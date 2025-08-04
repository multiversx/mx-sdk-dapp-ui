import { Component, h, Prop } from '@stencil/core';
import classNames from 'classnames';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import type { TransactionRowType } from '../../transactions-table.type';

const transactionShardsClasses: Record<string, string> = {
  explorerLink: 'mvx:text-primary!',
};

@Component({
  tag: 'mvx-transaction-shards',
  styleUrl: 'transaction-shards.scss',
})
export class TransactionShards {
  @Prop() class?: string;
  @Prop() transaction: TransactionRowType;

  render() {
    return (
      <div class={classNames(this.class, 'transaction-shards')}>
        <mvx-explorer-link
          link={this.transaction.sender.shardLink}
          class={transactionShardsClasses.explorerLink}
          data-testid={DataTestIdsEnum.shardFromLink}
        >
          <span data-testid={DataTestIdsEnum.senderShard}>{this.transaction.sender.shard}</span>
        </mvx-explorer-link>

        <span class="transaction-shards-arrow">
          <mvx-arrow-right-icon />
        </span>

        <mvx-explorer-link
          link={this.transaction.receiver.shardLink}
          data-testid={DataTestIdsEnum.shardToLink}
          class={transactionShardsClasses.explorerLink}
        >
          <span data-testid={DataTestIdsEnum.receiverShard}>{this.transaction.receiver.shard}</span>
        </mvx-explorer-link>
      </div>
    );
  }
}
