import { h } from '@stencil/core';
import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import {
  createProgressState,
  createToastDataState,
  createTransactions,
  uniqueToastId,
} from 'components/functional/toasts-list/tests/mocks/toasts';
import { TransactionStatusEnum } from 'constants/transactionStatus.enum';

import type { ToastProgress } from './transaction-toast-progress';

// prettier-ignore
const styles = {
  progressStoriesWrapper:
    'progress-stories-wrapper mvx:flex mvx:flex-col mvx:w-full mvx:relative mvx:rounded-xl mvx:overflow-hidden mvx:max-w-100',
} satisfies Record<string, string>;

const renderSlottedContent = (status: `${TransactionStatusEnum}`) => (
  <mvx-transaction-toast-content
    transactions={createTransactions(1, status)}
    toastDataState={createToastDataState(status)}
  />
);

const storySettings: Meta<ToastProgress> = {
  tags: ['autodocs'],
  title: 'Toasts/TransactionToast/Progress',
  component: 'mvx-transaction-toast-progress',
  parameters: {
    docs: {
      description: {
        component:
          '`startTime` and `endTime` are UNIX timestamps in **seconds**, not milliseconds. The component also remembers, in module scope, which toast ids have already finished — so every story uses a freshly generated id, otherwise a revisit renders an already-complete bar.',
      },
    },
  },
  argTypes: {
    startTime: { control: 'number' },
    endTime: { control: 'number' },
    isStatusPending: { control: 'boolean' },
    toastId: { control: 'text' },
  },
};

export const Pending: StoryObj<ToastProgress> = {
  render: () => {
    const { startTime, endTime } = createProgressState(30);

    return (
      <div class={styles.progressStoriesWrapper}>
        <mvx-transaction-toast-progress
          toastId={uniqueToastId('progress-pending')}
          startTime={startTime}
          endTime={endTime}
          isStatusPending={true}
        >
          {renderSlottedContent(TransactionStatusEnum.pending)}
        </mvx-transaction-toast-progress>
      </div>
    );
  },
};

export const CrossShard: StoryObj<ToastProgress> = {
  render: () => {
    const { startTime, endTime } = createProgressState(120, true);

    return (
      <div class={styles.progressStoriesWrapper}>
        <mvx-transaction-toast-progress
          toastId={uniqueToastId('progress-cross-shard')}
          startTime={startTime}
          endTime={endTime}
          isStatusPending={true}
        >
          {renderSlottedContent(TransactionStatusEnum.pending)}
        </mvx-transaction-toast-progress>
      </div>
    );
  },
};

export const Completed: StoryObj<ToastProgress> = {
  render: () => {
    const startTime = Math.floor(Date.now() / 1000) - 120;

    return (
      <div class={styles.progressStoriesWrapper}>
        <mvx-transaction-toast-progress
          toastId={uniqueToastId('progress-completed')}
          startTime={startTime}
          endTime={startTime + 60}
          isStatusPending={false}
        >
          {renderSlottedContent(TransactionStatusEnum.success)}
        </mvx-transaction-toast-progress>
      </div>
    );
  },
};

export const InfiniteProgress: StoryObj<ToastProgress> = {
  render: () => (
    <div class={styles.progressStoriesWrapper}>
      <mvx-transaction-toast-progress toastId={uniqueToastId('progress-infinite')} isStatusPending={true}>
        {renderSlottedContent(TransactionStatusEnum.pending)}
      </mvx-transaction-toast-progress>
    </div>
  ),
};

export default storySettings;
