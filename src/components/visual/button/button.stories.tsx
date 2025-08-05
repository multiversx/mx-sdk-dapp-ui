import './button.scss';

import { h } from '@stencil/core';
import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import capitalize from 'lodash/capitalize';

import type { Button } from './button';
import { ButtonSizeEnum, ButtonVariantEnum } from './button.types';

const buttonStoryClasses: Record<string, string> = {
  wrapper: 'mvx:flex mvx:gap-4',
};

const storySettings: Meta<Button> = {
  tags: ['autodocs'],
  title: 'Components/Button',
  render: properties => <mvx-button {...properties}>Button Text</mvx-button>,
  args: { variant: 'primary', size: 'large', disabled: false },
  argTypes: {
    variant: { control: { type: 'select' }, options: Object.values(ButtonVariantEnum) },
    size: { control: { type: 'select' }, options: Object.values(ButtonSizeEnum) },
    disabled: { control: 'boolean' },
    class: { control: 'text' },
  },
};

export const Primary: StoryObj<Button> = {
  render: () => <mvx-button>Button</mvx-button>,
};

export const DefaultSize: StoryObj<Button> = {
  render: () => (
    <div class={buttonStoryClasses.wrapper}>
      {Object.values(ButtonVariantEnum).map(variant => (
        <mvx-button variant={variant}>{capitalize(variant)}</mvx-button>
      ))}
    </div>
  ),
};

export const SmallSize: StoryObj<Button> = {
  render: () => (
    <div class={buttonStoryClasses.wrapper}>
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
    <div class={buttonStoryClasses.wrapper}>
      {Object.values(ButtonVariantEnum).map(variant => (
        <mvx-button variant={variant} disabled={true}>
          {capitalize(variant)}
        </mvx-button>
      ))}
    </div>
  ),
};

export default storySettings;
