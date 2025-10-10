import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import type { CopyButton } from './copy-button';

// prettier-ignore
const styles = {
  buttonStoriesGrid: 'button-stories-grid mvx:flex mvx:gap-4 mvx:flex-wrap mvx:items-center',
  buttonStoriesIconBlue: 'button-stories-icon-blue mvx:text-blue-600',
  buttonStoriesIconGreen: 'button-stories-icon-green mvx:text-green-600',
  buttonStoriesIconRed: 'button-stories-icon-red mvx:text-red-600',
  buttonStoriesIconPurple: 'button-stories-icon-purple mvx:text-purple-600',
  buttonStoriesIconOrange: 'button-stories-icon-orange mvx:text-orange-600',
  buttonStoriesButtonDefault: 'button-stories-button-default',
  buttonStoriesButtonBackground: 'button-stories-button-background mvx:bg-gray-100 mvx:p-2 mvx:rounded',
  buttonStoriesIconBackground: 'button-stories-icon-background mvx:text-gray-700',
  buttonStoriesButtonBorder: 'button-stories-button-border mvx:border mvx:border-gray-300 mvx:p-2 mvx:rounded',
  buttonStoriesIconBorder: 'button-stories-icon-border mvx:text-gray-600',
  buttonStoriesButtonCircular: 'button-stories-button-circular mvx:bg-blue-100 mvx:p-3 mvx:rounded-full',
  buttonStoriesIconCircular: 'button-stories-icon-circular mvx:text-blue-700',
  buttonStoriesButtonShadow: 'button-stories-button-shadow mvx:shadow-lg mvx:p-2 mvx:rounded',
  buttonStoriesIconShadow: 'button-stories-icon-shadow mvx:text-gray-800',
} satisfies Record<string, string>;

const storySettings: Meta<CopyButton> = {
  tags: ['autodocs'],
  title: 'Components/CopyButton',
  args: {
    text: 'Sample text to copy',
  },
  argTypes: {
    text: { control: 'text' },
    iconClass: { control: 'text' },
    class: { control: 'text' },
  },
};

export const Default: StoryObj<CopyButton> = {
  render: properties => html`
    <mvx-copy-button
      text="${properties.text}"
      iconClass="${properties.iconClass || ''}"
      class="${properties.class || ''}"
    ></mvx-copy-button>
  `,
};

export const Colors: StoryObj<CopyButton> = {
  render: () => html`
    <div class="${styles.buttonStoriesGrid}">
      <mvx-copy-button text="Copy blue" iconClass="${styles.buttonStoriesIconBlue}"></mvx-copy-button>
      <mvx-copy-button text="Copy green" iconClass="${styles.buttonStoriesIconGreen}"></mvx-copy-button>
      <mvx-copy-button text="Copy red" iconClass="${styles.buttonStoriesIconRed}"></mvx-copy-button>
      <mvx-copy-button text="Copy purple" iconClass="${styles.buttonStoriesIconPurple}"></mvx-copy-button>
      <mvx-copy-button text="Copy orange" iconClass="${styles.buttonStoriesIconOrange}"></mvx-copy-button>
    </div>
  `,
};

export const ButtonStyles: StoryObj<CopyButton> = {
  render: () => html`
    <div class="${styles.buttonStoriesGrid}">
      <mvx-copy-button text="Default" iconClass="${styles.buttonStoriesButtonDefault}"></mvx-copy-button>

      <mvx-copy-button
        text="Background"
        class="${styles.buttonStoriesButtonBackground}"
        iconClass="${styles.buttonStoriesIconBackground}"
      ></mvx-copy-button>

      <mvx-copy-button
        text="Border"
        class="${styles.buttonStoriesButtonBorder}"
        iconClass="${styles.buttonStoriesIconBorder}"
      ></mvx-copy-button>

      <mvx-copy-button
        text="Circular"
        class="${styles.buttonStoriesButtonCircular}"
        iconClass="${styles.buttonStoriesIconCircular}"
      ></mvx-copy-button>

      <mvx-copy-button
        text="Shadow"
        class="${styles.buttonStoriesButtonShadow}"
        iconClass="${styles.buttonStoriesIconShadow}"
      ></mvx-copy-button>
    </div>
  `,
};

export default storySettings;