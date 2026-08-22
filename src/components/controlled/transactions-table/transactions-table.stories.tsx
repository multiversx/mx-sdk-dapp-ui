import { h } from '@stencil/core';
import type { Meta, StoryObj } from '@stencil/storybook-plugin';

import { createTransactionRows } from './tests/mocks/transactionRows';
import type { TransactionsTable } from './transactions-table';

// prettier-ignore
const styles = {
  transactionsTableStoriesWrapper: 'transactions-table-stories-wrapper mvx:w-full mvx:p-4 mvx:overflow-x-auto',
} satisfies Record<string, string>;

const storySettings: Meta<TransactionsTable> = {
  tags: ['autodocs'],
  title: 'Controlled/TransactionsTable',
  component: 'mvx-transactions-table',
  parameters: {
    docs: {
      description: {
        component:
          'A controlled component: every row arrives fully pre-processed from an `sdk-dapp` controller. It holds no fetching or formatting logic.',
      },
    },
  },
  args: {
    transactions: createTransactionRows(5),
  },
  argTypes: {
    transactions: { control: 'object' },
    class: { control: 'text' },
  },
};

export const Default: StoryObj<TransactionsTable> = {
  render: properties => (
    <div class={styles.transactionsTableStoriesWrapper}>
      <mvx-transactions-table transactions={properties.transactions ?? createTransactionRows(5)} />
    </div>
  ),
};

export const SingleTransaction: StoryObj<TransactionsTable> = {
  render: () => (
    <div class={styles.transactionsTableStoriesWrapper}>
      <mvx-transactions-table transactions={createTransactionRows(1)} />
    </div>
  ),
};

export const ManyTransactions: StoryObj<TransactionsTable> = {
  render: () => (
    <div class={styles.transactionsTableStoriesWrapper}>
      <mvx-transactions-table transactions={createTransactionRows(20)} />
    </div>
  ),
};

export const Empty: StoryObj<TransactionsTable> = {
  render: () => (
    <div class={styles.transactionsTableStoriesWrapper}>
      <mvx-transactions-table transactions={[]} />
    </div>
  ),
};

export default storySettings;
