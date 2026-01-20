import { h } from '@stencil/core';
import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import classNames from 'classnames';

import type { DataWithExplorerLink } from './data-with-explorer-link';

const DEVNET_EXPLORER_URL = 'https://devnet-explorer.multiversx.com';

// prettier-ignore
const styles = {
  dataWithExplorerLinkStoriesWrapper: 'data-with-explorer-link-stories-wrapper mvx:flex mvx:flex-col mvx:flex-wrap mvx:gap-6',
  dataWithExplorerLinkStoriesGrid: 'data-with-explorer-link-stories-grid mvx:flex mvx:gap-4 mvx:flex-wrap mvx:items-center',
  dataWithExplorerLinkStoriesContainer: 'data-with-explorer-link-stories-container mvx:rounded',
  dataWithExplorerLinkStoriesNarrow: 'data-with-explorer-link-stories-narrow mvx:w-48',
  dataWithExplorerLinkStoriesMedium: 'data-with-explorer-link-stories-medium mvx:w-64',
  dataWithExplorerLinkStoriesWide: 'data-with-explorer-link-stories-wide mvx:w-80',
  dataWithExplorerLinkStoriesExtraWide: 'data-with-explorer-link-stories-extra-wide mvx:w-96',
  dataWithExplorerLinkStoriesSmallFont: 'data-with-explorer-link-stories-small-font mvx:text-sm',
  dataWithExplorerLinkStoriesLargeFont: 'data-with-explorer-link-stories-large-font mvx:text-lg',
  dataWithExplorerLinkStoriesMonospace: 'data-with-explorer-link-stories-monospace mvx:font-mono',
  dataWithExplorerLinkStoriesBlue: 'data-with-explorer-link-stories-blue mvx:text-blue-600',
  dataWithExplorerLinkStoriesGreen: 'data-with-explorer-link-stories-green mvx:text-green-600',
  dataWithExplorerLinkStoriesRed: 'data-with-explorer-link-stories-red mvx:text-red-600',
} satisfies Record<string, string>;

const storySettings: Meta<DataWithExplorerLink> = {
  tags: ['autodocs'],
  title: 'Components/DataWithExplorerLink',
  args: {
    data: 'erd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th',
    explorerLink: `${DEVNET_EXPLORER_URL}/accounts/erd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th`,
    showCopyButton: true,
    showExplorerButton: true,
    withTooltip: false,
  },
  argTypes: {
    data: { control: 'text' },
    explorerLink: { control: 'text' },
    showCopyButton: { control: 'boolean' },
    showExplorerButton: { control: 'boolean' },
    withTooltip: { control: 'boolean' },
    class: { control: 'text' },
    'data-testid': { control: 'text' },
  },
};

export const Default: StoryObj<DataWithExplorerLink> = {
  render: properties => (
    <div class={styles.dataWithExplorerLinkStoriesWrapper}>
      <mvx-data-with-explorer-link {...properties} />
    </div>
  ),
};

const buttonVisibilityScenarios = [
  { label: 'Both Buttons (Default)', showCopyButton: true, showExplorerButton: true },
  { label: 'Copy Button Only', showCopyButton: true, showExplorerButton: false },
  { label: 'Explorer Button Only', showCopyButton: false, showExplorerButton: true },
  { label: 'No Buttons (Text Only)', showCopyButton: false, showExplorerButton: false },
];

export const ButtonVisibility: StoryObj<DataWithExplorerLink> = {
  render: () => (
    <div class={styles.dataWithExplorerLinkStoriesWrapper}>
      {buttonVisibilityScenarios.map(scenario => (
        <div class={styles.dataWithExplorerLinkStoriesContainer}>
          <strong>{scenario.label}:</strong>
          <mvx-data-with-explorer-link
            data="erd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th"
            explorerLink={`${DEVNET_EXPLORER_URL}/accounts/erd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th`}
            showCopyButton={scenario.showCopyButton}
            showExplorerButton={scenario.showExplorerButton}
          />
        </div>
      ))}
    </div>
  ),
};

const tooltipScenarios = [
  { label: 'Without Tooltips', withTooltip: false },
  { label: 'With Tooltips', withTooltip: true },
  { label: 'Tooltips with Copy Only', withTooltip: true, showCopyButton: true, showExplorerButton: false },
  { label: 'Tooltips with Explorer Only', withTooltip: true, showCopyButton: false, showExplorerButton: true },
];

