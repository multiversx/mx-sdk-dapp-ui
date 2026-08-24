import { h } from '@stencil/core';
import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { TransactionStatusEnum } from 'constants/transactionStatus.enum';

import type { TransactionDetailsBody } from './transaction-toast-details-body';

// prettier-ignore
const styles = {
  detailsBodyStoriesWrapper: 'details-body-stories-wrapper mvx:flex mvx:flex-col mvx:gap-2 mvx:w-full mvx:max-w-md',
} satisfies Record<string, string>;

const EXAMPLE_HASH = 'd1c9f0b0e8a44a5d9c2a1f3b7e6d5c4b3a291807f6e5d4c3b2a190807f6e5d4c';
const exampleLink = `https://devnet-explorer.multiversx.com/transactions/${EXAMPLE_HASH}`;

const storySettings: Meta<TransactionDetailsBody> = {
  tags: ['autodocs'],
  title: 'Toasts/TransactionToast/DetailsBody',
  component: 'mvx-transaction-toast-details-body',
  args: {
    hash: EXAMPLE_HASH,
    link: exampleLink,
    index: '#1',
    status: TransactionStatusEnum.success,
  },
  argTypes: {
    status: { control: { type: 'select' }, options: Object.values(TransactionStatusEnum) },
    hash: { control: 'text' },
    link: { control: 'text' },
    index: { control: 'text' },
    transactionClass: { control: 'text' },
  },
};

export const Default: StoryObj<TransactionDetailsBody> = {
  render: properties => <mvx-transaction-toast-details-body {...properties} />,
};

export const AllStatuses: StoryObj<TransactionDetailsBody> = {
  render: () => (
    <div class={styles.detailsBodyStoriesWrapper}>
      {Object.values(TransactionStatusEnum).map((status, index) => (
        <mvx-transaction-toast-details-body
          status={status}
          hash={EXAMPLE_HASH}
          link={exampleLink}
          index={`#${index + 1}`}
        />
      ))}
    </div>
  ),
};

export default storySettings;
