import { Component, h, Prop } from '@stencil/core';
import { ITransactionsTableRow } from '../../transactions-table.type';

@Component({
  tag: 'transaction-row',
  styleUrl: 'transaction-row.css',
  shadow: true,
})
export class TransactionRow {
  @Prop() transaction: ITransactionsTableRow;

  render() {
    return (
      <tr class="transaction-row">
        <td>
          <transaction-hash transaction={this.transaction}></transaction-hash>
        </td>
      </tr>
    );
  }
}
