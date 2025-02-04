import { newSpecPage } from '@stencil/core/testing';
import { TransactionShards } from '../transaction-shards';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';
import { h } from '@stencil/core';
import { ITransactionsTableRow } from '../../../transactions-table.type';

describe('TransactionShards', () => {
  const createMockTransaction = (senderShard: string, receiverShard: string): ITransactionsTableRow => ({
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
      template: () => <transaction-shards transaction={transaction}></transaction-shards>,
      supportsShadowDom: true,
    });

    expect(page.root).toEqualHtml(`
      <transaction-shards>
        <mock:shadow-root>
          <div class="transaction-shards">
            <explorer-link class="transactions-table-body-cell-link" data-testid="${DataTestIdsEnum.shardFromLink}" link="/blocks?shard=0">
              <span data-testid="${DataTestIdsEnum.senderShard}" slot="content">0</span>
            </explorer-link>
            <span class="transaction-shards-arrow">&#10132;</span>
            <explorer-link class="transactions-table-body-cell-link" data-testid="${DataTestIdsEnum.shardToLink}" link="/blocks?shard=1">
              <span data-testid="${DataTestIdsEnum.receiverShard}" slot="content">1</span>
            </explorer-link>
          </div>
        </mock:shadow-root>
      </transaction-shards>
    `);
  });

  it('renders with custom class', async () => {
    const transaction = createMockTransaction('0', '1');

    const page = await newSpecPage({
      components: [TransactionShards],
      template: () => <transaction-shards class="custom-class" transaction={transaction}></transaction-shards>,
      supportsShadowDom: true,
    });

    expect(page.root).toEqualHtml(`
      <transaction-shards class="custom-class">
        <mock:shadow-root>
          <div class="custom-class transaction-shards">
            <explorer-link class="transactions-table-body-cell-link" data-testid="${DataTestIdsEnum.shardFromLink}" link="/blocks?shard=0">
              <span data-testid="${DataTestIdsEnum.senderShard}" slot="content">0</span>
            </explorer-link>
            <span class="transaction-shards-arrow">&#10132;</span>
            <explorer-link class="transactions-table-body-cell-link" data-testid="${DataTestIdsEnum.shardToLink}" link="/blocks?shard=1">
              <span data-testid="${DataTestIdsEnum.receiverShard}" slot="content">1</span>
            </explorer-link>
          </div>
        </mock:shadow-root>
      </transaction-shards>
    `);
  });

  it('renders with different shard values', async () => {
    const transaction = createMockTransaction('2', '3');

    const page = await newSpecPage({
      components: [TransactionShards],
      template: () => <transaction-shards transaction={transaction}></transaction-shards>,
      supportsShadowDom: true,
    });

    const senderShard = page.root.shadowRoot.querySelector(`[data-testid="${DataTestIdsEnum.senderShard}"]`);
    const receiverShard = page.root.shadowRoot.querySelector(`[data-testid="${DataTestIdsEnum.receiverShard}"]`);

    expect(senderShard.textContent).toBe('2');
    expect(receiverShard.textContent).toBe('3');
  });
});
