import { h } from '@stencil/core';
import type { Meta, StoryObj } from '@stencil/storybook-plugin';

// The class is named `WalletConnect`, same as the parent panel's, hence the alias.
import type { WalletConnect as WalletConnectDownload } from './wallet-connect-download';

// prettier-ignore
const styles = {
  downloadStoriesWrapper: 'download-stories-wrapper mvx:flex mvx:justify-center mvx:w-full mvx:max-w-md',
} satisfies Record<string, string>;

const storySettings: Meta<WalletConnectDownload> = {
  tags: ['autodocs'],
  title: 'Panels/WalletConnect/Download',
  component: 'mvx-wallet-connect-download',
  parameters: {
    docs: {
      description: {
        component: 'The "get xPortal" screen, reached from the scan screen when the user has no wallet app yet.',
      },
    },
  },
  argTypes: {
    class: { control: 'text' },
  },
};

export const Default: StoryObj<WalletConnectDownload> = {
  render: properties => (
    <div class={styles.downloadStoriesWrapper}>
      <mvx-wallet-connect-download class={properties.class} />
    </div>
  ),
};

export default storySettings;
