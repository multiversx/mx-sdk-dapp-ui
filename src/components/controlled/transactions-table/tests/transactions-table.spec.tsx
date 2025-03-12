import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { TransactionsTable } from '../transactions-table';
import type { ITransactionsTableRow } from '../transactions-table.type';

describe('TransactionsTable', () => {
  const mockTransactions: ITransactionsTableRow[] = [
    {
      age: { timeAgo: '5 minutes ago', tooltip: 'Feb 7, 2025, 4:55 PM' },
      direction: 'in',
      method: { name: 'transfer', actionDescription: 'Token transfer' },
      iconInfo: { icon: faCheck, tooltip: 'Successful transaction' },
      link: '/transactions/hash1',
      receiver: {
        address: 'erd1qqqqqqqqqqqqqpgqp699jngundfqw07d8jzkepucvpzush6k3wvqyc44rx',
        description: 'Receiver 1 Description',
        isContract: false,
        isTokenLocked: false,
        link: '/accounts/erd1qqqqqqqqqqqqqpgqp699jngundfqw07d8jzkepucvpzush6k3wvqyc44rx',
        name: 'Receiver 1',
        shard: '0',
        shardLink: '/shard/0',
        showLink: true,
      },
      sender: {
        address: 'erd1spyavw0956vq68xj8y4tenjpq2wd5a9p2c6j8gsz7ztyrnpxrruqzu66jx',
        description: 'Sender 1 Description',
        isContract: false,
        isTokenLocked: false,
        link: '/accounts/erd1spyavw0956vq68xj8y4tenjpq2wd5a9p2c6j8gsz7ztyrnpxrruqzu66jx',
        name: 'Sender 1',
        shard: '1',
        shardLink: '/shard/1',
        showLink: true,
      },
      txHash: 'hash1',
      value: {
        badge: 'EGLD',
        collection: 'native',
        egldLabel: '100 EGLD',
        link: '/token/EGLD',
        linkText: 'EGLD',
        name: 'MultiversX eGold',
        showFormattedAmount: true,
        svgUrl: '/assets/tokens/egld.svg',
        ticker: 'EGLD',
        titleText: '100 EGLD',
        valueDecimal: '000000000000000000',
        valueInteger: '100',
      },
    },
    {
      age: { timeAgo: '10 minutes ago', tooltip: 'Feb 7, 2025, 4:50 PM' },
      direction: 'out',
      method: { name: 'esdt_transfer', actionDescription: 'ESDT Token transfer' },
      iconInfo: { icon: faCheck, tooltip: 'Successful transaction' },
      link: '/transactions/hash2',
      receiver: {
        address: 'erd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th',
        description: 'Receiver 2 Description',
        isContract: true,
        isTokenLocked: false,
        link: '/accounts/erd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th',
        name: 'Receiver 2',
        shard: '2',
        shardLink: '/shard/2',
        showLink: true,
      },
      sender: {
        address: 'erd1k2s324ww2g0yj38qn2ch2jwctdy8mnfxep94q9arncc6xecg3xaq6mjse8',
        description: 'Sender 2 Description',
        isContract: false,
        isTokenLocked: true,
        link: '/accounts/erd1k2s324ww2g0yj38qn2ch2jwctdy8mnfxep94q9arncc6xecg3xaq6mjse8',
        name: 'Sender 2',
        shard: '1',
        shardLink: '/shard/1',
        showLink: true,
      },
      txHash: 'hash2',
      value: {
        badge: 'MEX',
        collection: 'tokens',
        egldLabel: '500 MEX',
        link: '/token/MEX-455c57',
        linkText: 'MEX',
        name: 'MEX Token',
        showFormattedAmount: true,
        svgUrl: '/assets/tokens/mex.svg',
        ticker: 'MEX',
        titleText: '500 MEX',
        valueDecimal: '000000000000000000',
        valueInteger: '500',
      },
    },
  ];

  it('renders with transactions', async () => {
    const page = await newSpecPage({
      components: [TransactionsTable],
      template: () => <transactions-table transactions={mockTransactions}></transactions-table>,
    });

    expect(page.root).toBeTruthy();
    expect(page.root.shadowRoot.querySelectorAll('tbody tr').length).toBe(2); // 2 mock transactions
  });

  it('applies custom class', async () => {
    const page = await newSpecPage({
      components: [TransactionsTable],
      template: () => <transactions-table class="custom-class" transactions={mockTransactions}></transactions-table>,
    });

    expect(page.root.shadowRoot.querySelector('table').classList.contains('custom-class')).toBeTruthy();
  });

  it('renders transaction details correctly', async () => {
    const page = await newSpecPage({
      components: [TransactionsTable],
      template: () => <transactions-table transactions={mockTransactions}></transactions-table>,
    });

    const rows = page.root.shadowRoot.querySelectorAll('tbody tr');
    expect(rows.length).toBe(2);

    rows.forEach((row, index) => {
      expect(row.querySelector('transaction-hash')).toBeTruthy();
      expect(row.querySelector('transaction-age')).toBeTruthy();
      expect(row.querySelector('transaction-shards')).toBeTruthy();
      expect(row.querySelector('transaction-account[scope="sender"]')).toBeTruthy();
      expect(row.querySelector('transaction-account[scope="receiver"]')).toBeTruthy();
      expect(row.querySelector('transaction-method')).toBeTruthy();
      expect(row.querySelector('transaction-value')).toBeTruthy();

      // Check some specific values
      expect(row.querySelector('transaction-age').getAttribute('age')).toBe(mockTransactions[index].age.timeAgo);
      expect(row.querySelector('transaction-method').getAttribute('method')).toBe(mockTransactions[index].method.name);
    });
  });
});
