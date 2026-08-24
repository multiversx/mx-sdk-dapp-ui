import { h } from '@stencil/core';
import type { Meta, StoryObj } from '@stencil/storybook-plugin';

import type { Tooltip } from './tooltip';

// prettier-ignore
const styles = {
  tooltipStoriesWrapper: 'tooltip-stories-wrapper mvx:flex mvx:gap-16 mvx:justify-center mvx:items-center mvx:py-24',
} satisfies Record<string, string>;

const textTrigger = (label: string) => label as unknown as HTMLElement;

const storySettings: Meta<Tooltip> = {
  tags: ['autodocs'],
  title: 'Visual/Tooltip',
  component: 'mvx-tooltip',
  parameters: {
    docs: {
      description: {
        component:
          'Hover (or click, with `triggerOnClick`) the trigger to reveal the tooltip. Stories pass a plain-text `trigger`; inside the library the same prop is given JSX.',
      },
    },
  },
  args: {
    position: 'top',
    triggerOnClick: false,
  },
  argTypes: {
    position: { control: { type: 'select' }, options: ['top', 'bottom'] },
    triggerOnClick: { control: 'boolean' },
    class: { control: 'text' },
  },
};

export const Default: StoryObj<Tooltip> = {
  render: properties => (
    <div class={styles.tooltipStoriesWrapper}>
      <mvx-tooltip
        position={properties.position}
        triggerOnClick={properties.triggerOnClick}
        trigger={textTrigger('Hover me')}
      >
        Tooltip content
      </mvx-tooltip>
    </div>
  ),
};

export const Positions: StoryObj<Tooltip> = {
  render: () => (
    <div class={styles.tooltipStoriesWrapper}>
      <mvx-tooltip position="top" trigger={textTrigger('Top')}>
        Shown above the trigger
      </mvx-tooltip>

      <mvx-tooltip position="bottom" trigger={textTrigger('Bottom')}>
        Shown below the trigger
      </mvx-tooltip>
    </div>
  ),
};

export const TriggerOnClick: StoryObj<Tooltip> = {
  render: () => (
    <div class={styles.tooltipStoriesWrapper}>
      <mvx-tooltip triggerOnClick={true} trigger={textTrigger('Click me')}>
        Toggled by click instead of hover
      </mvx-tooltip>
    </div>
  ),
};

export const LongContent: StoryObj<Tooltip> = {
  render: () => (
    <div class={styles.tooltipStoriesWrapper}>
      <mvx-tooltip trigger={textTrigger('Details')}>
        A longer tooltip body, to check the single-line whitespace handling.
      </mvx-tooltip>
    </div>
  ),
};

export default storySettings;
