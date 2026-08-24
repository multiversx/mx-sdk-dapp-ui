import { h } from '@stencil/core';
import type { Meta, StoryObj } from '@stencil/storybook-plugin';

import type { Preloader } from './preloader';

// prettier-ignore
const styles = {
  preloaderStoriesGrid: 'preloader-stories-grid mvx:flex mvx:gap-6 mvx:items-center mvx:flex-wrap',
  preloaderStoriesSmall: 'preloader-stories-small mvx:w-4! mvx:h-4!',
  preloaderStoriesMedium: 'preloader-stories-medium mvx:w-10! mvx:h-10!',
  preloaderStoriesLarge: 'preloader-stories-large mvx:w-20! mvx:h-20!',
  preloaderStoriesRow: 'preloader-stories-row mvx:w-full mvx:h-4!',
} satisfies Record<string, string>;

const storySettings: Meta<Preloader> = {
  tags: ['autodocs'],
  title: 'Visual/Preloader',
  component: 'mvx-preloader',
  parameters: {
    docs: {
      description: {
        component:
          'A shadow component that re-applies the consumer-supplied `class` inside its own shadow root. The build scans consumers backwards for exactly this reason — without it, a consumer sizing class is dropped and the preloader falls back to its default 120px box.',
      },
    },
  },
  argTypes: {
    class: { control: 'text' },
  },
};

export const Default: StoryObj<Preloader> = {
  render: properties => <mvx-preloader class={properties.class} />,
};

export const Sizes: StoryObj<Preloader> = {
  render: () => (
    <div class={styles.preloaderStoriesGrid}>
      <mvx-preloader class={styles.preloaderStoriesSmall} />
      <mvx-preloader class={styles.preloaderStoriesMedium} />
      <mvx-preloader class={styles.preloaderStoriesLarge} />
    </div>
  ),
};

export const SkeletonRow: StoryObj<Preloader> = {
  parameters: {
    docs: {
      description: {
        story: 'A full-width, short preloader, as used for skeleton table rows.',
      },
    },
  },
  render: () => <mvx-preloader class={styles.preloaderStoriesRow} />,
};

export default storySettings;
