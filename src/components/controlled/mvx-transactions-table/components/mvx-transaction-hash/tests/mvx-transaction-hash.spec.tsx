import { faCircleCheck } from '@fortawesome/free-solid-svg-icons/faCircleCheck';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons/faCircleInfo';
import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import type { IMvxTransactionAccount, IMvxTransactionsTableRow } from '../../../mvx-transactions-table.type';
import { MvxTransactionHash } from '../mvx-transaction-hash';

const account: IMvxTransactionAccount = {
  address: 'erd...',
  name: 'test',
  description: 'test',
  isContract: false,
  isTokenLocked: false,
  link: '/test',
  showLink: false,
  shard: '0',
  shardLink: '/shard/0',
};

describe('TransactionHash', () => {
  it('renders with transaction data', async () => {
    const transaction: IMvxTransactionsTableRow = {
      age: {
        timeAgo: '1h',
        tooltip: '1 hour ago',
      },
      direction: 'in',
      iconInfo: { icon: faCircleInfo, tooltip: 'Test' },
      link: 'https://example.com/tx/123',
      method: {
        name: 'Smart Contract',
        actionDescription: 'Contract call',
      },
      receiver: account,
      sender: account,
      txHash: '0x123456789abcdef',
      value: {
        egldLabel: 'xEGLD',
        valueDecimal: '0',
        valueInteger: '100',
      },
    };

    const page = await newSpecPage({
      components: [MvxTransactionHash],
      template: () => <mvx-transaction-hash transaction={transaction}></mvx-transaction-hash>,
    });

    expect(page.root).toEqualHtml(`
      <mvx-transaction-hash>
          <div>
            <mvx-transaction-icon></mvx-transaction-icon>
            <explorer-link dataTestId="${DataTestIdsEnum.transactionLink}" link="https://example.com/tx/123" text="0x123456789abcdef"></explorer-link>
          </div>
      </mvx-transaction-hash>
    `);
  });

  it('updates when transaction prop changes', async () => {
    const initialTransactionData: IMvxTransactionsTableRow = {
      age: {
        timeAgo: '1h',
        tooltip: '1 hour ago',
      },
      direction: 'in',
      iconInfo: { icon: faCircleInfo, tooltip: 'Initial' },
      link: 'https://example.com/tx/initial',
      method: {
        name: 'Smart Contract',
        actionDescription: 'Initial call',
      },
      receiver: account,
      sender: account,
      txHash: '0xInitialHash',
      value: {
        egldLabel: 'xEGLD',
        valueDecimal: '0',
        valueInteger: '100',
      },
    };

    const page = await newSpecPage({
      components: [MvxTransactionHash],
      template: () => <mvx-transaction-hash transaction={initialTransactionData}></mvx-transaction-hash>,
    });

    expect(page.root).toEqualHtml(`
      <mvx-transaction-hash>
          <div>
            <mvx-transaction-icon></mvx-transaction-icon>
            <explorer-link dataTestId="${DataTestIdsEnum.transactionLink}" link="https://example.com/tx/initial" text="0xInitialHash"></explorer-link>
          </div>
      </mvx-transaction-hash>
    `);

    const updatedTransactionData: IMvxTransactionsTableRow = {
      age: {
        timeAgo: '2h',
        tooltip: '2 hours ago',
      },
      direction: 'out',
      iconInfo: { icon: faCircleCheck, tooltip: 'Updated' },
      link: 'https://example.com/tx/updated',
      method: {
        name: 'Transfer',
        actionDescription: 'Token transfer',
      },
      receiver: account,
      sender: account,
      txHash: '0xUpdatedHash',
      value: {
        egldLabel: 'xEGLD',
        valueDecimal: '1',
        valueInteger: '200',
      },
    };

    page.root.transaction = updatedTransactionData;
    await page.waitForChanges();

    expect(page.root).toEqualHtml(`
      <mvx-transaction-hash>
          <div>
            <mvx-transaction-icon></mvx-transaction-icon>
            <explorer-link dataTestId="${DataTestIdsEnum.transactionLink}" link="https://example.com/tx/updated" text="0xUpdatedHash"></explorer-link>
          </div>
      </mvx-transaction-hash>
    `);
  });

  it('renders null when transaction is not provided', async () => {
    const page = await newSpecPage({
      components: [MvxTransactionHash],
      template: () => <mvx-transaction-hash></mvx-transaction-hash>,
    });

    expect(page.root).toEqualHtml(`
      <mvx-transaction-hash>
      </mvx-transaction-hash>
    `);
  });
});
