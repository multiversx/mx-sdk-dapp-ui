import { h } from '@stencil/core';
import type { Meta, StoryObj } from '@stencil/storybook-plugin';

import type { FormatAmount } from './format-amount';

// prettier-ignore
const styles = {
  formatAmountStoriesGrid: 'format-amount-stories-grid mvx:flex mvx:flex-col mvx:gap-3',
  formatAmountStoriesLabel: 'format-amount-stories-label mvx:text-neutral-400',
  formatAmountStoriesDecimal: 'format-amount-stories-decimal mvx:text-neutral-500',
} satisfies Record<string, string>;

const storySettings: Meta<FormatAmount> = {
  tags: ['autodocs'],
  title: 'Controlled/FormatAmount',
  component: 'mvx-format-amount',
  parameters: {
    docs: {
      description: {
        component:
          'A controlled component: the amount is already split into `valueInteger` / `valueDecimal` by an `sdk-dapp` controller. It does no formatting of its own.',
      },
    },
  },
  args: {
    valueInteger: '1',
    valueDecimal: '234500',
    label: 'EGLD',
    isValid: true,
    showLabel: true,
  },
  argTypes: {
    valueInteger: { control: 'text' },
    valueDecimal: { control: 'text' },
    label: { control: 'text' },
    isValid: { control: 'boolean' },
    showLabel: { control: 'boolean' },
    class: { control: 'text' },
    labelClass: { control: 'text' },
    decimalClass: { control: 'text' },
  },
};

export const Default: StoryObj<FormatAmount> = {
  render: properties => <mvx-format-amount {...properties} />,
};

export const Values: StoryObj<FormatAmount> = {
  render: () => (
    <div class={styles.formatAmountStoriesGrid}>
      <mvx-format-amount valueInteger="0" valueDecimal="" label="EGLD" isValid={true} />
      <mvx-format-amount valueInteger="1" valueDecimal="5" label="EGLD" isValid={true} />
      <mvx-format-amount valueInteger="12,345" valueDecimal="678900" label="EGLD" isValid={true} />
      <mvx-format-amount valueInteger="1,000,000" valueDecimal="000000000000000001" label="xMEX" isValid={true} />
    </div>
  ),
};

export const WithoutLabel: StoryObj<FormatAmount> = {
  render: () => (
    <mvx-format-amount valueInteger="42" valueDecimal="1337" label="EGLD" isValid={true} showLabel={false} />
  ),
};

export const Invalid: StoryObj<FormatAmount> = {
  parameters: {
    docs: {
      description: {
        story: 'What renders when the controller could not produce a valid amount.',
      },
    },
  },
  render: () => <mvx-format-amount valueInteger="" valueDecimal="" label="EGLD" isValid={false} />,
};

export const CustomClasses: StoryObj<FormatAmount> = {
  render: () => (
    <mvx-format-amount
      valueInteger="7"
      valueDecimal="250000"
      label="EGLD"
      isValid={true}
      labelClass={styles.formatAmountStoriesLabel}
      decimalClass={styles.formatAmountStoriesDecimal}
    />
  ),
};

export default storySettings;
