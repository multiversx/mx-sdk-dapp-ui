import { h } from '@stencil/core';
import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { createConnectScreenData } from 'components/functional/ledger-connect/tests/mocks/ledgerData';

import type { LedgerIntro } from './ledger-intro';

// prettier-ignore
const styles = {
  ledgerIntroStoriesWrapper: 'ledger-intro-stories-wrapper mvx:flex mvx:justify-center mvx:w-full mvx:max-w-md',
} satisfies Record<string, string>;

const storySettings: Meta<LedgerIntro> = {
  tags: ['autodocs'],
  title: 'Panels/LedgerConnect/Intro',
  component: 'mvx-ledger-intro',
  args: {
    connectScreenData: createConnectScreenData(),
    isAwaiting: false,
  },
  argTypes: {
    connectScreenData: { control: 'object' },
    isAwaiting: { control: 'boolean' },
  },
};

export const Default: StoryObj<LedgerIntro> = {
  render: properties => (
    <div class={styles.ledgerIntroStoriesWrapper}>
      <mvx-ledger-intro
        connectScreenData={properties.connectScreenData ?? createConnectScreenData()}
        isAwaiting={properties.isAwaiting}
      />
    </div>
  ),
};

export const Awaiting: StoryObj<LedgerIntro> = {
  render: () => (
    <div class={styles.ledgerIntroStoriesWrapper}>
      <mvx-ledger-intro connectScreenData={createConnectScreenData()} isAwaiting={true} />
    </div>
  ),
};

export const WithError: StoryObj<LedgerIntro> = {
  render: () => (
    <div class={styles.ledgerIntroStoriesWrapper}>
      <mvx-ledger-intro
        connectScreenData={createConnectScreenData({
          error: 'Unable to reach the device. Make sure it is unlocked and the MultiversX app is open.',
        })}
      />
    </div>
  ),
};

export const Disabled: StoryObj<LedgerIntro> = {
  render: () => (
    <div class={styles.ledgerIntroStoriesWrapper}>
      <mvx-ledger-intro connectScreenData={createConnectScreenData({ disabled: true })} />
    </div>
  ),
};

export default storySettings;