export const WithTooltips: StoryObj<DataWithExplorerLink> = {
  render: () => (
    <div class={styles.dataWithExplorerLinkStoriesWrapper}>
      {tooltipScenarios.map(scenario => (
        <div class={styles.dataWithExplorerLinkStoriesContainer}>
          <strong>{scenario.label}:</strong>
          <mvx-data-with-explorer-link
            data="erd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th"
            explorerLink={`${DEVNET_EXPLORER_URL}/accounts/erd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th`}
            withTooltip={scenario.withTooltip}
            showCopyButton={scenario.showCopyButton}
            showExplorerButton={scenario.showExplorerButton}
          />
        </div>
      ))}
    </div>
  ),
};

const containerWidthScenarios = [
  { label: 'Narrow Container', className: styles.dataWithExplorerLinkStoriesNarrow },
  { label: 'Medium Container', className: styles.dataWithExplorerLinkStoriesMedium },
  { label: 'Wide Container', className: styles.dataWithExplorerLinkStoriesWide },
  { label: 'Extra Wide Container', className: styles.dataWithExplorerLinkStoriesExtraWide },
];

export const ContainerWidths: StoryObj<DataWithExplorerLink> = {
  render: () => (
    <div class={styles.dataWithExplorerLinkStoriesWrapper}>
      {containerWidthScenarios.map(scenario => (
        <div class={classNames(styles.dataWithExplorerLinkStoriesContainer, scenario.className)}>
          <strong>{scenario.label}:</strong>
          <mvx-data-with-explorer-link
            data="erd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th"
            explorerLink={`${DEVNET_EXPLORER_URL}/accounts/erd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th`}
          />
        </div>
      ))}
    </div>
  ),
};

export const DataTypes: StoryObj<DataWithExplorerLink> = {
  render: () => (
    <div class={styles.dataWithExplorerLinkStoriesWrapper}>
      <div class={styles.dataWithExplorerLinkStoriesContainer}>
        <strong>Wallet Address:</strong>
        <mvx-data-with-explorer-link
          data="erd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th"
          explorerLink={`${DEVNET_EXPLORER_URL}/accounts/erd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th`}
          class={styles.dataWithExplorerLinkStoriesMonospace}
        />
      </div>

      <div class={styles.dataWithExplorerLinkStoriesContainer}>
        <strong>Transaction Hash:</strong>
        <mvx-data-with-explorer-link
          data="9f4d2a5b8c1e7d3f6a9b2e8c5f1a4d7b0e3c6f9a2d5b8e1c4f7a0d3b6e9c2f5a8b1e4d7f0c3a6"
          explorerLink={`${DEVNET_EXPLORER_URL}/transactions/9f4d2a5b8c1e7d3f6a9b2e8c5f1a4d7b0e3c6f9a2d5b8e1c4f7a0d3b6e9c2f5a8b1e4d7f0c3a6`}
          class={styles.dataWithExplorerLinkStoriesMonospace}
        />
      </div>

      <div class={styles.dataWithExplorerLinkStoriesContainer}>
        <strong>Smart Contract Address:</strong>
        <mvx-data-with-explorer-link
          data="erd1qqqqqqqqqqqqqpgqzqvm5ywqqf524efwrhr039tjs29w0qltkklsa05pk7"
          explorerLink={`${DEVNET_EXPLORER_URL}/accounts/erd1qqqqqqqqqqqqqpgqzqvm5ywqqf524efwrhr039tjs29w0qltkklsa05pk7`}
          class={styles.dataWithExplorerLinkStoriesMonospace}
        />
      </div>

      <div class={styles.dataWithExplorerLinkStoriesContainer}>
        <strong>Block Hash:</strong>
        <mvx-data-with-explorer-link
          data="a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456"
          explorerLink={`${DEVNET_EXPLORER_URL}/blocks/a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456`}
          class={styles.dataWithExplorerLinkStoriesMonospace}
        />
      </div>

      <div class={styles.dataWithExplorerLinkStoriesContainer}>
        <strong>NFT Identifier:</strong>
        <mvx-data-with-explorer-link
          data="MULTIVERSXPUNKS-114fa5-01"
          explorerLink={`${DEVNET_EXPLORER_URL}/nfts/MULTIVERSXPUNKS-114fa5-01`}
          class={styles.dataWithExplorerLinkStoriesMonospace}
        />
      </div>

      <div class={styles.dataWithExplorerLinkStoriesContainer}>
        <strong>Token Identifier:</strong>
        <mvx-data-with-explorer-link
          data="USDC-c76f1f"
          explorerLink={`${DEVNET_EXPLORER_URL}/tokens/USDC-c76f1f`}
          class={styles.dataWithExplorerLinkStoriesMonospace}
        />
      </div>

      <div class={styles.dataWithExplorerLinkStoriesContainer}>
        <strong>Username/Herotag:</strong>
        <mvx-data-with-explorer-link
          data="multiversx.super.long.domain.name.example.herotag"
          explorerLink={`${DEVNET_EXPLORER_URL}/accounts/multiversx.super.long.domain.name.example.herotag`}
        />
      </div>
    </div>
  ),
};

