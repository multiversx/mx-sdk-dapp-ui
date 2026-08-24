import { h } from '@stencil/core';
import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import {
  createQrCodeSvg,
  EXAMPLE_DEEP_LINK,
} from 'components/functional/wallet-connect/tests/mocks/walletConnectData';

import type { WalletConnectScan } from './wallet-connect-scan';

// prettier-ignore
const styles = {
  scanStoriesWrapper: 'scan-stories-wrapper mvx:flex mvx:justify-center mvx:w-full mvx:max-w-md',
} satisfies Record<string, string>;

const storySettings: Meta<WalletConnectScan> = {
  tags: ['autodocs'],
  title: 'Panels/WalletConnect/Scan',
  component: 'mvx-wallet-connect-scan',
  args: {
    qrCodeSvg: createQrCodeSvg(),
    walletConnectDeepLink: EXAMPLE_DEEP_LINK,
  },
  argTypes: {
    qrCodeSvg: { control: 'text' },
    walletConnectDeepLink: { control: 'text' },
    class: { control: 'text' },
  },
};

export const Default: StoryObj<WalletConnectScan> = {
  render: properties => (
    <div class={styles.scanStoriesWrapper}>
      <mvx-wallet-connect-scan
        qrCodeSvg={properties.qrCodeSvg ?? createQrCodeSvg()}
        walletConnectDeepLink={properties.walletConnectDeepLink}
      />
    </div>
  ),
};

export const WithoutQrCode: StoryObj<WalletConnectScan> = {
  render: () => (
    <div class={styles.scanStoriesWrapper}>
      <mvx-wallet-connect-scan qrCodeSvg="" />
    </div>
  ),
};

export default storySettings;
