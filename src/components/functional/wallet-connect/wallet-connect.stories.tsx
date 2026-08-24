import { h } from '@stencil/core';
import type { Meta, StoryObj } from '@stencil/storybook-plugin';

import { createQrCodeSvg, EXAMPLE_WC_URI } from './tests/mocks/walletConnectData';
import type { WalletConnect } from './wallet-connect';

// prettier-ignore
const styles = {
  walletConnectStoriesWrapper: 'wallet-connect-stories-wrapper mvx:flex mvx:justify-center mvx:w-full mvx:h-[700px]',
} satisfies Record<string, string>;

const storySettings: Meta<WalletConnect> = {
  tags: ['autodocs'],
  title: 'Panels/WalletConnect',
  component: 'mvx-wallet-connect',
  parameters: {
    docs: {
      description: {
        component:
          'The xPortal / WalletConnect flow. `qrCodeSvg` is raw SVG markup produced by `sdk-dapp` from the `wcURI` and injected with `innerHTML`.',
      },
    },
  },
  args: {
    data: { wcURI: EXAMPLE_WC_URI },
    qrCodeSvg: createQrCodeSvg(),
  },
  argTypes: {
    data: { control: 'object' },
    qrCodeSvg: { control: 'text' },
  },
};

export const ScanScreen: StoryObj<WalletConnect> = {
  render: properties => (
    <div class={styles.walletConnectStoriesWrapper}>
      <mvx-wallet-connect
        data={properties.data ?? { wcURI: EXAMPLE_WC_URI }}
        qrCodeSvg={properties.qrCodeSvg ?? createQrCodeSvg()}
      />
    </div>
  ),
};

export const AwaitingQrCode: StoryObj<WalletConnect> = {
  parameters: {
    docs: {
      description: {
        story: 'Before the URI resolves there is no QR code yet, so the connect action stays disabled.',
      },
    },
  },
  render: () => (
    <div class={styles.walletConnectStoriesWrapper}>
      <mvx-wallet-connect data={{ wcURI: '' }} qrCodeSvg="" />
    </div>
  ),
};

export default storySettings;