export const TextLengths: StoryObj<DataWithExplorerLink> = {
  render: () => (
    <div class={styles.dataWithExplorerLinkStoriesWrapper}>
      <div class={classNames(styles.dataWithExplorerLinkStoriesContainer, styles.dataWithExplorerLinkStoriesMedium)}>
        <strong>Short Data:</strong>
        <mvx-data-with-explorer-link data="EGLD" explorerLink={`${DEVNET_EXPLORER_URL}/tokens/EGLD`} />
      </div>

      <div class={classNames(styles.dataWithExplorerLinkStoriesContainer, styles.dataWithExplorerLinkStoriesMedium)}>
        <strong>Medium Data:</strong>
        <mvx-data-with-explorer-link data="USDC-c76f1f" explorerLink={`${DEVNET_EXPLORER_URL}/tokens/USDC-c76f1f`} />
      </div>

      <div class={classNames(styles.dataWithExplorerLinkStoriesContainer, styles.dataWithExplorerLinkStoriesMedium)}>
        <strong>Long Data:</strong>
        <mvx-data-with-explorer-link
          data="erd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th"
          explorerLink={`${DEVNET_EXPLORER_URL}/accounts/erd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th`}
          class={styles.dataWithExplorerLinkStoriesMonospace}
        />
      </div>

      <div class={classNames(styles.dataWithExplorerLinkStoriesContainer, styles.dataWithExplorerLinkStoriesMedium)}>
        <strong>Extra Long Data:</strong>
        <mvx-data-with-explorer-link
          data="9f4d2a5b8c1e7d3f6a9b2e8c5f1a4d7b0e3c6f9a2d5b8e1c4f7a0d3b6e9c2f5a8b1e4d7f0c3a6789abcdef"
          explorerLink={`${DEVNET_EXPLORER_URL}/transactions/9f4d2a5b8c1e7d3f6a9b2e8c5f1a4d7b0e3c6f9a2d5b8e1c4f7a0d3b6e9c2f5a8b1e4d7f0c3a6789abcdef`}
          class={styles.dataWithExplorerLinkStoriesMonospace}
        />
      </div>

      <div class={classNames(styles.dataWithExplorerLinkStoriesContainer, styles.dataWithExplorerLinkStoriesMedium)}>
        <strong>Single Character:</strong>
        <mvx-data-with-explorer-link data="X" explorerLink={`${DEVNET_EXPLORER_URL}/search/X`} />
      </div>
    </div>
  ),
};

const styledVariants = [
  { label: 'Small Font', class: styles.dataWithExplorerLinkStoriesSmallFont },
  { label: 'Large Font', class: styles.dataWithExplorerLinkStoriesLargeFont },
  { label: 'Blue Text', class: styles.dataWithExplorerLinkStoriesBlue },
  { label: 'Green Text', class: styles.dataWithExplorerLinkStoriesGreen },
  { label: 'Red Text', class: styles.dataWithExplorerLinkStoriesRed },
];

export const StyledVariants: StoryObj<DataWithExplorerLink> = {
  render: () => (
    <div class={styles.dataWithExplorerLinkStoriesWrapper}>
      {styledVariants.map(variant => (
        <div class={styles.dataWithExplorerLinkStoriesContainer}>
          <strong>{variant.label}:</strong>
          <mvx-data-with-explorer-link
            data="erd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th"
            explorerLink={`${DEVNET_EXPLORER_URL}/accounts/erd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th`}
            class={variant.class}
          />
        </div>
      ))}
    </div>
  ),
};

