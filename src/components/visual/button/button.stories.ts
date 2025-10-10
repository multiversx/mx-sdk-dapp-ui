import './button.scss';

import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import capitalize from 'lodash.capitalize';

import type { Button } from './button';
import { ButtonSizeEnum, ButtonVariantEnum } from './button.types';

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
  render: properties =>
    html`<mvx-button variant="${properties.variant}" size="${properties.size}" ?disabled="${properties.disabled}"
      >Button Text</mvx-button
    >`,
};

export const DefaultSize: StoryObj<Button> = {
  render: () => html`
    <div class="${styles.buttonStoriesGrid}">
      ${Object.values(ButtonVariantEnum).map(
        variant => html`<mvx-button variant="${variant}">${capitalize(variant)}</mvx-button>`,
      )}
    </div>
  `,
};

export const SmallSize: StoryObj<Button> = {
  render: () => html`
    <div class="${styles.buttonStoriesGrid}">
      ${Object.values(ButtonVariantEnum).map(
        variant => html`<mvx-button variant="${variant}" size="small">${capitalize(variant)}</mvx-button>`,
      )}
    </div>
  `,
};

export const DisabledVariants: StoryObj<Button> = {
  render: () => html`
    <div class="${styles.buttonStoriesGrid}">
      ${Object.values(ButtonVariantEnum).map(
        variant => html`<mvx-button variant="${variant}" ?disabled="${true}">${capitalize(variant)}</mvx-button>`,
      )}
    </div>
  `,
};

export default storySettings;
