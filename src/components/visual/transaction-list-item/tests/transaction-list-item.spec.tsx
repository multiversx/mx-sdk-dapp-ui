import { newSpecPage } from '@stencil/core/testing';

import { TransactionListItem } from '../transaction-list-item';
import type { ITransactionListItem } from '../transaction-list-item.types';

describe('transaction-list-item', () => {
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
    title: 'Test Transaction',
    amount: '+100 EGLD',
    mainIconUrl: '/assets/icons/transaction.svg',
    details: {
      directionLabel: 'To',
      initiator: 'Test Address',
      iconUrl: '/assets/icons/service.svg'
    }
  };

  it('renders with main icon', async () => {
    const page = await createPage(baseTransaction);
    const iconImg = page.root.shadowRoot.querySelector('.icon-image');
    expect(iconImg.getAttribute('src')).toBe(baseTransaction.mainIconUrl);
  });

  it('renders default icon when mainIconUrl is not provided', async () => {
    const transaction = { ...baseTransaction, mainIconUrl: undefined };
    const page = await createPage(transaction);
    const defaultIcon = page.root.shadowRoot.querySelector('svg');
    expect(defaultIcon).toBeTruthy();
  });

  it('renders transaction details correctly', async () => {
    const page = await createPage(baseTransaction);
    const title = page.root.shadowRoot.querySelector('.transaction-title');
    const details = page.root.shadowRoot.querySelector('.transaction-info');
    
    expect(title.textContent).toBe(baseTransaction.title);
    expect(details.textContent).toContain(baseTransaction.details.directionLabel);
    expect(details.textContent).toContain(baseTransaction.details.initiator);
  });

  it('renders amount with correct styling for positive value', async () => {
    const page = await createPage(baseTransaction);
    const amount = page.root.shadowRoot.querySelector('.transaction-amount');
    
    expect(amount).toHaveClass('amount-positive');
    expect(amount.textContent).toBe(baseTransaction.amount);
  });

  it('renders amount with correct styling for negative value', async () => {
    const transaction = { ...baseTransaction, amount: '-100 EGLD' };
    const page = await createPage(transaction);
    const amount = page.root.shadowRoot.querySelector('.transaction-amount');
    
    expect(amount).toHaveClass('amount-negative');
    expect(amount.textContent).toBe(transaction.amount);
  });

  it('renders right icons when provided', async () => {
    const transaction = {
      ...baseTransaction,
      rightIcons: ['/icon1.svg', '/icon2.svg', '/icon3.svg']
    };
    const page = await createPage(transaction);
    
    const icons = page.root.shadowRoot.querySelectorAll('.asset-image');
    expect(icons.length).toBe(transaction.rightIcons.length);
    icons.forEach((icon, index) => {
      expect(icon.getAttribute('src')).toBe(transaction.rightIcons[index]);
    });
  });

  it('hides amount when right icons are present', async () => {
    const transaction = {
      ...baseTransaction,
      rightIcons: ['/icon1.svg', '/icon2.svg']
    };
    const page = await createPage(transaction);
    
    const amount = page.root.shadowRoot.querySelector('.transaction-amount');
    expect(amount).toBeFalsy();
  });

  it('renders without details when not provided', async () => {
    const transaction = {
      ...baseTransaction,
      details: undefined
    };
    const page = await createPage(transaction);
    
    const details = page.root.shadowRoot.querySelector('.transaction-info');
    expect(details).toBeFalsy();
  });
});
