import { Component, h, Prop } from '@stencil/core';
import { ITransactionsTableRow } from '../../transactions-table.type';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

@Component({
  tag: 'transaction-hash',
  shadow: true,
})
export class TransactionHash {
  @Prop() class?: string = 'transaction-hash';
  @Prop() transaction: ITransactionsTableRow;

  render() {
    if (!this.transaction) {
      return null;
    }

    return (
      <div class={this.class}>
        <transaction-icon iconInfo={this.transaction.iconInfo}></transaction-icon>
        <explorer-link dataTestId={DataTestIdsEnum.transactionLink} link={this.transaction.link} text={this.transaction.txHash}></explorer-link>
      </div>
    );
  }
}
