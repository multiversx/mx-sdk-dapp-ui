import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import type { TransactionRowType } from '../../../transactions-table.type';
import { TransactionShards } from '../TransactionShards';

describe('TransactionShards tests', () => {
  const createMockTransaction = (senderShard: string, receiverShard: string): TransactionRowType => ({
    age: { timeAgo: '1 min ago', tooltip: '1 minute ago' },
    method: { name: 'transfer' },
    iconInfo: { tooltip: 'Transfer' },
    link: '/tx/123',
    receiver: {
      address: 'erd1receiver...',
      description: 'Receiver',
      isContract: false,
      isTokenLocked: false,
      link: '/address/erd1receiver...',
      name: 'Receiver',
      shard: receiverShard,
      shardLink: `/blocks?shard=${receiverShard}`,
      showLink: true,
    },
    sender: {
      address: 'erd1sender...',
      description: 'Sender',
      isContract: false,
      isTokenLocked: false,
      link: '/address/erd1sender...',
      name: 'Sender',
      shard: senderShard,
      shardLink: `/blocks?shard=${senderShard}`,
      showLink: true,
    },
    txHash: 'hash123',
    value: {
      egldLabel: 'xEGLD',
      valueDecimal: '0',
      valueInteger: '100',
    },
    direction: 'in',
  });

  it('renders with default props', async () => {
    const transaction = createMockTransaction('0', '1');

    const page = await newSpecPage({
      components: [],
      template: () => <TransactionShards transaction={transaction} />,
    });

    expect(page.root).toEqualHtml(`
      <div class="mvx:fill-label mvx:flex mvx:gap-2 mvx:items-center mvx:w-max transaction-shards">
        <a class="explorer-link mvx:decoration-0 mvx:flex mvx:text-primary!" data-testid="${DataTestIdsEnum.shardFromLink}" href="/blocks?shard=0" rel="noreferrer" target="_blank">
          <span data-testid="${DataTestIdsEnum.senderShard}">0</span>
        </a>
        <mvx-arrow-right-icon class="mvx:h-4 mvx:w-4 transaction-shards-arrow-icon"></mvx-arrow-right-icon>
        <a class="explorer-link mvx:decoration-0 mvx:flex mvx:text-primary!" data-testid="${DataTestIdsEnum.shardToLink}" href="/blocks?shard=1" rel="noreferrer" target="_blank">
          <span data-testid="${DataTestIdsEnum.receiverShard}">1</span>
        </a>
      </div>
    `);
  });

  it('renders with custom class', async () => {
    const transaction = createMockTransaction('0', '1');

    const page = await newSpecPage({
      components: [],
      template: () => <TransactionShards class="custom-class" transaction={transaction} />,
    });

    expect(page.root).toEqualHtml(`
      <div class="custom-class mvx:fill-label mvx:flex mvx:gap-2 mvx:items-center mvx:w-max transaction-shards">
        <a class="explorer-link mvx:decoration-0 mvx:flex mvx:text-primary!" data-testid="${DataTestIdsEnum.shardFromLink}" href="/blocks?shard=0" rel="noreferrer" target="_blank">
          <span data-testid="${DataTestIdsEnum.senderShard}">0</span>
        </a>
        <mvx-arrow-right-icon class="mvx:h-4 mvx:w-4 transaction-shards-arrow-icon"></mvx-arrow-right-icon>
        <a class="explorer-link mvx:decoration-0 mvx:flex mvx:text-primary!" data-testid="${DataTestIdsEnum.shardToLink}" href="/blocks?shard=1" rel="noreferrer" target="_blank">
          <span data-testid="${DataTestIdsEnum.receiverShard}">1</span>
        </a>
      </div>
    `);
  });

  it('renders with different shard values', async () => {
    const transaction = createMockTransaction('2', '3');

    const page = await newSpecPage({
      components: [],
      template: () => <TransactionShards transaction={transaction} />,
    });

    const senderShard = page.root.querySelector(`[data-testid="${DataTestIdsEnum.senderShard}"]`);
    const receiverShard = page.root.querySelector(`[data-testid="${DataTestIdsEnum.receiverShard}"]`);

    expect(senderShard.textContent).toBe('2');
    expect(receiverShard.textContent).toBe('3');
  });
});
