import { Component, h, Prop } from '@stencil/core';
import { ITransactionsTableRow } from './transactions-table.type';
import { Watch } from '../../../dist/types/stencil-public-runtime';

const COLUMNS = ['TxHash', 'Age', 'Shard', 'From', 'To', 'Method', 'Value'];

@Component({
  tag: 'transactions-table',
  styleUrl: 'transactions-table.css',
  shadow: true,
})
export class TransactionsTable {
  @Prop() data: string;
  private transactions: ITransactionsTableRow[] = [];

  @Watch('data')
  dataChangeHandler(newValue: string) {
    if (!newValue) {
      return;
    }

    try {
      this.transactions = JSON.parse(newValue);
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
    console.log(this.transactions);

    return (
      <table class="transactions-table">
        <thead class="transactions-table-header">
          <tr>
            {COLUMNS.map(column => (
              <th key={column} scope="col" class="transactions-table-header-cell">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody class="transactions-table-body">
          {this.transactions.map(transaction => (
            <transaction-row key={transaction.txHash} data={JSON.stringify(transaction)}></transaction-row>
          ))}
        </tbody>
      </table>
    );
  }
}
