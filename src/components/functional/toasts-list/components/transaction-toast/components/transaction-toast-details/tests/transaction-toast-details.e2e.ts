import { newE2EPage } from '@stencil/core/testing';
import type { ITransactionListItem } from 'components/visual/transaction-list-item/transaction-list-item.types';

const createMockTransaction = (params: { hash: string; status?: string; timestamp?: number }): ITransactionListItem => ({
  hash: params.hash,
  status: params.status || 'success',
  link: `https://explorer.com/${params.hash}`,
  asset: { text: 'EGLD', imageUrl: 'egld.png' },
  action: { name: 'transfer' },
  interactor: 'wallet1',
  timestamp: params.timestamp || 1234567890,
});

const createMockTransactions = (count: number): ITransactionListItem[] => {
  return Array.from({ length: count }, (_, i) => {
    const index = i + 1;
    const statuses = ['success', 'pending', 'failed'];
    const status = statuses[i % statuses.length];
    return createMockTransaction({
      hash: `tx${index}`,
      status: status,
      timestamp: 1234567890 + i,
    });
  });
};

describe('transaction-toast-details', () => {
  it('renders correctly with transactions', async () => {
    const page = await newE2EPage();
    const mockTransactions = createMockTransactions(3);

    await page.setContent(`
      <mvx-transaction-toast-details
        transaction-class="test-transaction"
        max-shown-transactions="2"
      ></mvx-transaction-toast-details>
    `);

    const component = await page.find('mvx-transaction-toast-details');
    component.setProperty('transactions', mockTransactions);
    component.setProperty('processedTransactionsStatus', '3 Transactions');

    await page.waitForChanges();

    const statusElement = await page.find('.transaction-details-status-text');
    expect(statusElement.textContent).toBe('3 Transactions');

    const transactionItems = await page.findAll('mvx-transaction-toast-details-body');
    expect(transactionItems.length).toBe(2);
  });

  it('expands when status is clicked', async () => {
    const page = await newE2EPage();
    const mockTransactions = createMockTransactions(2);

    await page.setContent(`
      <mvx-transaction-toast-details
        transaction-class="test-transaction"
      ></mvx-transaction-toast-details>
    `);

    const component = await page.find('mvx-transaction-toast-details');
    component.setProperty('transactions', mockTransactions);
    component.setProperty('processedTransactionsStatus', '2 Transactions');

    await page.waitForChanges();

    let detailsList = await page.find('.transaction-details-list');
    expect(detailsList.getAttribute('class')).not.toContain('expanded');

    const statusElement = await page.find('.transaction-details-status');
    await statusElement.click();

    await page.waitForChanges();

    detailsList = await page.find('.transaction-details-list');
    expect(detailsList.getAttribute('class')).toContain('expanded');
  });

  it('shows "Show more" button when there are more transactions than maxShownTransactions', async () => {
    const page = await newE2EPage();
    const mockTransactions = createMockTransactions(6);

    await page.setContent(`
      <mvx-transaction-toast-details
        transaction-class="test-transaction"
        max-shown-transactions="3"
      ></mvx-transaction-toast-details>
    `);

    const component = await page.find('mvx-transaction-toast-details');
    component.setProperty('transactions', mockTransactions);
    component.setProperty('processedTransactionsStatus', '6 Transactions');

    await page.waitForChanges();

    const statusElement = await page.find('.transaction-details-status');
    expect(statusElement).not.toBeNull();
    await statusElement.click();

    await page.waitForChanges();

    const showMoreButton = await page.find('.show-more-button');
    expect(showMoreButton).not.toBeNull();
    expect(showMoreButton.textContent).toContain('View 3 more');

    await showMoreButton.click();
    await page.waitForChanges();

    const transactionItems = await page.findAll('mvx-transaction-toast-details-body');
    expect(transactionItems.length).toBe(6);

    const showMoreButtonAfter = await page.find('.show-more-button');
    expect(showMoreButtonAfter).toBeNull();
  });

  it('renders null when no transactions are provided', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <mvx-transaction-toast-details
        transaction-class="test-transaction"
      ></mvx-transaction-toast-details>
    `);

    await page.waitForChanges();

    const detailsContainer = await page.find('.transaction-details-container');
    expect(detailsContainer).toBeNull();
  });
});
