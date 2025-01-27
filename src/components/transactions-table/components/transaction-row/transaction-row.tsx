import { Component, h, Prop } from '@stencil/core';
import { ITransactionsTableRow } from '../../transactions-table.type';
import { Watch } from '../../../../../dist/types/stencil-public-runtime';

@Component({
  tag: 'transaction-row',
  styleUrl: 'transaction-row.css',
  shadow: true,
})
export class TransactionRow {
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
    if (!this.transaction) {
      return null;
    }

    return (
      <tr class="transaction-row">
        <td>
          <transaction-hash data={this.data}></transaction-hash>
        </td>
      </tr>
    );
  }
}
