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

/** `durationInSeconds` drives the progress bar; the timestamps derive from "now". */
type TransactionToastStoryArgs = TransactionToast & { durationInSeconds: number };

/** Stories with no progress bar, where the duration knob has nothing to drive. */
const withoutProgressControls = { controls: { exclude: ['durationInSeconds'] } };

const storySettings: Meta<TransactionToastStoryArgs> = {
  tags: ['autodocs'],
  title: 'Toasts/TransactionToast',
  component: 'mvx-transaction-toast',
  parameters: {
    docs: {
      description: {
        component:
          'A single transaction toast: the progress wrapper plus its content. Composed by `mvx-toast-list`, but fully prop-driven, so it can be rendered on its own. On the pending stories, set `durationInSeconds` to watch any round length — `0.6` is one block, the shortest a transaction can take.',
      },
    },
  },
  args: {
    durationInSeconds: 3,
    toastId: 'transaction-toast-default',
    transactions: createTransactions(1),
    toastDataState: createToastDataState(TransactionStatusEnum.success),
    processedTransactionsStatus: 'Transaction processed',
    fullWidth: false,
  },
  argTypes: {
    durationInSeconds: {
      control: { type: 'number', min: 0.6, step: 0.1 },
      description: 'Round length in seconds for the progress bar, floored at 0.6 — one block.',
    },
    transactions: { control: 'object' },
    toastDataState: { control: 'object' },
    transactionProgressState: { control: 'object' },
    processedTransactionsStatus: { control: 'text' },
    fullWidth: { control: 'boolean' },
    toastId: { control: 'text' },
    wrapperClass: { control: 'text' },
  },
};

export const Success: StoryObj<TransactionToastStoryArgs> = {
  parameters: withoutProgressControls,
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

export const Pending: StoryObj<TransactionToastStoryArgs> = {
  render: properties => (
    <div class={styles.transactionToastStoriesWrapper}>
      <mvx-transaction-toast
        toastId={uniqueToastId('pending')}
        transactions={createTransactions(1, TransactionStatusEnum.pending)}
        toastDataState={createToastDataState(TransactionStatusEnum.pending)}
        transactionProgressState={createProgressState(properties.durationInSeconds)}
        processedTransactionsStatus="Processing transaction"
      />
    </div>
  ),
};

export const Failed: StoryObj<TransactionToastStoryArgs> = {
  parameters: withoutProgressControls,
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

export const CrossShardPending: StoryObj<TransactionToastStoryArgs> = {
  render: properties => (
    <div class={styles.transactionToastStoriesWrapper}>
      <mvx-transaction-toast
        toastId={uniqueToastId('cross-shard')}
        transactions={createTransactions(1, TransactionStatusEnum.pending)}
        toastDataState={createToastDataState(TransactionStatusEnum.pending)}
        transactionProgressState={createProgressState(properties.durationInSeconds, true)}
        processedTransactionsStatus="Processing cross-shard transaction"
      />
    </div>
  ),
};

export const MultipleTransactions: StoryObj<TransactionToastStoryArgs> = {
  render: properties => (
    <div class={styles.transactionToastStoriesWrapper}>
      <mvx-transaction-toast
        toastId={uniqueToastId('multiple')}
        transactions={createTransactions(4, TransactionStatusEnum.pending)}
        toastDataState={createToastDataState(TransactionStatusEnum.pending)}
        transactionProgressState={createProgressState(properties.durationInSeconds)}
        processedTransactionsStatus="Processing 4 transactions"
      />
    </div>
  ),
};

export const FullWidth: StoryObj<TransactionToastStoryArgs> = {
  parameters: withoutProgressControls,
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
