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

/**
 * `startTime`/`endTime` are always derived from "now", so a raw epoch control
 * would be unusable. The duration is the knob that matters.
 */
type ProgressStoryArgs = ToastProgress & { durationInSeconds: number };

const renderSlottedContent = (status: `${TransactionStatusEnum}`) => (
  <mvx-transaction-toast-content
    transactions={createTransactions(1, status)}
    toastDataState={createToastDataState(status)}
  />
);

const renderProgress = (args: ProgressStoryArgs, options: { idPrefix: string; status: `${TransactionStatusEnum}` }) => {
  const { startTime, endTime } = createProgressState(args.durationInSeconds);

  return (
    <div class={styles.progressStoriesWrapper}>
      <mvx-transaction-toast-progress
        // A fresh id per render: the component remembers finished ids in module
        // scope, so a reused one would replay as an already-complete bar every
        // time the duration control changes.
        toastId={uniqueToastId(options.idPrefix)}
        startTime={startTime}
        endTime={endTime}
        isStatusPending={args.isStatusPending}
        fullWidth={args.fullWidth}
      >
        {renderSlottedContent(options.status)}
      </mvx-transaction-toast-progress>
    </div>
  );
};

const storySettings: Meta<ProgressStoryArgs> = {
  tags: ['autodocs'],
  title: 'Toasts/TransactionToast/Progress',
  component: 'mvx-transaction-toast-progress',
  parameters: {
    docs: {
      description: {
        component:
          '`startTime` and `endTime` are UNIX timestamps in **milliseconds**, so that sub-second rounds stay expressible. Second-based timestamps are still accepted and normalized. Set `durationInSeconds` to watch any round length — `0.6` is one block, the shortest a transaction can take, and the component floors anything shorter at that. Each render generates a fresh `toastId`, because the component remembers finished ids in module scope.',
      },
    },
  },
  args: {
    durationInSeconds: 30,
    isStatusPending: true,
    fullWidth: false,
  },
  argTypes: {
    durationInSeconds: {
      control: { type: 'number', min: 0.6, step: 0.1 },
      description:
        'Round length in seconds, floored at 0.6 — one block, the shortest a transaction can take. `startTime`/`endTime` are derived from it.',
    },
    isStatusPending: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
};

export const Pending: StoryObj<ProgressStoryArgs> = {
  render: args => renderProgress(args, { idPrefix: 'progress-pending', status: TransactionStatusEnum.pending }),
};

export const CrossShard: StoryObj<ProgressStoryArgs> = {
  args: { durationInSeconds: 120 },
  render: args => renderProgress(args, { idPrefix: 'progress-cross-shard', status: TransactionStatusEnum.pending }),
};

/** One block: the floor, and the fastest bar the component will ever render. */
export const SingleBlock: StoryObj<ProgressStoryArgs> = {
  args: { durationInSeconds: 0.6 },
  render: args => renderProgress(args, { idPrefix: 'progress-single-block', status: TransactionStatusEnum.pending }),
};

export const Completed: StoryObj<ProgressStoryArgs> = {
  args: { durationInSeconds: 60, isStatusPending: false },
  render: args => {
    const durationMs = args.durationInSeconds * 1000;
    // Finished a full duration ago, so the bar renders in its settled state.
    const endTime = Date.now() - durationMs;

    return (
      <div class={styles.progressStoriesWrapper}>
        <mvx-transaction-toast-progress
          toastId={uniqueToastId('progress-completed')}
          startTime={endTime - durationMs}
          endTime={endTime}
          isStatusPending={args.isStatusPending}
          fullWidth={args.fullWidth}
        >
          {renderSlottedContent(TransactionStatusEnum.success)}
        </mvx-transaction-toast-progress>
      </div>
    );
  },
};

export const InfiniteProgress: StoryObj<ProgressStoryArgs> = {
  // No timestamps at all, so the duration knob has nothing to drive here.
  parameters: { controls: { exclude: ['durationInSeconds'] } },
  render: args => (
    <div class={styles.progressStoriesWrapper}>
      <mvx-transaction-toast-progress
        toastId={uniqueToastId('progress-infinite')}
        isStatusPending={args.isStatusPending}
        fullWidth={args.fullWidth}
      >
        {renderSlottedContent(TransactionStatusEnum.pending)}
      </mvx-transaction-toast-progress>
    </div>
  ),
};

export default storySettings;
