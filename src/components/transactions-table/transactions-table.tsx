import { Component, h, Prop } from '@stencil/core';
import { ITransactionsTableRow } from './transactions-table.type';

const COLUMNS = ['TxHash', 'Age', 'Shard', 'From', 'To', 'Method', 'Value'];

@Component({
  tag: 'transactions-table',
  styleUrl: 'transactions-table.css',
  shadow: true,
})
export class TransactionsTable {
  @Prop() transactions: ITransactionsTableRow[];

  render() {
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
            <transaction-row key={transaction.txHash} transaction={transaction}></transaction-row>
          ))}
        </tbody>
      </table>
    );
  }
}
