import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import type { TransactionAccountType, TransactionRowType } from '../../../transactions-table.type';
import { TransactionHash } from '../TransactionHash';

const account: TransactionAccountType = {
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
    const transaction: TransactionRowType = {
      age: {
        timeAgo: '1h',
        tooltip: '1 hour ago',
      },
      direction: 'in',
      iconInfo: { icon: 'circle-info', tooltip: 'Test' },
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
      components: [TransactionHash],
      template: () => <mvx-transaction-hash transaction={transaction}></mvx-transaction-hash>,
    });

    expect(page.root).toEqualHtml(`
      <mvx-transaction-hash>
          <div class="mvx:flex mvx:gap-1 mvx:items-center mvx:justify-center transaction-hash">
            <mvx-transaction-icon class="mvx:flex mvx:items-center mvx:justify-center transaction-hash-icon"></mvx-transaction-icon>
            <mvx-explorer-link class="mvx:text-primary! transaction-hash-explorer-link" dataTestId="${DataTestIdsEnum.transactionLink}" link="https://example.com/tx/123"><mvx-trim text="0x123456789abcdef"></mvx-trim></mvx-explorer-link>
          </div>
      </mvx-transaction-hash>
    `);
  });

  it('updates when transaction prop changes', async () => {
    const initialTransactionData: TransactionRowType = {
      age: {
        timeAgo: '1h',
        tooltip: '1 hour ago',
      },
      direction: 'in',
      iconInfo: { icon: 'circle-Info', tooltip: 'Initial' },
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
      components: [TransactionHash],
      template: () => <mvx-transaction-hash transaction={initialTransactionData}></mvx-transaction-hash>,
    });

    expect(page.root).toEqualHtml(`
      <mvx-transaction-hash>
          <div class="mvx:flex mvx:gap-1 mvx:items-center mvx:justify-center  transaction-hash">
            <mvx-transaction-icon class="mvx:flex mvx:items-center mvx:justify-center transaction-hash-icon"></mvx-transaction-icon>
            <mvx-explorer-link class="mvx:text-primary! transaction-hash-explorer-link" dataTestId="${DataTestIdsEnum.transactionLink}" link="https://example.com/tx/initial"><mvx-trim text="0xInitialHash"></mvx-trim></mvx-explorer-link>
          </div>
      </mvx-transaction-hash>
    `);

    const updatedTransactionData: TransactionRowType = {
      age: {
        timeAgo: '2h',
        tooltip: '2 hours ago',
      },
      direction: 'out',
      iconInfo: { icon: 'circle-check', tooltip: 'Updated' },
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
          <div class="mvx:flex mvx:gap-1 mvx:items-center mvx:justify-center transaction-hash">
            <mvx-transaction-icon class="mvx:flex mvx:items-center mvx:justify-center transaction-hash-icon"></mvx-transaction-icon>
            <mvx-explorer-link class="mvx:text-primary! transaction-hash-explorer-link" dataTestId="${DataTestIdsEnum.transactionLink}" link="https://example.com/tx/updated"><mvx-trim text="0xUpdatedHash"></mvx-trim></mvx-explorer-link>
          </div>
      </mvx-transaction-hash>
    `);
  });

  it('renders null when transaction is not provided', async () => {
    const page = await newSpecPage({
      components: [TransactionHash],
      template: () => <mvx-transaction-hash></mvx-transaction-hash>,
    });

    expect(page.root).toEqualHtml(`
      <mvx-transaction-hash>
      </mvx-transaction-hash>
    `);
  });
});
