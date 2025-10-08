import { Component, h, Prop } from '@stencil/core';

import { DataTestIdsEnum } from '../../../constants/dataTestIds.enum';
import type { TransactionRowType } from './transactions-table.type';
import styles from './transactions-table.styles'

const COLUMNS = ['Txn Hash', 'Age', 'Shard', 'From', 'To', 'Method', 'Value'];

@Component({
  tag: 'mvx-transactions-table',
  styleUrl: 'transactions-table.scss',
})
export class TransactionsTable {
  @Prop() class?: string;
  @Prop() transactions: TransactionRowType[];

  render() {
    return (
      <table class={{ [this.class]: Boolean(this.class), [styles.transactionsTableContainer]: true }}>
        <thead class={styles.transactionsTableHeader}>
          <tr>
            {COLUMNS.map(column => (
              <th key={column} scope="col" class={styles.transactionsTableHeaderCell}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody class={styles.transactionsTableBody}>
          {this.transactions.map(transaction => (
            <tr class={styles.transactionsTableBodyRow}>
              <td class={styles.transactionsTableBodyCell}>
                <mvx-transaction-hash class={styles.transactionsTableBodyCellChild} transaction={transaction}></mvx-transaction-hash>
              </td>
              <td class={styles.transactionsTableBodyCell}>
                <mvx-transaction-age
                  class={styles.transactionsTableBodyCellChild}
                  age={transaction.age.timeAgo}
                  tooltip={transaction.age.tooltip}
                ></mvx-transaction-age>
              </td>
              <td class={styles.transactionsTableBodyCell}>
                <mvx-transaction-shards class={styles.transactionsTableBodyCellChild} transaction={transaction}></mvx-transaction-shards>
              </td>
              <td class={styles.transactionsTableBodyCell}>
                <mvx-transaction-account
                  class={styles.transactionsTableBodyCellChild}
                  account={transaction.sender}
                  dataTestId={DataTestIdsEnum.transactionSender}
                  scope="sender"
                  showLockedAccounts={true}
                ></mvx-transaction-account>
              </td>
              <td class={styles.transactionsTableBodyCell}>
                <mvx-transaction-account
                  class={styles.transactionsTableBodyCellChild}
                  account={transaction.receiver}
                  dataTestId={DataTestIdsEnum.transactionReceiver}
                  scope="receiver"
                  showLockedAccounts={true}
                ></mvx-transaction-account>
              </td>
              <td class={styles.transactionsTableBodyCell}>
                <mvx-transaction-method
                  class={styles.transactionsTableBodyCellChild}
                  method={transaction.method.name}
                  actionDescription={transaction.method.actionDescription}
                ></mvx-transaction-method>
              </td>
              <td class={styles.transactionsTableBodyCell}>
                <mvx-transaction-value class={styles.transactionsTableBodyCellChild} value={transaction.value}></mvx-transaction-value>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
