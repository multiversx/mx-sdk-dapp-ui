import { h } from '@stencil/core';
import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { createConfirmScreenData } from 'components/functional/ledger-connect/tests/mocks/ledgerData';

import type { LedgerConfirm } from './ledger-confirm';

// prettier-ignore
const styles = {
  ledgerConfirmStoriesWrapper: 'ledger-confirm-stories-wrapper mvx:flex mvx:justify-center mvx:w-full mvx:max-w-md',
} satisfies Record<string, string>;

const storySettings: Meta<LedgerConfirm> = {
  tags: ['autodocs'],
  title: 'Panels/LedgerConnect/Confirm',
  component: 'mvx-ledger-confirm',
  args: {
    confirmScreenData: createConfirmScreenData(),
  },
  argTypes: {
    confirmScreenData: { control: 'object' },
  },
};

export const Default: StoryObj<LedgerConfirm> = {
  render: properties => (
    <div class={styles.ledgerConfirmStoriesWrapper}>
      <mvx-ledger-confirm confirmScreenData={properties.confirmScreenData ?? createConfirmScreenData()} />
    </div>
  ),
};

export const WithTransactionData: StoryObj<LedgerConfirm> = {
  render: () => (
    <div class={styles.ledgerConfirmStoriesWrapper}>
      <mvx-ledger-confirm
        confirmScreenData={createConfirmScreenData({
          data: 'ESDTTransfer@5745474c442d626434643739@0de0b6b3a7640000',
          confirmAddressText: 'Confirm the transaction on your Ledger device',
        })}
      />
    </div>
  ),
};

export default storySettings;
