import { Component, h, Prop } from '@stencil/core';
import { ITransactionsTableRow } from '../../transactions-table.type';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';
import { Watch } from '../../../../../dist/types/stencil-public-runtime';

@Component({
  tag: 'transaction-hash',
  styleUrl: 'transaction-hash.css',
  shadow: true,
})
export class TransactionHash {
  @Prop() data: string;
  private transaction: ITransactionsTableRow;

  @Watch('data')
  dataChangeHandler(newValue: string) {
    if (!newValue) {
      return;
    }

    try {
      this.transaction = JSON.parse(newValue);
    } catch (error) {
      console.error('Failed to parse transactions data');
    }
  }

  componentDidLoad() {
    // Parse initial data
    if (this.data) {
      this.dataChangeHandler(this.data);
    }
  }

  render() {
    console.log(this.transaction);

    if (!this.transaction) {
      return null;
    }

    return (
      <div class="transactions-table-body-cell">
        <transaction-icon data={JSON.stringify(this.transaction.iconInfo)}></transaction-icon>
        <explorer-link dataTestId={DataTestIdsEnum.transactionLink} link={this.transaction.link} text={this.transaction.txHash}></explorer-link>
      </div>
    );
  }
}
