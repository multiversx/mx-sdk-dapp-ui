import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import type { TransactionRowType } from '../../../transactions-table.type';
import { TransactionShards } from '../transaction-shards';

describe('TransactionShards', () => {
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
      components: [TransactionShards],
      template: () => <mvx-transaction-shards transaction={transaction}></mvx-transaction-shards>,
    });

    expect(page.root).toEqualHtml(`
      <mvx-transaction-shards>
          <div class="transaction-shards">
            <mvx-explorer-link class="transactions-table-body-cell-link" data-testid="${DataTestIdsEnum.shardFromLink}" link="/blocks?shard=0">
              <span data-testid="${DataTestIdsEnum.senderShard}">0</span>
            </mvx-explorer-link>
            <span class="transaction-shards-arrow">&#10132;</span>
            <mvx-explorer-link class="transactions-table-body-cell-link" data-testid="${DataTestIdsEnum.shardToLink}" link="/blocks?shard=1">
              <span data-testid="${DataTestIdsEnum.receiverShard}">1</span>
            </mvx-explorer-link>
          </div>
      </mvx-transaction-shards>
    `);
  });

  it('renders with custom class', async () => {
    const transaction = createMockTransaction('0', '1');

    const page = await newSpecPage({
      components: [TransactionShards],
      template: () => <mvx-transaction-shards class="custom-class" transaction={transaction}></mvx-transaction-shards>,
    });

    expect(page.root).toEqualHtml(`
      <mvx-transaction-shards class="custom-class">
          <div class="custom-class transaction-shards">
            <mvx-explorer-link class="transactions-table-body-cell-link" data-testid="${DataTestIdsEnum.shardFromLink}" link="/blocks?shard=0">
              <span data-testid="${DataTestIdsEnum.senderShard}">0</span>
            </mvx-explorer-link>
            <span class="transaction-shards-arrow">&#10132;</span>
            <mvx-explorer-link class="transactions-table-body-cell-link" data-testid="${DataTestIdsEnum.shardToLink}" link="/blocks?shard=1">
              <span data-testid="${DataTestIdsEnum.receiverShard}">1</span>
            </mvx-explorer-link>
          </div>
      </mvx-transaction-shards>
    `);
  });

  it('renders with different shard values', async () => {
    const transaction = createMockTransaction('2', '3');

    const page = await newSpecPage({
      components: [TransactionShards],
      template: () => <mvx-transaction-shards transaction={transaction}></mvx-transaction-shards>,
    });

    const senderShard = page.root.querySelector(`[data-testid="${DataTestIdsEnum.senderShard}"]`);
    const receiverShard = page.root.querySelector(`[data-testid="${DataTestIdsEnum.receiverShard}"]`);

    expect(senderShard.textContent).toBe('2');
    expect(receiverShard.textContent).toBe('3');
  });
});
