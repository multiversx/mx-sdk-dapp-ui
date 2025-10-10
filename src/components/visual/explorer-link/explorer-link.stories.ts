import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import type { ExplorerLink } from './explorer-link';

const DEVNET_EXPLORER_URL = 'https://devnet-explorer.multiversx.com';

// prettier-ignore
const styles = {
  explorerStoriesGrid: 'explorer-stories-grid mvx:flex mvx:gap-4 mvx:flex-wrap',
  explorerStoriesIconSmall: 'explorer-stories-icon-small mvx:w-3! mvx:h-3! ',
  explorerStoriesIconDefault: 'explorer-stories-icon-default ',
  explorerStoriesIconLarge: 'explorer-stories-icon-large mvx:w-5! mvx:h-5! ',
  explorerStoriesIconExtraLarge: 'explorer-stories-icon-extra-large mvx:w-6! mvx:h-6! ',
  explorerStoriesIconHuge: 'explorer-stories-icon-huge mvx:w-8! mvx:h-8! ',
  explorerStoriesIconBlue: 'explorer-stories-icon-blue mvx:text-blue-600! hover:mvx:text-blue-500!',
  explorerStoriesIconGreen: 'explorer-stories-icon-green mvx:text-green-600! hover:mvx:text-green-500!',
  explorerStoriesIconRed: 'explorer-stories-icon-red mvx:text-red-600! hover:mvx:text-red-500!',
  explorerStoriesIconPurple: 'explorer-stories-icon-purple mvx:text-purple-600! hover:mvx:text-purple-500!',
  explorerStoriesIconOrange: 'explorer-stories-icon-orange mvx:text-orange-600! hover:mvx:text-orange-500!',
  explorerStoriesButtonDefault: 'explorer-stories-button-default mvx:text-gray-700! hover:mvx:text-gray-900!',
  explorerStoriesButtonBackground: 'explorer-stories-button-background mvx:bg-gray-200! mvx:p-2! mvx:rounded! hover:mvx:bg-gray-300! mvx:text-gray-800!',
  explorerStoriesButtonBorder: 'explorer-stories-button-border mvx:border! mvx:border-gray-400! mvx:p-2! mvx:rounded! hover:mvx:border-gray-500! mvx:text-gray-800!',
  explorerStoriesButtonCircular: 'explorer-stories-button-circular mvx:bg-blue-100! mvx:p-2! mvx:rounded-full! hover:mvx:bg-blue-200! mvx:text-blue-800!',
  explorerStoriesButtonShadow: 'explorer-stories-button-shadow mvx:bg-white! mvx:p-2! mvx:rounded! mvx:shadow-md! hover:mvx:shadow-lg! mvx:text-gray-800! mvx:border! mvx:border-gray-200!',
  explorerStoriesIconBackground: 'explorer-stories-icon-background mvx:text-gray-700! hover:mvx:text-gray-900!',
  explorerStoriesIconBorder: 'explorer-stories-icon-border mvx:text-gray-700! hover:mvx:text-gray-900!',
  explorerStoriesIconCircular: 'explorer-stories-icon-circular mvx:text-blue-600! hover:mvx:text-blue-800!',
  explorerStoriesIconShadow: 'explorer-stories-icon-shadow mvx:text-gray-700! hover:mvx:text-gray-900!',
  explorerStoriesIconPrimaryDefault: 'explorer-stories-icon-primary-default ',
  explorerStoriesButtonLargeBlue: 'explorer-stories-button-large-blue mvx:bg-blue-50! mvx:p-2! mvx:rounded! hover:mvx:bg-blue-100!',
  explorerStoriesIconLargeBlue: 'explorer-stories-icon-large-blue mvx:w-5! mvx:h-5! mvx:text-blue-600! hover:mvx:text-blue-500!',
  explorerStoriesButtonCompactGreen: 'explorer-stories-button-compact-green mvx:border! mvx:border-green-300! mvx:p-1! mvx:rounded!',
  explorerStoriesIconCompactGreen: 'explorer-stories-icon-compact-green mvx:w-3! mvx:h-3! mvx:text-green-600!',
} satisfies Record<string, string>;

