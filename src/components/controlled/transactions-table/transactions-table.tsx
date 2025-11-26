import { Component, h, Prop } from '@stencil/core';

import { DataTestIdsEnum } from '../../../constants/dataTestIds.enum';
import {
  TransactionAccount,
  TransactionAge,
  TransactionHash,
  TransactionMethod,
  TransactionShards,
  TransactionValue,
} from './components';
import styles from './transactions-table.styles';
import type { TransactionRowType } from './transactions-table.type';

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
                <TransactionHash class={styles.transactionsTableBodyCellChild} transaction={transaction} />
              </td>
              <td class={styles.transactionsTableBodyCell}>
                <TransactionAge
                  class={styles.transactionsTableBodyCellChild}
                  age={transaction.age.timeAgo}
                  tooltip={transaction.age.tooltip}
                />
              </td>
              <td class={styles.transactionsTableBodyCell}>
                <TransactionShards class={styles.transactionsTableBodyCellChild} transaction={transaction} />
              </td>
              <td class={styles.transactionsTableBodyCell}>
                <TransactionAccount
                  class={styles.transactionsTableBodyCellChild}
                  account={transaction.sender}
                  dataTestId={DataTestIdsEnum.transactionSender}
                  scope="sender"
                  showLockedAccounts={true}
                />
              </td>
              <td class={styles.transactionsTableBodyCell}>
                <TransactionAccount
                  class={styles.transactionsTableBodyCellChild}
                  account={transaction.receiver}
                  dataTestId={DataTestIdsEnum.transactionReceiver}
                  scope="receiver"
                  showLockedAccounts={true}
                />
              </td>
              <td class={styles.transactionsTableBodyCell}>
                <TransactionMethod
                  class={styles.transactionsTableBodyCellChild}
                  method={transaction.method.name}
                  actionDescription={transaction.method.actionDescription}
                />
              </td>
              <td class={styles.transactionsTableBodyCell}>
                <TransactionValue class={styles.transactionsTableBodyCellChild} value={transaction.value} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
