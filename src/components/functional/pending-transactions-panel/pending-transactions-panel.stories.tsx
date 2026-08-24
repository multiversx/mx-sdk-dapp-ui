import { h } from '@stencil/core';
import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { publishTo } from 'components/functional/toasts-list/tests/mocks/eventBusHarness';
import { ProviderTypeEnum } from 'types/provider.types';

import { PendingTransactionsEventsEnum } from './pending-transactions-panel.types';

// prettier-ignore
const styles = {
  pendingPanelStoriesWrapper: 'pending-panel-stories-wrapper mvx:relative mvx:w-full mvx:h-[700px]',
} satisfies Record<string, string>;

const TAG = 'mvx-pending-transactions-panel';

const openWith = (provider: unknown) => async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  await publishTo(canvasElement, TAG, [[PendingTransactionsEventsEnum.DATA_UPDATE, provider]]);
};

const storySettings: Meta = {
  tags: ['autodocs'],
  title: 'Panels/PendingTransactionsPanel',
  component: TAG,
  parameters: {
    docs: {
      description: {
        component:
          'Shown while the user confirms a transaction inside their provider. The payload is the active provider, which decides the copy and icon.',
      },
    },
  },
  render: () => (
    <div class={styles.pendingPanelStoriesWrapper}>
      <mvx-pending-transactions-panel />
    </div>
  ),
};

export const Ledger: StoryObj = {
  play: openWith({ name: 'Ledger', type: ProviderTypeEnum.ledger }),
};

export const Extension: StoryObj = {
  play: openWith({ name: 'MultiversX DeFi Wallet', type: ProviderTypeEnum.extension }),
};

export const WalletConnect: StoryObj = {
  play: openWith({ name: 'xPortal App', type: ProviderTypeEnum.walletConnect }),
};

export const Passkey: StoryObj = {
  play: openWith({ name: 'Passkey', type: ProviderTypeEnum.passkey }),
};

export default storySettings;
