import { newSpecPage } from '@stencil/core/testing';

import { TransactionDetails } from '../transaction-toast-details';

describe('transaction-toast-details', () => {
  const mockTransactions = [
    { hash: 'hash1', status: 'success', link: 'link1' },
    { hash: 'hash2', status: 'pending', link: 'link2' },
    { hash: 'hash3', status: 'success', link: 'link3' },
    { hash: 'hash4', status: 'fail', link: 'link4' },
    { hash: 'hash5', status: 'pending', link: 'link5' },
    { hash: 'hash6', status: 'success', link: 'link6' },
    { hash: 'hash7', status: 'pending', link: 'link7' },
  ];

  const triggerClick = (element: Element): void => {
    element.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  };

  it('renders with collapsed state by default', async () => {
    const page = await newSpecPage({
      components: [TransactionDetails],
      html: '<transaction-toast-details></transaction-toast-details>',
    });

    page.rootInstance.transactions = mockTransactions;
    page.rootInstance.processedTransactionsStatus = '1/7 transactions processed';
    page.rootInstance.transactionClass = 'test-class';

    await page.waitForChanges();

    // Verify component renders
    expect(page.root).not.toBeNull();

    // Verify initial collapsed state
    const detailsList = page.root.shadowRoot.querySelector('.transaction-details-list');
    expect(detailsList).toBeNull();

    // Verify initial state (collapsed = false, so should use down chevron)
    expect(page.rootInstance.isExpanded).toBe(false);
  });

  it('expands when clicked', async () => {
    const page = await newSpecPage({
      components: [TransactionDetails],
      html: '<transaction-toast-details></transaction-toast-details>',
    });

    page.rootInstance.transactions = mockTransactions;
    page.rootInstance.processedTransactionsStatus = '1/7 transactions processed';
    page.rootInstance.transactionClass = 'test-class';

    await page.waitForChanges();

    // Click to expand
    const statusTitle = page.root.shadowRoot.querySelector('.status-title');
    triggerClick(statusTitle);
    await page.waitForChanges();

    // Verify expanded state
    const detailsList = page.root.shadowRoot.querySelector('.transaction-details-list');
    expect(detailsList).not.toBeNull();

    // Verify expanded state through component property
    expect(page.rootInstance.isExpanded).toBe(true);
  });

  it('shows only maxTransactions by default when expanded', async () => {
    const page = await newSpecPage({
      components: [TransactionDetails],
      html: '<transaction-toast-details></transaction-toast-details>',
    });

    page.rootInstance.transactions = mockTransactions;
    page.rootInstance.processedTransactionsStatus = '1/7 transactions processed';
    page.rootInstance.transactionClass = 'test-class';
    page.rootInstance.maxTransactions = 3; // Only show first 3 transactions

    await page.waitForChanges();

    // Click to expand
    const statusTitle = page.root.shadowRoot.querySelector('.status-title');
    triggerClick(statusTitle);
    await page.waitForChanges();

    // Verify only maxTransactions shown
    const detailsBodies = page.root.shadowRoot.querySelectorAll('transaction-toast-details-body');
    expect(detailsBodies.length).toBe(3);

    // Verify "Show more" button is present
    const showMoreButton = page.root.shadowRoot.querySelector('.show-more-button');
    expect(showMoreButton).not.toBeNull();
    expect(showMoreButton.textContent.trim()).toBe('Show 4 more');
  });

  it('shows all transactions when "Show more" is clicked', async () => {
    const page = await newSpecPage({
      components: [TransactionDetails],
      html: '<transaction-toast-details></transaction-toast-details>',
    });

    page.rootInstance.transactions = mockTransactions;
    page.rootInstance.processedTransactionsStatus = '1/7 transactions processed';
    page.rootInstance.transactionClass = 'test-class';
    page.rootInstance.maxTransactions = 3; // Only show first 3 transactions

    await page.waitForChanges();

    // Click to expand
    const statusTitle = page.root.shadowRoot.querySelector('.status-title');
    triggerClick(statusTitle);
    await page.waitForChanges();

    // Click "Show more" button
    const showMoreButton = page.root.shadowRoot.querySelector('.show-more-button');
    triggerClick(showMoreButton);
    await page.waitForChanges();

    // Verify all transactions are shown
    const detailsBodies = page.root.shadowRoot.querySelectorAll('transaction-toast-details-body');
    expect(detailsBodies.length).toBe(7);

    // Verify "Show more" button is no longer present
    const showMoreButtonAfterClick = page.root.shadowRoot.querySelector('.show-more-button');
    expect(showMoreButtonAfterClick).toBeNull();
  });

  it('resets to showing only maxTransactions when collapsed and re-expanded', async () => {
    const page = await newSpecPage({
      components: [TransactionDetails],
      html: '<transaction-toast-details></transaction-toast-details>',
    });

    page.rootInstance.transactions = mockTransactions;
    page.rootInstance.processedTransactionsStatus = '1/7 transactions processed';
    page.rootInstance.transactionClass = 'test-class';
    page.rootInstance.maxTransactions = 3; // Only show first 3 transactions

    await page.waitForChanges();

    // Click to expand
    const statusTitle = page.root.shadowRoot.querySelector('.status-title');
    triggerClick(statusTitle);
    await page.waitForChanges();

    // Click "Show more" button
    const showMoreButton = page.root.shadowRoot.querySelector('.show-more-button');
    triggerClick(showMoreButton);
    await page.waitForChanges();

    // Verify all transactions are shown
    let detailsBodies = page.root.shadowRoot.querySelectorAll('transaction-toast-details-body');
    expect(detailsBodies.length).toBe(7);

    // Click to collapse
    triggerClick(statusTitle);
    await page.waitForChanges();

    // Verify collapsed state
    const detailsList = page.root.shadowRoot.querySelector('.transaction-details-list');
    expect(detailsList).toBeNull();

    // Click to expand again
    triggerClick(statusTitle);
    await page.waitForChanges();

    // Verify only maxTransactions shown again
    detailsBodies = page.root.shadowRoot.querySelectorAll('transaction-toast-details-body');
    expect(detailsBodies.length).toBe(3);

    // Verify "Show more" button is present again
    const showMoreButtonAfterReExpand = page.root.shadowRoot.querySelector('.show-more-button');
    expect(showMoreButtonAfterReExpand).not.toBeNull();
  });

  it('does not show "Show more" button when transactions <= maxTransactions', async () => {
    const page = await newSpecPage({
      components: [TransactionDetails],
      html: '<transaction-toast-details></transaction-toast-details>',
    });

    // Only 3 transactions
    const fewTransactions = mockTransactions.slice(0, 3);

    page.rootInstance.transactions = fewTransactions;
    page.rootInstance.processedTransactionsStatus = '1/3 transactions processed';
    page.rootInstance.transactionClass = 'test-class';
    page.rootInstance.maxTransactions = 5; // Max is greater than available transactions

    await page.waitForChanges();

    // Click to expand
    const statusTitle = page.root.shadowRoot.querySelector('.status-title');
    triggerClick(statusTitle);
    await page.waitForChanges();

    // Verify all transactions shown
    const detailsBodies = page.root.shadowRoot.querySelectorAll('transaction-toast-details-body');
    expect(detailsBodies.length).toBe(3);

    // Verify "Show more" button is not present
    const showMoreButton = page.root.shadowRoot.querySelector('.show-more-button');
    expect(showMoreButton).toBeNull();
  });
});
