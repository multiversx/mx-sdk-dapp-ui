import { h } from '@stencil/core';
import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import {
  createToastDataState,
  createTransaction,
  createTransactions,
} from 'components/functional/toasts-list/tests/mocks/toasts';
import { TransactionStatusEnum } from 'constants/transactionStatus.enum';

import type { TransactionToastContent } from './transaction-toast-content';

// prettier-ignore
const styles = {
  contentStoriesWrapper: 'content-stories-wrapper mvx:flex mvx:flex-col mvx:gap-4 mvx:w-full mvx:max-w-md',
} satisfies Record<string, string>;

const storySettings: Meta<TransactionToastContent> = {
  tags: ['autodocs'],
  title: 'Toasts/TransactionToast/Content',
  component: 'mvx-transaction-toast-content',
  args: {
    transactions: createTransactions(1),
    toastDataState: createToastDataState(TransactionStatusEnum.success),
    processedTransactionsStatus: 'Transaction processed',
    fullWidth: false,
  },
  argTypes: {
    transactions: { control: 'object' },
    toastDataState: { control: 'object' },
    processedTransactionsStatus: { control: 'text' },
    fullWidth: { control: 'boolean' },
  },
};

export const SingleTransaction: StoryObj<TransactionToastContent> = {
  render: properties => (
    <div class={styles.contentStoriesWrapper}>
      <mvx-transaction-toast-content
        transactions={properties.transactions ?? createTransactions(1)}
        toastDataState={properties.toastDataState ?? createToastDataState(TransactionStatusEnum.success)}
        processedTransactionsStatus={properties.processedTransactionsStatus}
        fullWidth={properties.fullWidth}
      />
    </div>
  ),
};

export const WithoutAmount: StoryObj<TransactionToastContent> = {
  render: () => (
    <div class={styles.contentStoriesWrapper}>
      <mvx-transaction-toast-content
        transactions={[createTransaction({ amount: undefined })]}
        toastDataState={createToastDataState(TransactionStatusEnum.success)}
      />
    </div>
  ),
};

export const MultipleTransactions: StoryObj<TransactionToastContent> = {
  render: () => (
    <div class={styles.contentStoriesWrapper}>
      <mvx-transaction-toast-content
        transactions={createTransactions(4, TransactionStatusEnum.pending)}
        toastDataState={createToastDataState(TransactionStatusEnum.pending)}
        processedTransactionsStatus="Processing 4 transactions"
      />
    </div>
  ),
};

export const Statuses: StoryObj<TransactionToastContent> = {
  render: () => (
    <div class={styles.contentStoriesWrapper}>
      {[TransactionStatusEnum.success, TransactionStatusEnum.pending, TransactionStatusEnum.fail].map(status => (
        <mvx-transaction-toast-content
          transactions={createTransactions(1, status)}
          toastDataState={createToastDataState(status)}
        />
      ))}
    </div>
  ),
};

export const WithoutCloseButton: StoryObj<TransactionToastContent> = {
  render: () => (
    <div class={styles.contentStoriesWrapper}>
      <mvx-transaction-toast-content
        transactions={createTransactions(1)}
        toastDataState={{ ...createToastDataState(TransactionStatusEnum.success), hasCloseButton: false }}
      />
    </div>
  ),
};

export const FullWidth: StoryObj<TransactionToastContent> = {
  render: () => (
    <mvx-transaction-toast-content
      transactions={createTransactions(1)}
      toastDataState={createToastDataState(TransactionStatusEnum.success)}
      fullWidth={true}
    />
  ),
};

export default storySettings;
