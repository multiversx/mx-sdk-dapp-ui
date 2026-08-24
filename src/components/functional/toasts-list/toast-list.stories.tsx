import { h } from '@stencil/core';
import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TransactionStatusEnum } from 'constants/transactionStatus.enum';

import { publishTo } from './tests/mocks/eventBusHarness';
import {
  createComponentToast,
  createProgressState,
  createSimpleToast,
  createToastDataState,
  createTransactions,
  createTransactionToast,
  uniqueToastId,
} from './tests/mocks/toasts';
import { ToastEventsEnum } from './toast-list.types';

// prettier-ignore
const styles = {
  toastListStoriesWrapper: 'toast-list-stories-wrapper mvx:relative mvx:w-full mvx:h-[600px]',
} satisfies Record<string, string>;

const TAG = 'mvx-toast-list';

const withToasts = (events: [string, unknown?][]) => async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  await publishTo(canvasElement, TAG, events);
};

const pendingToast = () =>
  createTransactionToast({
    toastId: uniqueToastId('pending'),
    transactions: createTransactions(1, TransactionStatusEnum.pending),
    toastDataState: createToastDataState(TransactionStatusEnum.pending),
    transactionProgressState: createProgressState(60),
    processedTransactionsStatus: 'Processing transaction',
  });

const storySettings: Meta = {
  tags: ['autodocs'],
  title: 'Toasts/ToastList',
  component: TAG,
  parameters: {
    docs: {
      description: {
        component:
          'The toast container. It takes no props: `sdk-dapp` calls `getEventBus()` and publishes toast arrays over the bus. These stories drive it the same way from a `play` function.',
      },
    },
  },
  render: () => (
    <div class={styles.toastListStoriesWrapper}>
      <mvx-toast-list />
    </div>
  ),
};

export const TransactionToasts: StoryObj = {
  play: withToasts([
    [
      ToastEventsEnum.TRANSACTION_TOAST_DATA_UPDATE,
      [createTransactionToast({ toastId: uniqueToastId('success') }), pendingToast()],
    ],
  ]),
};

export const CustomToasts: StoryObj = {
  play: withToasts([
    [
      ToastEventsEnum.CUSTOM_TOAST_DATA_UPDATE,
      [
        createSimpleToast({ title: 'Copied to clipboard', message: 'The address is now in your clipboard.' }),
        createComponentToast(),
      ],
    ],
  ]),
};

export const TransactionAndCustomToasts: StoryObj = {
  play: withToasts([
    [ToastEventsEnum.TRANSACTION_TOAST_DATA_UPDATE, [createTransactionToast(), pendingToast()]],
    [ToastEventsEnum.CUSTOM_TOAST_DATA_UPDATE, [createSimpleToast()]],
  ]),
};

export const ManyToasts: StoryObj = {
  parameters: {
    docs: {
      description: {
        story: 'Enough toasts to show the minimize control and the "View All" link.',
      },
    },
  },
  play: withToasts([
    [
      ToastEventsEnum.TRANSACTION_TOAST_DATA_UPDATE,
      Array.from({ length: 5 }, () => createTransactionToast({ toastId: uniqueToastId('bulk') })),
    ],
  ]),
};

export const Hidden: StoryObj = {
  parameters: {
    docs: {
      description: {
        story: 'The list is populated and then hidden with `HIDE_TOAST_LIST`, so it renders nothing.',
      },
    },
  },
  play: withToasts([
    [ToastEventsEnum.TRANSACTION_TOAST_DATA_UPDATE, [createTransactionToast()]],
    [ToastEventsEnum.HIDE],
  ]),
};

export default storySettings;
