import './button.scss';

import { h } from '@stencil/core';
import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import capitalize from 'lodash.capitalize';

import { ButtonSizeEnum, ButtonVariantEnum } from '../../../common/Button/button.types';
import type { Button } from './button';

// prettier-ignore
const styles = {
  buttonStoriesGrid: 'button-stories-grid mvx:flex mvx:gap-4 mvx:flex-wrap',
} satisfies Record<string, string>;

const storySettings: Meta<Button> = {
  tags: ['autodocs'],
  title: 'Components/Button',
  args: { variant: 'primary', size: 'large', disabled: false },
  argTypes: {
    variant: { control: { type: 'select' }, options: Object.values(ButtonVariantEnum) },
    size: { control: { type: 'select' }, options: Object.values(ButtonSizeEnum) },
    disabled: { control: 'boolean' },
    class: { control: 'text' },
  },
};

export const Primary: StoryObj<Button> = {
  render: properties => <mvx-button {...properties}>Button Text</mvx-button>,
};

export const DefaultSize: StoryObj<Button> = {
  render: () => (
    <div class={styles.buttonStoriesGrid}>
      {Object.values(ButtonVariantEnum).map(variant => (
        <mvx-button variant={variant}>{capitalize(variant)}</mvx-button>
      ))}
    </div>
  ),
};

export const SmallSize: StoryObj<Button> = {
  render: () => (
    <div class={styles.buttonStoriesGrid}>
      {Object.values(ButtonVariantEnum).map(variant => (
        <mvx-button variant={variant} size="small">
          {capitalize(variant)}
        </mvx-button>
      ))}
    </div>
  ),
};

export const DisabledVariants: StoryObj<Button> = {
  render: () => (
    <div class={styles.buttonStoriesGrid}>
      {Object.values(ButtonVariantEnum).map(variant => (
        <mvx-button variant={variant} disabled={true}>
          {capitalize(variant)}
        </mvx-button>
      ))}
    </div>
  ),
};

export default storySettings;
