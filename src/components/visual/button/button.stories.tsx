import { h } from '@stencil/core';
import type { Meta, StencilRenderer, StoryObj } from '@stencil/storybook-plugin';
import { ButtonSizeEnum, ButtonVariantEnum } from './button.types';
import type { PartialStoryFn, StoryContext } from 'storybook/internal/csf';

import type { Button } from './button';

const themeDecorator = (Story: PartialStoryFn<StencilRenderer<Button>, Button>, context: StoryContext) => (
  <div data-mvx-theme={`mvx:${context.globals.backgrounds.value}-theme`} class="mvx:pt-40">
    <Story />
  </div>
);

const storySettings: Meta<Button> = {
  tags: ['autodocs'],
  title: 'Components/Button',
  decorators: [themeDecorator],
  render: properties => <mvx-button {...properties}>Button Text</mvx-button>,
  args: { variant: 'primary', size: 'large', disabled: false },
  argTypes: {
    variant: { control: { type: 'select' }, options: Object.values(ButtonVariantEnum) },
    size: { control: { type: 'select' }, options: Object.values(ButtonSizeEnum) },
    disabled: { control: 'boolean' },
    class: { control: 'text' },
  },
};

const processStory = (storyArguments: Partial<Button>): StoryObj<Button> => ({
  args: storyArguments,
  render: properties => <mvx-button {...properties} />,
});

const processHoverStory = (storyArguments: Partial<Button>): StoryObj<Button> => ({
  args: storyArguments,
  render: properties => <mvx-button {...properties}>Hover Me</mvx-button>,
  parameters: { pseudo: { hover: true } },
});

export const Primary = processStory({ variant: 'primary', size: 'large' });
export const Secondary = processStory({ variant: 'secondary', size: 'large' });
export const Neutral = processStory({ variant: 'neutral', size: 'large' });
export const Small = processStory({ variant: 'primary', size: 'small' });
export const Large = processStory({ variant: 'primary', size: 'large' });

export const HoverLargePrimary = processHoverStory({ variant: 'primary', size: 'large' });
export const HoverLargeSecondary = processHoverStory({ variant: 'secondary', size: 'large' });
export const HoverLargeNeutral = processHoverStory({ variant: 'neutral', size: 'large' });
export const HoverSmallPrimary = processHoverStory({ variant: 'neutral', size: 'small' });
export const HoverSmallSecondary = processHoverStory({ variant: 'neutral', size: 'small' });
export const HoverSmallNeutral = processHoverStory({ variant: 'neutral', size: 'small' });

export const HoverLargeDisabled = processHoverStory({ variant: 'primary', size: 'large', disabled: true });
export const HoverSmallDisabled = processHoverStory({ variant: 'primary', size: 'small', disabled: true });

export default storySettings;
