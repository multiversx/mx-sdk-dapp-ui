import { h } from '@stencil/core';
import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { publishTo } from 'components/functional/toasts-list/tests/mocks/eventBusHarness';

import { SignEventsEnum } from './sign-transactions-panel.types';
import {
  createCommonData,
  createEgldTransferData,
  createNftTransferData,
  createSignPanelData,
} from './tests/mocks/signPanelData';

// prettier-ignore
const styles = {
  signPanelStoriesWrapper: 'sign-panel-stories-wrapper mvx:relative mvx:w-full mvx:h-[700px]',
} satisfies Record<string, string>;

const TAG = 'mvx-sign-transactions-panel';

const openWith = (data: unknown) => async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  await publishTo(canvasElement, TAG, [[SignEventsEnum.DATA_UPDATE, data]]);
};

const storySettings: Meta = {
  tags: ['autodocs'],
  title: 'Panels/SignTransactionsPanel',
  component: TAG,
  parameters: {
    docs: {
      description: {
        component:
          'The transaction confirmation panel. `sdk-dapp` publishes `DATA_UPDATE_SIGN_TRANSACTIONS` with the fully prepared transaction data, which also opens the panel.',
      },
    },
  },
  render: () => (
    <div class={styles.signPanelStoriesWrapper}>
      <mvx-sign-transactions-panel />
    </div>
  ),
};

export const TokenTransfer: StoryObj = {
  play: openWith(createSignPanelData()),
};

export const EgldTransfer: StoryObj = {
  play: openWith(createEgldTransferData()),
};

export const NftTransfer: StoryObj = {
  play: openWith(createNftTransferData()),
};

export const BatchOfTransactions: StoryObj = {
  parameters: {
    docs: {
      description: {
        story: 'Signing the second of five transactions, which shows the batch position and the next-step action.',
      },
    },
  },
  play: openWith(
    createSignPanelData({
      commonData: createCommonData({
        transactionsCount: 5,
        currentIndex: 1,
        currentIndexToSign: 1,
        nextUnsignedTxIndex: 2,
      }),
    }),
  ),
};

export const Loading: StoryObj = {
  play: openWith(createSignPanelData({ isLoading: true })),
};

export const NotEditable: StoryObj = {
  parameters: {
    docs: {
      description: {
        story: 'Providers that sign server-side present the fee as read-only.',
      },
    },
  },
  play: openWith(
    createSignPanelData({
      commonData: createCommonData({ isEditable: false, providerName: 'Ledger' }),
    }),
  ),
};

export default storySettings;
