import { Component, h, Prop } from '@stencil/core';
import { ITransactionsTableRow } from '../../transactions-table.type';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

@Component({
  tag: 'transaction-shards',
  styleUrl: 'transaction-shards.css',
  shadow: true,
})
export class TransactionShards {
  @Prop() class?: string = 'transaction-shards';
  @Prop() transaction: ITransactionsTableRow;

  render() {
    return (
      <div class={this.class}>
        <explorer-link link={this.transaction.sender.shardLink} class="transactions-table-body-cell-link" data-testid={DataTestIdsEnum.shardFromLink}>
          <span data-testid={DataTestIdsEnum.senderShard}>{this.transaction.sender.shard}</span>
        </explorer-link>

        <span class="transaction-shards-arrow">&#10132;</span>

        <explorer-link class="transactions-table-body-cell-link" link={this.transaction.receiver.shardLink} data-testid={DataTestIdsEnum.shardToLink}>
          <span data-testid={DataTestIdsEnum.receiverShard}>{this.transaction.receiver.shard}</span>
        </explorer-link>
      </div>
    );
  }
}
