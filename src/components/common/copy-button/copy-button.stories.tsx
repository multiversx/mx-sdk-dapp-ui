import { h } from '@stencil/core';
import type { Meta, StoryObj } from '@stencil/storybook-plugin';

import type { CopyButton } from './copy-button';

// prettier-ignore
const styles = {
  buttonStoriesGrid: 'button-stories-grid mvx:flex mvx:gap-4 mvx:flex-wrap',
  buttonStoriesIconSmall: 'button-stories-icon-small mvx:w-3! mvx:h-3!',
  buttonStoriesIconDefault: 'button-stories-icon-default',
  buttonStoriesIconLarge: 'button-stories-icon-large mvx:w-5! mvx:h-5!',
  buttonStoriesIconExtraLarge: 'button-stories-icon-extra-large mvx:w-6! mvx:h-6!',
  buttonStoriesIconHuge: 'button-stories-icon-huge mvx:w-8! mvx:h-8!',
  buttonStoriesIconBlue: 'button-stories-icon-blue mvx:text-blue-600! hover:mvx:text-blue-500!',
  buttonStoriesIconGreen: 'button-stories-icon-green mvx:text-green-600! hover:mvx:text-green-500!',
  buttonStoriesIconRed: 'button-stories-icon-red mvx:text-red-600! hover:mvx:text-red-500!',
  buttonStoriesIconPurple: 'button-stories-icon-purple mvx:text-purple-600! hover:mvx:text-purple-500!',
  buttonStoriesIconOrange: 'button-stories-icon-orange mvx:text-orange-600! hover:mvx:text-orange-500!',
  buttonStoriesButtonDefault: 'button-stories-button-default mvx:text-gray-700! hover:mvx:text-gray-900!',
  buttonStoriesButtonBackground: 'button-stories-button-background mvx:bg-gray-200! mvx:p-2! mvx:rounded! hover:mvx:bg-gray-300! mvx:text-gray-800!',
  buttonStoriesButtonBorder: 'button-stories-button-border mvx:border! mvx:border-gray-400! mvx:p-2! mvx:rounded! hover:mvx:border-gray-500! mvx:text-gray-800!',
  buttonStoriesButtonCircular: 'button-stories-button-circular mvx:bg-blue-100! mvx:p-2! mvx:rounded-full! hover:mvx:bg-blue-200! mvx:text-blue-800!',
  buttonStoriesButtonShadow: 'button-stories-button-shadow mvx:bg-white! mvx:p-2! mvx:rounded! mvx:shadow-md! hover:mvx:shadow-lg! mvx:text-gray-800! mvx:border! mvx:border-gray-200!',
  buttonStoriesIconBackground: 'button-stories-icon-background mvx:text-gray-700! hover:mvx:text-gray-900!',
  buttonStoriesIconBorder: 'button-stories-icon-border mvx:text-gray-700! hover:mvx:text-gray-900!',
  buttonStoriesIconCircular: 'button-stories-icon-circular mvx:text-blue-600! hover:mvx:text-blue-800!',
  buttonStoriesIconShadow: 'button-stories-icon-shadow mvx:text-gray-700! hover:mvx:text-gray-900!',
  buttonStoriesIconPrimaryDefault: 'button-stories-icon-primary-default',
  buttonStoriesButtonLargeBlue: 'button-stories-button-large-blue mvx:bg-blue-50! mvx:p-2! mvx:rounded! hover:mvx:bg-blue-100!',
  buttonStoriesIconLargeBlue: 'button-stories-icon-large-blue mvx:w-5! mvx:h-5! mvx:text-blue-600! hover:mvx:text-blue-500!',
  buttonStoriesButtonCompactGreen: 'button-stories-button-compact-green mvx:border! mvx:border-green-300! mvx:p-1! mvx:rounded!',
  buttonStoriesIconCompactGreen: 'button-stories-icon-compact-green mvx:w-3! mvx:h-3! mvx:text-green-600!',
} satisfies Record<string, string>;

const storySettings: Meta<CopyButton> = {
  tags: ['autodocs'],
  title: 'Components/CopyButton',
  args: {
    text: 'Hello World!',
  },
  argTypes: {
    text: { control: 'text' },
    iconClass: { control: 'text' },
    class: { control: 'text' },
  },
};

export const Default: StoryObj<CopyButton> = {
  render: properties => <mvx-copy-button {...properties} />,
};

export const Sizes: StoryObj<CopyButton> = {
  render: () => (
    <div class={styles.buttonStoriesGrid}>
      <mvx-copy-button text="Copy small" iconClass={styles.buttonStoriesIconSmall} />
      <mvx-copy-button text="Copy default" iconClass={styles.buttonStoriesIconDefault} />
      <mvx-copy-button text="Copy large" iconClass={styles.buttonStoriesIconLarge} />
      <mvx-copy-button text="Copy XL" iconClass={styles.buttonStoriesIconExtraLarge} />
      <mvx-copy-button text="Copy huge" iconClass={styles.buttonStoriesIconHuge} />
    </div>
  ),
};

export const Colors: StoryObj<CopyButton> = {
  render: () => (
    <div class={styles.buttonStoriesGrid}>
      <mvx-copy-button text="Copy blue" iconClass={styles.buttonStoriesIconBlue} />
      <mvx-copy-button text="Copy green" iconClass={styles.buttonStoriesIconGreen} />
      <mvx-copy-button text="Copy red" iconClass={styles.buttonStoriesIconRed} />
      <mvx-copy-button text="Copy purple" iconClass={styles.buttonStoriesIconPurple} />
      <mvx-copy-button text="Copy orange" iconClass={styles.buttonStoriesIconOrange} />
    </div>
  ),
};

export const ButtonStyles: StoryObj<CopyButton> = {
  render: () => (
    <div class={styles.buttonStoriesGrid}>
      <mvx-copy-button text="Default" iconClass={styles.buttonStoriesButtonDefault} />

      <mvx-copy-button
        text="Background"
        class={styles.buttonStoriesButtonBackground}
        iconClass={styles.buttonStoriesIconBackground}
      />

      <mvx-copy-button
        text="Border"
        class={styles.buttonStoriesButtonBorder}
        iconClass={styles.buttonStoriesIconBorder}
      />

      <mvx-copy-button
        text="Circular"
        class={styles.buttonStoriesButtonCircular}
        iconClass={styles.buttonStoriesIconCircular}
      />

      <mvx-copy-button
        text="Shadow"
        class={styles.buttonStoriesButtonShadow}
        iconClass={styles.buttonStoriesIconShadow}
      />
    </div>
  ),
};

export default storySettings;