export const EdgeCases: StoryObj<DataWithExplorerLink> = {
  render: () => (
    <div class={styles.dataWithExplorerLinkStoriesWrapper}>
      <div class={classNames(styles.dataWithExplorerLinkStoriesContainer, styles.dataWithExplorerLinkStoriesNarrow)}>
        <strong>Empty Explorer Link:</strong>
        <mvx-data-with-explorer-link
          data="erd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th"
          explorerLink=""
          showExplorerButton={true}
        />
      </div>

      <div class={classNames(styles.dataWithExplorerLinkStoriesContainer, styles.dataWithExplorerLinkStoriesNarrow)}>
        <strong>Numbers Only:</strong>
        <mvx-data-with-explorer-link
          data="1234567890123456789012345678901234567890"
          explorerLink={`${DEVNET_EXPLORER_URL}/search/1234567890123456789012345678901234567890`}
          class={styles.dataWithExplorerLinkStoriesMonospace}
        />
      </div>

      <div class={classNames(styles.dataWithExplorerLinkStoriesContainer, styles.dataWithExplorerLinkStoriesNarrow)}>
        <strong>Special Characters:</strong>
        <mvx-data-with-explorer-link
          data="!@#$%^&*()_+-=[]{}|;:,.<>?/~`"
          explorerLink={`${DEVNET_EXPLORER_URL}/search/special`}
        />
      </div>

      <div class={classNames(styles.dataWithExplorerLinkStoriesContainer, styles.dataWithExplorerLinkStoriesNarrow)}>
        <strong>Unicode/Emoji:</strong>
        <mvx-data-with-explorer-link data="🚀🌟💎⚡🔥🌈✨💫🎯🎨" explorerLink={`${DEVNET_EXPLORER_URL}/search/emoji`} />
      </div>

      <div class={classNames(styles.dataWithExplorerLinkStoriesContainer, styles.dataWithExplorerLinkStoriesNarrow)}>
        <strong>Mixed Case:</strong>
        <mvx-data-with-explorer-link
          data="ErD1QyU5wThLdZr8Wx5C9uCg8KjAgG0jFs53S8nR3zPz3hYpEfSdD8sSyCr6tH"
          explorerLink={`${DEVNET_EXPLORER_URL}/accounts/erd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th`}
          class={styles.dataWithExplorerLinkStoriesMonospace}
        />
      </div>
    </div>
  ),
};

export const InteractiveScenarios: StoryObj<DataWithExplorerLink> = {
  render: () => (
    <div class={styles.dataWithExplorerLinkStoriesWrapper}>
      <div class={styles.dataWithExplorerLinkStoriesContainer}>
        <strong>Transaction with Tooltips:</strong>
        <mvx-data-with-explorer-link
          data="a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456"
          explorerLink={`${DEVNET_EXPLORER_URL}/transactions/a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456`}
          withTooltip={true}
          data-testid="transaction-with-tooltips"
          class={styles.dataWithExplorerLinkStoriesMonospace}
        />
      </div>

      <div class={styles.dataWithExplorerLinkStoriesContainer}>
        <strong>Account with Copy Only + Tooltip:</strong>
        <mvx-data-with-explorer-link
          data="erd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th"
          explorerLink={`${DEVNET_EXPLORER_URL}/accounts/erd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th`}
          withTooltip={true}
          showCopyButton={true}
          showExplorerButton={false}
          data-testid="account-copy-tooltip"
          class={styles.dataWithExplorerLinkStoriesMonospace}
        />
      </div>

      <div class={styles.dataWithExplorerLinkStoriesContainer}>
        <strong>Token with Explorer Only + Tooltip:</strong>
        <mvx-data-with-explorer-link
          data="WEGLD-bd4d79"
          explorerLink={`${DEVNET_EXPLORER_URL}/tokens/WEGLD-bd4d79`}
          withTooltip={true}
          showCopyButton={false}
          showExplorerButton={true}
          data-testid="token-explorer-tooltip"
        />
      </div>

      <div class={styles.dataWithExplorerLinkStoriesContainer}>
        <strong>NFT Collection (All Features):</strong>
        <mvx-data-with-explorer-link
          data="MULTIVERSXPUNKS-114fa5-0a1b2c"
          explorerLink={`${DEVNET_EXPLORER_URL}/nfts/MULTIVERSXPUNKS-114fa5-0a1b2c`}
          withTooltip={true}
          showCopyButton={true}
          showExplorerButton={true}
          data-testid="nft-all-features"
          class={classNames(styles.dataWithExplorerLinkStoriesMonospace, styles.dataWithExplorerLinkStoriesBlue)}
        />
      </div>
    </div>
  ),
};

const responsiveLayouts = [
  { label: 'Mobile Size', className: styles.dataWithExplorerLinkStoriesNarrow },
  { label: 'Tablet Size', className: styles.dataWithExplorerLinkStoriesMedium },
  { label: 'Desktop Size', className: styles.dataWithExplorerLinkStoriesWide },
  { label: 'Large Desktop', className: styles.dataWithExplorerLinkStoriesExtraWide },
];

export const ResponsiveLayouts: StoryObj<DataWithExplorerLink> = {
  render: () => (
    <div class={styles.dataWithExplorerLinkStoriesWrapper}>
      {responsiveLayouts.map(layout => (
        <div class={classNames(styles.dataWithExplorerLinkStoriesContainer, layout.className)}>
          <strong>{layout.label}:</strong>
          <mvx-data-with-explorer-link
            data="erd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th"
            explorerLink={`${DEVNET_EXPLORER_URL}/accounts/erd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th`}
          />
        </div>
      ))}
    </div>
  ),
};

export default storySettings;
