import { Component, h, Prop } from '@stencil/core';
import { ITransactionsTableRow } from '../../transactions-table.type';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

@Component({
  tag: 'transaction-row',
  styleUrl: 'transaction-row.css',
  shadow: true,
})
export class TransactionRow {
  @Prop() class?: string = 'transaction-row';
  @Prop() transaction: ITransactionsTableRow;

  render() {
    return (
      <tr class={this.class}>
        <td>
          <transaction-hash class="transactions-table-body-cell" transaction={this.transaction}></transaction-hash>
        </td>
        <td>
          <transaction-age class="transactions-table-body-cell" age={this.transaction.age.timeAgo} tooltip={this.transaction.age.tooltip}></transaction-age>
        </td>
        <td>
          <transaction-shards class="transactions-table-body-cell" transaction={this.transaction}></transaction-shards>
        </td>
        <td>
          <transaction-account
            class="transactions-table-body-cell"
            account={this.transaction.sender}
            dataTestId={DataTestIdsEnum.transactionSender}
            scope="sender"
            showLockedAccounts={true}
          ></transaction-account>
        </td>
        {this.transaction.direction && (
          <td>
            <transaction-direction-badge direction={this.transaction.direction}></transaction-direction-badge>
          </td>
        )}
        <td>
          <transaction-account
            class="transactions-table-body-cell"
            account={this.transaction.receiver}
            dataTestId={DataTestIdsEnum.transactionReceiver}
            scope="receiver"
            showLockedAccounts={true}
          ></transaction-account>
        </td>
        <td>
          <transaction-method method={this.transaction.method.name} actionDescription={this.transaction.method.actionDescription}></transaction-method>
        </td>
      </tr>
    );
  }
}
