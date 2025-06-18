import { Component, h, Prop } from '@stencil/core';
import classNames from 'classnames';

import { DataTestIdsEnum } from '../../../constants/dataTestIds.enum';
import type { TransactionRowType } from './transactions-table.type';

const COLUMNS = ['TxHash', 'Age', 'Shard', 'From', 'To', 'Method', 'Value'];

@Component({
  tag: 'mvx-transactions-table',
  styleUrl: 'transactions-table.scss',
})
export class TransactionsTable {
  @Prop() class?: string;
  @Prop() transactions: TransactionRowType[];

  render() {
    return (
      <table class={classNames(this.class, 'transactions-table')}>
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
            <tr class="transactions-table-body-row">
              <td class="transactions-table-body-cell">
                <mvx-transaction-hash transaction={transaction}></mvx-transaction-hash>
              </td>
              <td class="transactions-table-body-cell">
                <mvx-transaction-age
                  age={transaction.age.timeAgo}
                  tooltip={transaction.age.tooltip}
                ></mvx-transaction-age>
              </td>
              <td class="transactions-table-body-cell">
                <mvx-transaction-shards transaction={transaction}></mvx-transaction-shards>
              </td>
              <td class="transactions-table-body-cell">
                <mvx-transaction-account
                  account={transaction.sender}
                  dataTestId={DataTestIdsEnum.transactionSender}
                  scope="sender"
                  showLockedAccounts={true}
                ></mvx-transaction-account>
              </td>
              <td class="transactions-table-body-cell">
                <mvx-transaction-account
                  account={transaction.receiver}
                  dataTestId={DataTestIdsEnum.transactionReceiver}
                  scope="receiver"
                  showLockedAccounts={true}
                ></mvx-transaction-account>
              </td>
              <td class="transactions-table-body-cell">
                <mvx-transaction-method
                  method={transaction.method.name}
                  actionDescription={transaction.method.actionDescription}
                ></mvx-transaction-method>
              </td>
              <td class="transactions-table-body-cell">
                <mvx-transaction-value value={transaction.value}></mvx-transaction-value>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
