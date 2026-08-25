import { h } from '@stencil/core';
import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { publishTo } from 'components/functional/toasts-list/tests/mocks/eventBusHarness';
import {
  createProgressState,
  createToastDataState,
  createTransactions,
  createTransactionToast,
  uniqueToastId,
} from 'components/functional/toasts-list/tests/mocks/toasts';
import { TransactionStatusEnum } from 'constants/transactionStatus.enum';

import { NotificationsFeedEventsEnum } from './notifications-feed.types';

// prettier-ignore
const styles = {
  notificationsFeedStoriesWrapper: 'notifications-feed-stories-wrapper mvx:relative mvx:w-full mvx:h-[700px]',
} satisfies Record<string, string>;

const TAG = 'mvx-notifications-feed';

const openWith =
  (events: [string, unknown?][]) =>
  async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    await publishTo(canvasElement, TAG, [...events, [NotificationsFeedEventsEnum.OPEN]]);
  };

const pendingToast = () =>
  createTransactionToast({
    toastId: uniqueToastId('feed-pending'),
    transactions: createTransactions(1, TransactionStatusEnum.pending),
    toastDataState: createToastDataState(TransactionStatusEnum.pending),
    transactionProgressState: createProgressState(3),
    processedTransactionsStatus: 'Processing transaction',
  });

const failedToast = () =>
  createTransactionToast({
    toastId: uniqueToastId('feed-failed'),
    transactions: createTransactions(1, TransactionStatusEnum.fail),
    toastDataState: createToastDataState(TransactionStatusEnum.fail),
    processedTransactionsStatus: 'Transaction failed',
  });

/** Activity list where one of the entries failed, so both statuses are rendered side by side. */
const historyWithFailure = (count: number) =>
  createTransactions(count).map((transaction, index) =>
    index === 2 ? { ...transaction, status: TransactionStatusEnum.fail } : transaction,
  );

const storySettings: Meta = {
  tags: ['autodocs'],
  title: 'Panels/NotificationsFeed',
  component: TAG,
  parameters: {
    docs: {
      description: {
        component:
          'The notifications side panel, showing pending transactions above transaction history. Both lists arrive over the event bus, and the panel is opened with `OPEN_NOTIFICATIONS_FEED`.',
      },
    },
  },
  render: () => (
    <div class={styles.notificationsFeedStoriesWrapper}>
      <mvx-notifications-feed />
    </div>
  ),
};

export const PendingAndHistory: StoryObj = {
  play: openWith([
    [NotificationsFeedEventsEnum.PENDING_TRANSACTIONS_UPDATE, [pendingToast(), failedToast()]],
    [NotificationsFeedEventsEnum.TRANSACTIONS_HISTORY_UPDATE, historyWithFailure(6)],
  ]),
};

export const HistoryOnly: StoryObj = {
  play: openWith([[NotificationsFeedEventsEnum.TRANSACTIONS_HISTORY_UPDATE, historyWithFailure(8)]]),
};

export const PendingOnly: StoryObj = {
  play: openWith([[NotificationsFeedEventsEnum.PENDING_TRANSACTIONS_UPDATE, [pendingToast(), pendingToast()]]]),
};

export const EmptyFeed: StoryObj = {
  play: openWith([
    [NotificationsFeedEventsEnum.PENDING_TRANSACTIONS_UPDATE, []],
    [NotificationsFeedEventsEnum.TRANSACTIONS_HISTORY_UPDATE, []],
  ]),
};

export default storySettings;
