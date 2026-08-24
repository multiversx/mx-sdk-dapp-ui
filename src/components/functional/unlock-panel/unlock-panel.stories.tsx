import { h } from '@stencil/core';
import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { publishTo } from 'components/functional/toasts-list/tests/mocks/eventBusHarness';
import type { IProviderBase } from 'types/provider.types';
import { ProviderTypeEnum } from 'types/provider.types';

import { UnlockPanelEventsEnum } from './unlock-panel.types';

// prettier-ignore
const styles = {
  unlockPanelStoriesWrapper: 'unlock-panel-stories-wrapper mvx:relative mvx:w-full mvx:h-[700px]',
} satisfies Record<string, string>;

const TAG = 'mvx-unlock-panel';

const providers: IProviderBase[] = [
  { name: 'MultiversX Wallet', type: ProviderTypeEnum.crossWindow },
  { name: 'MultiversX DeFi Wallet', type: ProviderTypeEnum.extension },
  { name: 'xPortal App', type: ProviderTypeEnum.walletConnect },
  { name: 'Ledger', type: ProviderTypeEnum.ledger },
  { name: 'MetaMask', type: ProviderTypeEnum.metamask },
  { name: 'Passkey', type: ProviderTypeEnum.passkey },
];

const openWith = (events: [string, unknown?][]) => async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  await publishTo(canvasElement, TAG, events);
};

const storySettings: Meta = {
  tags: ['autodocs'],
  title: 'Panels/UnlockPanel',
  component: TAG,
  parameters: {
    docs: {
      description: {
        component:
          'The login panel. It takes no data props — `sdk-dapp` opens it by publishing `UnlockPanelEventsEnum.OPEN` with the list of allowed providers.',
      },
    },
  },
  render: () => (
    <div class={styles.unlockPanelStoriesWrapper}>
      <mvx-unlock-panel />
    </div>
  ),
};

export const AllProviders: StoryObj = {
  play: openWith([[UnlockPanelEventsEnum.OPEN, { providers, walletAddress: null }]]),
};

export const SingleProvider: StoryObj = {
  play: openWith([[UnlockPanelEventsEnum.OPEN, { providers: [providers[0]], walletAddress: null }]]),
};

export const WithWalletAddress: StoryObj = {
  parameters: {
    docs: {
      description: {
        story: 'A configured wallet address enables the web-wallet entry point.',
      },
    },
  },
  play: openWith([
    [
      UnlockPanelEventsEnum.OPEN,
      { providers, walletAddress: 'https://devnet-wallet.multiversx.com' },
    ],
  ]),
};

export default storySettings;
