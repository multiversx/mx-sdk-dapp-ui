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
        <svg class="arrow-right-icon mvx:h-4 mvx:w-4 transaction-shards-arrow-icon" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
          <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" fill="currentColor"></path>
        </svg>
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
        <svg class="arrow-right-icon mvx:h-4 mvx:w-4 transaction-shards-arrow-icon" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
          <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" fill="currentColor"></path>
        </svg>
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
