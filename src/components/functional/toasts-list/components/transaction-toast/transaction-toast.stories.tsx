import { h } from '@stencil/core';
import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import {
  createProgressState,
  createToastDataState,
  createTransactions,
  uniqueToastId,
} from 'components/functional/toasts-list/tests/mocks/toasts';
import { TransactionStatusEnum } from 'constants/transactionStatus.enum';

import type { TransactionToast } from './transaction-toast';

// prettier-ignore
const styles = {
  transactionToastStoriesWrapper: 'transaction-toast-stories-wrapper mvx:flex mvx:flex-col mvx:gap-4 mvx:w-full mvx:max-w-md',
} satisfies Record<string, string>;

const storySettings: Meta<TransactionToast> = {
  tags: ['autodocs'],
  title: 'Toasts/TransactionToast',
  component: 'mvx-transaction-toast',
  parameters: {
    docs: {
      description: {
        component:
          'A single transaction toast: the progress wrapper plus its content. Composed by `mvx-toast-list`, but fully prop-driven, so it can be rendered on its own.',
      },
    },
  },
  args: {
    toastId: 'transaction-toast-default',
    transactions: createTransactions(1),
    toastDataState: createToastDataState(TransactionStatusEnum.success),
    processedTransactionsStatus: 'Transaction processed',
    fullWidth: false,
  },
  argTypes: {
    transactions: { control: 'object' },
    toastDataState: { control: 'object' },
    transactionProgressState: { control: 'object' },
    processedTransactionsStatus: { control: 'text' },
    fullWidth: { control: 'boolean' },
    toastId: { control: 'text' },
    wrapperClass: { control: 'text' },
  },
};

export const Success: StoryObj<TransactionToast> = {
  render: properties => (
    <div class={styles.transactionToastStoriesWrapper}>
      <mvx-transaction-toast
        toastId={uniqueToastId('success')}
        transactions={properties.transactions ?? createTransactions(1)}
        toastDataState={properties.toastDataState ?? createToastDataState(TransactionStatusEnum.success)}
        processedTransactionsStatus={properties.processedTransactionsStatus}
        fullWidth={properties.fullWidth}
      />
    </div>
  ),
};

export const Pending: StoryObj<TransactionToast> = {
  render: () => (
    <div class={styles.transactionToastStoriesWrapper}>
      <mvx-transaction-toast
        toastId={uniqueToastId('pending')}
        transactions={createTransactions(1, TransactionStatusEnum.pending)}
        toastDataState={createToastDataState(TransactionStatusEnum.pending)}
        transactionProgressState={createProgressState(30)}
        processedTransactionsStatus="Processing transaction"
      />
    </div>
  ),
};

export const Failed: StoryObj<TransactionToast> = {
  render: () => (
    <div class={styles.transactionToastStoriesWrapper}>
      <mvx-transaction-toast
        toastId={uniqueToastId('failed')}
        transactions={createTransactions(1, TransactionStatusEnum.fail)}
        toastDataState={createToastDataState(TransactionStatusEnum.fail)}
        processedTransactionsStatus="Transaction failed"
      />
    </div>
  ),
};

export const CrossShardPending: StoryObj<TransactionToast> = {
  render: () => (
    <div class={styles.transactionToastStoriesWrapper}>
      <mvx-transaction-toast
        toastId={uniqueToastId('cross-shard')}
        transactions={createTransactions(1, TransactionStatusEnum.pending)}
        toastDataState={createToastDataState(TransactionStatusEnum.pending)}
        transactionProgressState={createProgressState(120, true)}
        processedTransactionsStatus="Processing cross-shard transaction"
      />
    </div>
  ),
};

export const MultipleTransactions: StoryObj<TransactionToast> = {
  render: () => (
    <div class={styles.transactionToastStoriesWrapper}>
      <mvx-transaction-toast
        toastId={uniqueToastId('multiple')}
        transactions={createTransactions(4, TransactionStatusEnum.pending)}
        toastDataState={createToastDataState(TransactionStatusEnum.pending)}
        transactionProgressState={createProgressState(60)}
        processedTransactionsStatus="Processing 4 transactions"
      />
    </div>
  ),
};

export const FullWidth: StoryObj<TransactionToast> = {
  render: () => (
    <mvx-transaction-toast
      toastId={uniqueToastId('full-width')}
      transactions={createTransactions(1)}
      toastDataState={createToastDataState(TransactionStatusEnum.success)}
      fullWidth={true}
    />
  ),
};

export default storySettings;
