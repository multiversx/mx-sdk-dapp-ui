import { h } from '@stencil/core';
import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import classNames from 'classnames';

import type { Trim } from './trim';

// prettier-ignore
const styles = {
  trimStoriesWrapper: 'trim-stories-wrapper mvx:flex mvx:flex-col mvx:flex-wrap mvx:gap-6',
  trimStoriesGrid: 'trim-stories-grid mvx:flex mvx:gap-4 mvx:flex-wrap mvx:items-center',
  trimStoriesContainer: 'trim-stories-container mvx:rounded',
  trimStoriesNarrow: 'trim-stories-narrow mvx:w-40',
  trimStoriesMedium: 'trim-stories-medium mvx:w-48',
  trimStoriesWide: 'trim-stories-wide mvx:w-80',
  trimStoriesExtraWide: 'trim-stories-extra-wide mvx:w-96',
  trimStoriesSmallFont: 'trim-stories-small-font mvx:text-sm',
  trimStoriesLargeFont: 'trim-stories-large-font mvx:text-lg',
  trimStoriesExtraLargeFont: 'trim-stories-extra-large-font mvx:text-xl mvx:text-primary!',
  trimStoriesMonospace: 'trim-stories-monospace mvx:font-mono',
  trimStoriesBackground: 'trim-stories-background mvx:p-2 mvx:rounded',
  trimStoriesBlue: 'trim-stories-blue mvx:text-blue-600',
  trimStoriesGreen: 'trim-stories-green mvx:text-green-600',
  trimStoriesRed: 'trim-stories-red mvx:text-red-600',
} satisfies Record<string, string>;

const storySettings: Meta<Trim> = {
  tags: ['autodocs'],
  title: 'Components/Trim',
  render: properties => <mvx-trim {...properties} />,
  args: {
    text: 'This is a long text that might need to be trimmed when the container is too narrow',
  },
  argTypes: {
    text: { control: 'text' },
    class: { control: 'text' },
    dataTestId: { control: 'text' },
  },
};

export const Default: StoryObj<Trim> = {
  render: () => (
    <div class={styles.trimStoriesWrapper}>
      <div class={styles.trimStoriesContainer}>
        <mvx-trim text="This is a default trim component that will show trimming behavior when the container is narrow" />
      </div>
    </div>
  ),
};

export const ContainerWidths: StoryObj<Trim> = {
  render: () => (
    <div class={styles.trimStoriesWrapper}>
      <div class={classNames(styles.trimStoriesContainer, styles.trimStoriesNarrow)}>
        <strong>Narrow (128px):</strong>
        <mvx-trim text="This text will definitely be trimmed in this narrow container" />
      </div>

      <div class={classNames(styles.trimStoriesContainer, styles.trimStoriesMedium)}>
        <strong>Medium (192px):</strong>
        <mvx-trim text="This text might be trimmed depending on the font size and content length" />
      </div>

      <div class={classNames(styles.trimStoriesContainer, styles.trimStoriesWide)}>
        <strong>Wide (320px):</strong>
        <mvx-trim text="This text has more space but might still be trimmed if it's very long like this example" />
      </div>

      <div class={classNames(styles.trimStoriesContainer, styles.trimStoriesExtraWide)}>
        <strong>Extra Wide (384px):</strong>
        <mvx-trim text="This container provides plenty of space for most text content without needing trimming" />
      </div>
    </div>
  ),
};

export const FontSizes: StoryObj<Trim> = {
  render: () => (
    <div class={styles.trimStoriesWrapper}>
      <div class={classNames(styles.trimStoriesContainer, styles.trimStoriesMedium)}>
        <strong>Small Font:</strong>

        <mvx-trim
          text="This text uses a smaller font size which allows more content to fit"
          class={styles.trimStoriesSmallFont}
        />
      </div>

      <div class={classNames(styles.trimStoriesContainer, styles.trimStoriesMedium)}>
        <strong>Default Font:</strong>

        <mvx-trim text="This text uses the default font size for normal content" />
      </div>

      <div class={classNames(styles.trimStoriesContainer, styles.trimStoriesMedium)}>
        <strong>Large Font:</strong>

        <mvx-trim
          text="This text uses a larger font which means less content fits"
          class={styles.trimStoriesLargeFont}
        />
      </div>

      <div class={classNames(styles.trimStoriesContainer, styles.trimStoriesMedium)}>
        <strong>Extra Large Font:</strong>

        <mvx-trim
          text="This text uses extra large font with even less content fitting"
          class={styles.trimStoriesExtraLargeFont}
        />
      </div>
    </div>
  ),
};

