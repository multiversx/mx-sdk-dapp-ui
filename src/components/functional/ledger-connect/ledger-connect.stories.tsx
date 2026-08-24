import { h } from '@stencil/core';
import type { Meta, StoryObj } from '@stencil/storybook-plugin';

import type { LedgerConnect } from './ledger-connect';
import {
  createAccountScreenData,
  createConfirmScreenData,
  createConnectScreenData,
  createLedgerPanelData,
} from './tests/mocks/ledgerData';

// prettier-ignore
const styles = {
  ledgerStoriesWrapper: 'ledger-stories-wrapper mvx:flex mvx:justify-center mvx:w-full mvx:h-[700px]',
} satisfies Record<string, string>;

const storySettings: Meta<LedgerConnect> = {
  tags: ['autodocs'],
  title: 'Panels/LedgerConnect',
  component: 'mvx-ledger-connect',
  parameters: {
    docs: {
      description: {
        component:
          'The Ledger connection flow. Which of the three screens shows is decided by whichever of `connectScreenData`, `accountScreenData` and `confirmScreenData` is non-null. It also accepts live updates over `LedgerConnectEventsEnum.DATA_UPDATE`.',
      },
    },
  },
  args: {
    data: createLedgerPanelData(),
  },
  argTypes: {
    data: { control: 'object' },
  },
};

export const IntroScreen: StoryObj<LedgerConnect> = {
  render: properties => (
    <div class={styles.ledgerStoriesWrapper}>
      <mvx-ledger-connect data={properties.data ?? createLedgerPanelData()} />
    </div>
  ),
};

export const IntroScreenError: StoryObj<LedgerConnect> = {
  render: () => (
    <div class={styles.ledgerStoriesWrapper}>
      <mvx-ledger-connect
        data={createLedgerPanelData({
          connectScreenData: createConnectScreenData({
            error: 'Unable to reach the device. Make sure it is unlocked and the MultiversX app is open.',
          }),
        })}
      />
    </div>
  ),
};

export const AccountSelection: StoryObj<LedgerConnect> = {
  render: () => (
    <div class={styles.ledgerStoriesWrapper}>
      <mvx-ledger-connect
        data={createLedgerPanelData({
          connectScreenData: null,
          accountScreenData: createAccountScreenData(),
        })}
      />
    </div>
  ),
};

export const AccountSelectionLoading: StoryObj<LedgerConnect> = {
  render: () => (
    <div class={styles.ledgerStoriesWrapper}>
      <mvx-ledger-connect
        data={createLedgerPanelData({
          connectScreenData: null,
          accountScreenData: createAccountScreenData({ accounts: [], isLoading: true }),
        })}
      />
    </div>
  ),
};

export const ConfirmAddress: StoryObj<LedgerConnect> = {
  render: () => (
    <div class={styles.ledgerStoriesWrapper}>
      <mvx-ledger-connect
        data={createLedgerPanelData({
          connectScreenData: null,
          confirmScreenData: createConfirmScreenData(),
        })}
      />
    </div>
  ),
};

export default storySettings;
