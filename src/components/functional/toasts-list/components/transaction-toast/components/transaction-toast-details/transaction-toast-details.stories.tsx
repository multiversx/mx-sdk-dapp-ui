import { h } from '@stencil/core';
import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { createTransactions } from 'components/functional/toasts-list/tests/mocks/toasts';
import { TransactionStatusEnum } from 'constants/transactionStatus.enum';

import type { TransactionToastDetails } from './transaction-toast-details';

// prettier-ignore
const styles = {
  detailsStoriesWrapper: 'details-stories-wrapper mvx:flex mvx:flex-col mvx:w-full mvx:max-w-md',
} satisfies Record<string, string>;

const storySettings: Meta<TransactionToastDetails> = {
  tags: ['autodocs'],
  title: 'Toasts/TransactionToast/Details',
  component: 'mvx-transaction-toast-details',
  parameters: {
    docs: {
      description: {
        component:
          'The collapsible transaction list shown when a toast covers more than one transaction. Renders nothing at all when `transactions` is not provided.',
      },
    },
  },
  args: {
    transactions: createTransactions(3),
    processedTransactionsStatus: 'Processed 3 transactions',
    maxShownTransactions: 5,
  },
  argTypes: {
    transactions: { control: 'object' },
    processedTransactionsStatus: { control: 'text' },
    maxShownTransactions: { control: { type: 'number', min: 1 } },
    transactionClass: { control: 'text' },
  },
};

export const Collapsed: StoryObj<TransactionToastDetails> = {
  render: properties => (
    <div class={styles.detailsStoriesWrapper}>
      <mvx-transaction-toast-details
        transactions={properties.transactions ?? createTransactions(3)}
        processedTransactionsStatus={properties.processedTransactionsStatus}
        maxShownTransactions={properties.maxShownTransactions}
      />
    </div>
  ),
};

export const OverflowingList: StoryObj<TransactionToastDetails> = {
  render: () => (
    <div class={styles.detailsStoriesWrapper}>
      <mvx-transaction-toast-details
        transactions={createTransactions(9, TransactionStatusEnum.pending)}
        processedTransactionsStatus="Processing 9 transactions"
        maxShownTransactions={5}
      />
    </div>
  ),
};

export const MixedStatuses: StoryObj<TransactionToastDetails> = {
  render: () => (
    <div class={styles.detailsStoriesWrapper}>
      <mvx-transaction-toast-details
        transactions={[
          ...createTransactions(1, TransactionStatusEnum.success),
          ...createTransactions(1, TransactionStatusEnum.pending).map(transaction => ({
            ...transaction,
            hash: `aa${transaction.hash.slice(2)}`,
          })),
          ...createTransactions(1, TransactionStatusEnum.fail).map(transaction => ({
            ...transaction,
            hash: `bb${transaction.hash.slice(2)}`,
          })),
        ]}
        processedTransactionsStatus="1 successful, 1 pending, 1 failed"
      />
    </div>
  ),
};

export default storySettings;