export const RealWorldExamples: StoryObj<Trim> = {
  render: () => (
    <div class={styles.trimStoriesWrapper}>
      <div class={classNames(styles.trimStoriesContainer, styles.trimStoriesMedium)}>
        <strong>Wallet Address:</strong>

        <mvx-trim
          text="erd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th"
          class={styles.trimStoriesMonospace}
        />
      </div>

      <div class={classNames(styles.trimStoriesContainer, styles.trimStoriesMedium)}>
        <strong>Transaction Hash:</strong>

        <mvx-trim
          text="9f4d2a5b8c1e7d3f6a9b2e8c5f1a4d7b0e3c6f9a2d5b8e1c4f7a0d3b6e9c2f5a8b1e4d7f0c3a6"
          class={styles.trimStoriesMonospace}
        />
      </div>

      <div class={classNames(styles.trimStoriesContainer, styles.trimStoriesMedium)}>
        <strong>Smart Contract Address:</strong>

        <mvx-trim
          text="erd1qqqqqqqqqqqqqpgqzqvm5ywqqf524efwrhr039tjs29w0qltkklsa05pk7"
          class={styles.trimStoriesMonospace}
        />
      </div>

      <div class={classNames(styles.trimStoriesContainer, styles.trimStoriesMedium)}>
        <strong>Collection Identifier:</strong>
        <mvx-trim text="MULTIVERSXPUNKS-114fa5-01" class={styles.trimStoriesMonospace} />
      </div>

      <div class={classNames(styles.trimStoriesContainer, styles.trimStoriesMedium)}>
        <strong>Long Username:</strong>
        <mvx-trim text="multiversx.super.long.domain.name.example.herotag" />
      </div>
    </div>
  ),
};

export const TextLengths: StoryObj<Trim> = {
  render: () => (
    <div class={styles.trimStoriesWrapper}>
      <div class={classNames(styles.trimStoriesContainer, styles.trimStoriesMedium)}>
        <strong>Short Text:</strong>
        <mvx-trim text="Short" />
      </div>

      <div class={classNames(styles.trimStoriesContainer, styles.trimStoriesMedium)}>
        <strong>Medium Text:</strong>
        <mvx-trim text="This is a medium length text" />
      </div>

      <div class={classNames(styles.trimStoriesContainer, styles.trimStoriesMedium)}>
        <strong>Long Text:</strong>
        <mvx-trim text="This is a very long text that will definitely need trimming in most containers" />
      </div>

      <div class={classNames(styles.trimStoriesContainer, styles.trimStoriesMedium)}>
        <strong>Extra Long Text:</strong>
        <mvx-trim text="This is an extremely long text that contains many words and will definitely be trimmed in any reasonably sized container, demonstrating the trimming behavior clearly" />
      </div>

      <div class={classNames(styles.trimStoriesContainer, styles.trimStoriesMedium)}>
        <strong>Single Word:</strong>
        <mvx-trim text="Antidisestablishmentarianism" />
      </div>
    </div>
  ),
};

export const StyledVariants: StoryObj<Trim> = {
  render: () => (
    <div class={styles.trimStoriesWrapper}>
      <div class={classNames(styles.trimStoriesContainer, styles.trimStoriesMedium)}>
        <strong>Background Style:</strong>

        <mvx-trim
          text="This trim component has a background style applied to it"
          class={styles.trimStoriesBackground}
        />
      </div>

      <div class={classNames(styles.trimStoriesContainer, styles.trimStoriesMedium)}>
        <strong>Blue Text:</strong>
        <mvx-trim text="This trim component uses blue colored text" class={styles.trimStoriesBlue} />
      </div>

      <div class={classNames(styles.trimStoriesContainer, styles.trimStoriesMedium)}>
        <strong>Green Text:</strong>
        <mvx-trim text="This trim component uses green colored text" class={styles.trimStoriesGreen} />
      </div>

      <div class={classNames(styles.trimStoriesContainer, styles.trimStoriesMedium)}>
        <strong>Red Text:</strong>
        <mvx-trim text="This trim component uses red colored text" class={styles.trimStoriesRed} />
      </div>
    </div>
  ),
};

export const EdgeCases: StoryObj<Trim> = {
  render: () => (
    <div class={styles.trimStoriesWrapper}>
      <div class={classNames(styles.trimStoriesContainer, styles.trimStoriesNarrow)}>
        <strong>Single Character:</strong>
        <mvx-trim text="X" />
      </div>

      <div class={classNames(styles.trimStoriesContainer, styles.trimStoriesNarrow)}>
        <strong>Two Characters:</strong>
        <mvx-trim text="XX" />
      </div>

      <div class={classNames(styles.trimStoriesContainer, styles.trimStoriesNarrow)}>
        <strong>Numbers Only:</strong>
        <mvx-trim text="1234567890123456789012345678901234567890" />
      </div>

      <div class={classNames(styles.trimStoriesContainer, styles.trimStoriesNarrow)}>
        <strong>Special Characters:</strong>
        <mvx-trim text="!@#$%^&*()_+-=[]{}|;:,.<>?/~`" />
      </div>

      <div class={classNames(styles.trimStoriesContainer, styles.trimStoriesNarrow)}>
        <strong>Unicode Characters:</strong>
        <mvx-trim text="🚀🌟💎⚡🔥🌈✨💫🎯🎨🎪🎭🎪" />
      </div>
    </div>
  ),
};

export default storySettings;
