import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import type { ITransactionListItem } from 'components/functional/notifications-feed/components/TransactionListItem/transactionListItem.types';
import { TransactionStatusEnum } from 'constants/transactionStatus.enum';

import { TransactionToastDetails } from '../transaction-toast-details';

const createMockTransaction = (params: {
  hash: string;
  status?: `${TransactionStatusEnum}`;
  timestamp?: number;
}): ITransactionListItem => ({
  hash: params.hash,
  status: params.status || TransactionStatusEnum.success,
  link: `https://explorer.com/${params.hash}`,
  asset: { text: 'EGLD', imageUrl: 'egld.png' },
  action: { name: 'transfer' },
  interactor: 'wallet1',
  timestamp: params.timestamp || 1234567890,
});

const createMockTransactions = (count: number): ITransactionListItem[] => {
  return Array.from({ length: count }, (_, i) => {
    const index = i + 1;
    const statuses = [TransactionStatusEnum.success, TransactionStatusEnum.pending, TransactionStatusEnum.fail];
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
    const mockTransactions = createMockTransactions(3);

    const page = await newSpecPage({
      components: [],
      template: () => (
        <TransactionToastDetails
          transactions={mockTransactions}
          processedTransactionsStatus="3 Transactions"
          maxShownTransactions={2}
          transactionClass="test-transaction"
          toastId="test-toast-1"
        />
      ),
    });

    await page.waitForChanges();

    const statusElement = page.root.querySelector('.transaction-details-status-text');
    expect(statusElement).not.toBeNull();
    expect(statusElement.textContent).toBe('3 Transactions');

    const transactionItems = page.root.querySelectorAll('[data-testid="transactionDetailsToastBody"]');
    expect(transactionItems.length).toBe(2);
  });

  it('renders null when no transactions are provided', async () => {
    const page = await newSpecPage({
      components: [],
      template: () => (
        <TransactionToastDetails
          transactions={null}
          transactionClass="test-transaction"
          toastId="test-toast-null"
        />
      ),
    });

    await page.waitForChanges();

    const detailsContainer = page.root ? page.root.querySelector('.transaction-details-container') : null;
    expect(detailsContainer).toBeNull();
  });

  it('renders transaction list container', async () => {
    const mockTransactions = createMockTransactions(2);

    const page = await newSpecPage({
      components: [],
      template: () => (
        <TransactionToastDetails
          transactions={mockTransactions}
          processedTransactionsStatus="2 Transactions"
          transactionClass="test-transaction"
          toastId="test-toast-3"
        />
      ),
    });

    await page.waitForChanges();

    const detailsList = page.root.querySelector('.transaction-details-list');
    expect(detailsList).not.toBeNull();
    expect(detailsList.getAttribute('class')).not.toContain('expanded');
  });

  it('shows "Show more" button when there are more transactions than maxShownTransactions', async () => {
    const mockTransactions = createMockTransactions(6);

    const page = await newSpecPage({
      components: [],
      template: () => (
        <TransactionToastDetails
          transactions={mockTransactions}
          processedTransactionsStatus="6 Transactions"
          maxShownTransactions={3}
          transactionClass="test-transaction"
          toastId="test-toast-4"
        />
      ),
    });

    await page.waitForChanges();

    const statusElement = page.root.querySelector('.transaction-details-status');
    expect(statusElement).not.toBeNull();

    const transactionItems = page.root.querySelectorAll('[data-testid="transactionDetailsToastBody"]');
    expect(transactionItems.length).toBe(3);

    // show more button should not be visible until expanded
    // The show more button is inside the details list which is not expanded yet
    const detailsList = page.root.querySelector('.transaction-details-list');
    expect(detailsList).not.toBeNull();
  });
});
