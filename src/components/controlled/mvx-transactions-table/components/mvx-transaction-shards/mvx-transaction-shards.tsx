import { Component, h, Prop } from '@stencil/core';
import classNames from 'classnames';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import type { IMvxTransactionsTableRow } from '../../mvx-transactions-table.type';

@Component({
  tag: 'mvx-transaction-shards',
  styleUrl: 'mvx-transaction-shards.css',
})
export class MvxTransactionShards {
  @Prop() class?: string;
  @Prop() transaction: IMvxTransactionsTableRow;

  render() {
    return (
      <div class={classNames(this.class, 'transaction-shards')}>
        <explorer-link link={this.transaction.sender.shardLink} class="transactions-table-body-cell-link" data-testid={DataTestIdsEnum.shardFromLink}>
          <span slot="content" data-testid={DataTestIdsEnum.senderShard}>
            {this.transaction.sender.shard}
          </span>
        </explorer-link>

        <span class="transaction-shards-arrow">&#10132;</span>

        <explorer-link class="transactions-table-body-cell-link" link={this.transaction.receiver.shardLink} data-testid={DataTestIdsEnum.shardToLink}>
          <span slot="content" data-testid={DataTestIdsEnum.receiverShard}>
            {this.transaction.receiver.shard}
          </span>
        </explorer-link>
      </div>
    );
  }
}
