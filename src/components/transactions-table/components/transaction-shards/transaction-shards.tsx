import { Component, h, Prop } from '@stencil/core';
import classNames from 'classnames';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import type { ITransactionsTableRow } from '../../transactions-table.type';

@Component({
  tag: 'transaction-shards',
  styleUrl: 'transaction-shards.css',
  shadow: true,
})
export class TransactionShards {
  @Prop() class?: string;
  @Prop() transaction: ITransactionsTableRow;

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