const storySettings: Meta<ExplorerLink> = {
  tags: ['autodocs'],
  title: 'Components/ExplorerLink',
  args: {
    link: DEVNET_EXPLORER_URL,
  },
  argTypes: {
    link: { control: 'text' },
    iconClass: { control: 'text' },
    class: { control: 'text' },
  },
};

export const Default: StoryObj<ExplorerLink> = {
  render: properties => html`
    <mvx-explorer-link
      link="${properties.link}"
      iconClass="${properties.iconClass || ''}"
      class="${properties.class || ''}"
    ></mvx-explorer-link>
  `,
};

export const Sizes: StoryObj<ExplorerLink> = {
  render: () => html`
    <div class="${styles.explorerStoriesGrid}">
      <mvx-explorer-link link="${DEVNET_EXPLORER_URL}" iconClass="${styles.explorerStoriesIconSmall}"></mvx-explorer-link>
      <mvx-explorer-link link="${DEVNET_EXPLORER_URL}" iconClass="${styles.explorerStoriesIconDefault}"></mvx-explorer-link>
      <mvx-explorer-link link="${DEVNET_EXPLORER_URL}" iconClass="${styles.explorerStoriesIconLarge}"></mvx-explorer-link>
      <mvx-explorer-link link="${DEVNET_EXPLORER_URL}" iconClass="${styles.explorerStoriesIconExtraLarge}"></mvx-explorer-link>
      <mvx-explorer-link link="${DEVNET_EXPLORER_URL}" iconClass="${styles.explorerStoriesIconHuge}"></mvx-explorer-link>
    </div>
  `,
};

export const Colors: StoryObj<ExplorerLink> = {
  render: () => html`
    <div class="${styles.explorerStoriesGrid}">
      <mvx-explorer-link link="${DEVNET_EXPLORER_URL}" iconClass="${styles.explorerStoriesIconBlue}"></mvx-explorer-link>
      <mvx-explorer-link link="${DEVNET_EXPLORER_URL}" iconClass="${styles.explorerStoriesIconGreen}"></mvx-explorer-link>
      <mvx-explorer-link link="${DEVNET_EXPLORER_URL}" iconClass="${styles.explorerStoriesIconRed}"></mvx-explorer-link>
      <mvx-explorer-link link="${DEVNET_EXPLORER_URL}" iconClass="${styles.explorerStoriesIconPurple}"></mvx-explorer-link>
      <mvx-explorer-link link="${DEVNET_EXPLORER_URL}" iconClass="${styles.explorerStoriesIconOrange}"></mvx-explorer-link>
    </div>
  `,
};

export const ButtonStyles: StoryObj<ExplorerLink> = {
  render: () => html`
    <div class="${styles.explorerStoriesGrid}">
      <mvx-explorer-link link="${DEVNET_EXPLORER_URL}" iconClass="${styles.explorerStoriesButtonDefault}"></mvx-explorer-link>

      <mvx-explorer-link
        link="${DEVNET_EXPLORER_URL}"
        class="${styles.explorerStoriesButtonBackground}"
        iconClass="${styles.explorerStoriesIconBackground}"
      ></mvx-explorer-link>

      <mvx-explorer-link
        link="${DEVNET_EXPLORER_URL}"
        class="${styles.explorerStoriesButtonBorder}"
        iconClass="${styles.explorerStoriesIconBorder}"
      ></mvx-explorer-link>

      <mvx-explorer-link
        link="${DEVNET_EXPLORER_URL}"
        class="${styles.explorerStoriesButtonCircular}"
        iconClass="${styles.explorerStoriesIconCircular}"
      ></mvx-explorer-link>

      <mvx-explorer-link
        link="${DEVNET_EXPLORER_URL}"
        class="${styles.explorerStoriesButtonShadow}"
        iconClass="${styles.explorerStoriesIconShadow}"
      ></mvx-explorer-link>
    </div>
  `,
};

export default storySettings;
