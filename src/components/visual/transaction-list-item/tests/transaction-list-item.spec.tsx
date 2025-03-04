import { newSpecPage } from '@stencil/core/testing';

import { TransactionListItem } from '../transaction-list-item';
import { type ITransactionListItem, TransactionServerStatusesEnum } from '../transaction-list-item.types';

describe('transaction-list-item', () => {
  const testTransactions: ITransactionListItem[] = [
    // Example 1: Sent transaction
    {
      hash: '0x123',
      title: 'Sent',
      status: TransactionServerStatusesEnum.success,
      amount: '-1,420.2133',
      label: 'EGLD',
      to: 'AshSwap: Aggregator...',
      nonce: 1,
      value: '1420213300000000000',
      receiver: 'erd1qqqqqqqqqqqqqpgqd77fnev2sthncy2nd8lzn4cqp3vvqwvg7yqs3njh3x',
      sender: 'erd1qqqqqqqqqqqqqpgqd77fnev2sthncy2nd8lzn4cqp3vvqwvg7yqs3njh3x',
      gasPrice: 1000000000,
      gasLimit: 50000,
      chainID: '1',
      version: 1,
    },

    // Example 2: Claim Rewards with multiple assets
    {
      hash: '0x456',
      title: 'Claim Rewards',
      status: TransactionServerStatusesEnum.success,
      to: 'xExchange: Fees Collector',
      assets: ['/assets/tokens/egld.svg', '/assets/tokens/usdc.svg', '/assets/tokens/mex.svg', '/assets/tokens/utk.svg', '/assets/tokens/btc.svg'],
      nonce: 2,
      value: '0',
      receiver: 'erd1qqqqqqqqqqqqqpgqd77fnev2sthncy2nd8lzn4cqp3vvqwvg7yqs3njh3x',
      sender: 'erd1qqqqqqqqqqqqqpgqd77fnev2sthncy2nd8lzn4cqp3vvqwvg7yqs3njh3x',
      gasPrice: 1000000000,
      gasLimit: 50000,
      chainID: '1',
      version: 1,
    },

    // Example 3: Received transaction with positive amount
    {
      hash: '0x789',
      title: 'Received',
      status: TransactionServerStatusesEnum.success,
      amount: '+3,420,865.2133',
      label: 'MEX',
      from: 'xExchange: Fees Collector',
      nonce: 3,
      value: '3420865213300000000',
      receiver: 'erd1qqqqqqqqqqqqqpgqd77fnev2sthncy2nd8lzn4cqp3vvqwvg7yqs3njh3x',
      sender: 'erd1qqqqqqqqqqqqqpgqd77fnev2sthncy2nd8lzn4cqp3vvqwvg7yqs3njh3x',
      gasPrice: 1000000000,
      gasLimit: 50000,
      chainID: '1',
      version: 1,
    },

    // Example 4: Another Claim Rewards
    {
      hash: '0xabc',
      title: 'Claim Rewards',
      status: TransactionServerStatusesEnum.success,
      to: 'xExchange: Fees Collector',
      nonce: 4,
      value: '0',
      receiver: 'erd1qqqqqqqqqqqqqpgqd77fnev2sthncy2nd8lzn4cqp3vvqwvg7yqs3njh3x',
      sender: 'erd1qqqqqqqqqqqqqpgqd77fnev2sthncy2nd8lzn4cqp3vvqwvg7yqs3njh3x',
      gasPrice: 1000000000,
      gasLimit: 50000,
      chainID: '1',
      version: 1,
    },
  ];

  it('renders Sent transaction correctly', async () => {
    const page = await newSpecPage({
      components: [TransactionListItem],
      html: '<transaction-list-item></transaction-list-item>',
    });

    page.rootInstance.transaction = testTransactions[0];
    await page.waitForChanges();

    expect(page.root).toHaveClass('transaction-item-sent');
    const amountElement = page.root.shadowRoot.querySelector('.transaction-amount');
    expect(amountElement).toHaveClass('amount-negative');
    expect(amountElement.textContent.trim()).toBe('-1,420.2133 EGLD');
  });

  it('renders Claim Rewards with multiple assets correctly', async () => {
    const page = await newSpecPage({
      components: [TransactionListItem],
      html: '<transaction-list-item></transaction-list-item>',
    });

    page.rootInstance.transaction = testTransactions[1];
    await page.waitForChanges();

    expect(page.root).toHaveClass('transaction-item-claim');

    const assets = page.root.shadowRoot.querySelectorAll('.asset');
    expect(assets.length).toBe(4); // 3 visible assets + 1 "+2" indicator

    // Verify images are rendered
    const assetImages = page.root.shadowRoot.querySelectorAll('.asset-image');
    expect(assetImages.length).toBe(3); // 3 visible assets should have images

    // Check first asset's image src
    expect(assetImages[0].getAttribute('src')).toBe('/assets/tokens/egld.svg');

    // Check the +2 indicator
    const lastAsset = assets[assets.length - 1];
    expect(lastAsset).toHaveClass('asset-more');
    expect(lastAsset.textContent.trim()).toBe('+2');
  });

  it('renders Received transaction correctly', async () => {
    const page = await newSpecPage({
      components: [TransactionListItem],
      html: '<transaction-list-item></transaction-list-item>',
    });

    page.rootInstance.transaction = testTransactions[2];
    await page.waitForChanges();

    expect(page.root).toHaveClass('transaction-item-received');
    const amountElement = page.root.shadowRoot.querySelector('.transaction-amount');
    expect(amountElement).toHaveClass('amount-positive');
    expect(amountElement.textContent.trim()).toBe('+3,420,865.2133 MEX');
  });

  it('renders basic Claim Rewards correctly', async () => {
    const page = await newSpecPage({
      components: [TransactionListItem],
      html: '<transaction-list-item></transaction-list-item>',
    });

    page.rootInstance.transaction = testTransactions[3];
    await page.waitForChanges();

    expect(page.root).toHaveClass('transaction-item-claim');
    const titleElement = page.root.shadowRoot.querySelector('.transaction-title');
    expect(titleElement.textContent).toBe('Claim Rewards');

    const targetElement = page.root.shadowRoot.querySelector('.entity-name');
    expect(targetElement.textContent).toBe('xExchange: Fees Collector');
  });
});
