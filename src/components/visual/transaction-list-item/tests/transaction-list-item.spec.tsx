import { newSpecPage } from '@stencil/core/testing';

import { TransactionListItem } from '../transaction-list-item';
import type { ITransactionListItem } from '../transaction-list-item.types';

describe('transaction-list-item', () => {
  const defaultIconWidth = '20';
  const defaultIconHeight = '21';

  const createPage = async (transaction: ITransactionListItem) => {
    const page = await newSpecPage({
      components: [TransactionListItem],
      html: '<transaction-list-item></transaction-list-item>',
    });

    page.rootInstance.transaction = transaction;
    await page.waitForChanges();
    return page;
  };

  const baseTransaction: ITransactionListItem = {
    hash: 'fe0eee477f7bcedf76bbcajklsd',
    status: 'success',
    link: 'https://explorer.multiversx.com/transactions/fe0eee477f7bcedf76bbcajklsd',
    asset: {
      imageUrl: '/assets/icons/transaction.svg',
      text: 'Test Asset',
    },
    action: {
      name: 'Test Transaction',
      description: 'To',
    },
    amount: '+100 EGLD',
    initiator: 'Test Address',
    initiatorAsset: '/assets/icons/service.svg',
    directionLabel: 'From',
    timestamp: 1716537600,
  };

  it('renders empty when no transaction is provided', async () => {
    const page = await newSpecPage({
      components: [TransactionListItem],
      html: '<transaction-list-item></transaction-list-item>',
    });
    expect(page.root.shadowRoot.querySelector('.transaction-item')).toBeFalsy();
  });

  it('renders with asset image', async () => {
    const page = await createPage(baseTransaction);
    const iconImg = page.root.shadowRoot.querySelector('.icon-image');
    expect(iconImg.getAttribute('src')).toBe(baseTransaction.asset.imageUrl);
  });

  it('renders with asset icon', async () => {
    const transaction = {
      ...baseTransaction,
      asset: {
        icon: 'faArrowsRotate',
      },
    };
    const page = await createPage(transaction);
    const iconComponent = page.root.shadowRoot.querySelector('fa-icon');
    expect(iconComponent).toBeTruthy();
    expect(iconComponent.getAttribute('icon')).toBeDefined();
  });

  it('renders with asset text', async () => {
    const transaction = {
      ...baseTransaction,
      asset: {
        text: 'TX',
      },
    };
    const page = await createPage(transaction);
    const iconText = page.root.shadowRoot.querySelector('.icon-text');
    expect(iconText.textContent).toBe('TX');
  });

  it('renders default icon when no asset properties are provided', async () => {
    const transaction = {
      ...baseTransaction,
      asset: {},
    };
    const page = await createPage(transaction);
    const defaultIcon = page.root.shadowRoot.querySelector('svg');
    expect(defaultIcon).toBeTruthy();
    expect(defaultIcon.getAttribute('width')).toBe(defaultIconWidth);
    expect(defaultIcon.getAttribute('height')).toBe(defaultIconHeight);
  });

  it('renders transaction details correctly', async () => {
    const page = await createPage(baseTransaction);

    const title = page.root.shadowRoot.querySelector('.transaction-title');
    expect(title.textContent).toBe(baseTransaction.action.name);

    const directionLabel = page.root.shadowRoot.querySelector('.direction-label');
    expect(directionLabel.textContent).toBe(baseTransaction.directionLabel);

    const initiatorAsset = page.root.shadowRoot.querySelector('.service-icon');
    expect(initiatorAsset.getAttribute('src')).toBe(baseTransaction.initiatorAsset);

    const initiator = page.root.shadowRoot.querySelector('trim-text');
    expect(initiator.getAttribute('text')).toBe(baseTransaction.initiator);
  });

  it('renders amount with correct styling for positive value', async () => {
    const page = await createPage(baseTransaction);
    const amount = page.root.shadowRoot.querySelector('.transaction-amount');

    expect(amount).toHaveClass('amount-positive');
    expect(amount.textContent.trim()).toBe(baseTransaction.amount);
  });

  it('renders amount with correct styling for negative value', async () => {
    const transaction = { ...baseTransaction, amount: '-100 EGLD' };
    const page = await createPage(transaction);
    const amount = page.root.shadowRoot.querySelector('.transaction-amount');

    expect(amount).toHaveClass('amount-negative');
    expect(amount.textContent.trim()).toBe(transaction.amount);
  });

  it('renders without amount when not provided', async () => {
    const transaction = {
      ...baseTransaction,
      amount: undefined,
    };
    const page = await createPage(transaction);
    const amount = page.root.shadowRoot.querySelector('.transaction-amount');
    expect(amount).toBeFalsy();
  });

  it('renders without details when not provided', async () => {
    const transaction = {
      ...baseTransaction,
      details: undefined,
    };
    const page = await createPage(transaction);
    const details = page.root.shadowRoot.querySelector('.transaction-info');
    expect(details).toBeFalsy();
  });

  it('renders with null asset', async () => {
    const transaction = {
      ...baseTransaction,
      asset: null,
    };
    const page = await createPage(transaction);
    const defaultIcon = page.root.shadowRoot.querySelector('svg');
    expect(defaultIcon).toBeTruthy();
    expect(defaultIcon.getAttribute('width')).toBe(defaultIconWidth);
    expect(defaultIcon.getAttribute('height')).toBe(defaultIconHeight);
  });

  it('renders without initiator asset', async () => {
    const transaction = {
      ...baseTransaction,
      details: {
        initiator: 'Test Address',
        directionLabel: 'From',
      },
    };
    const page = await createPage(transaction);
    const serviceIcon = page.root.shadowRoot.querySelector('.service-icon');
    expect(serviceIcon).toBeFalsy();
  });

  it('renders without direction label', async () => {
    const transaction = {
      ...baseTransaction,
      details: {
        initiator: 'Test Address',
        initiatorAsset: '/assets/icons/service.svg',
      },
    };
    const page = await createPage(transaction);
    const directionLabel = page.root.shadowRoot.querySelector('.direction-label');
    expect(directionLabel).toBeFalsy();
  });

  it('renders transaction hash and status', async () => {
    const page = await createPage(baseTransaction);

    const hash = page.root.shadowRoot.querySelector('.transaction-hash');
    expect(hash).toBeTruthy();
    expect(hash.getAttribute('href')).toBe(baseTransaction.link);
    expect(hash.textContent.trim()).toBe(baseTransaction.hash);

    const status = page.root.shadowRoot.querySelector('.status');
    expect(status).toBeTruthy();
    expect(status).toHaveClass(`status-${baseTransaction.status.toLowerCase()}`);
    expect(status.textContent.trim()).toBe(baseTransaction.status);
  });
});
