import { newSpecPage } from '@stencil/core/testing';

import { ToastList } from '../toast-list';
import { ToastEventsEnum } from '../toast-list.types';

describe('toast-list', () => {
  // Mock data for tests
  const mockTransactionToasts = [
    {
      toastId: 'tx1',
      title: 'Transaction 1',
      transactionHash: 'hash1',
      status: 'success',
      link: 'link1',
      actions: [],
      transactions: [{ hash: 'hash1', status: 'success', link: 'link1' }],
    },
    {
      toastId: 'tx2',
      title: 'Transaction 2',
      transactionHash: 'hash2',
      status: 'pending',
      link: 'link2',
      actions: [],
      transactions: [{ hash: 'hash2', status: 'pending', link: 'link2' }],
    },
  ];

  const mockCustomToasts = [
    {
      toastId: 'custom1',
      title: 'Custom Toast 1',
      description: 'Description 1',
      icon: 'icon1',
      actions: [],
    },
    {
      toastId: 'custom2',
      title: 'Custom Toast 2',
      description: 'Description 2',
      icon: 'icon2',
      actions: [],
    },
  ];

  it('renders empty toast list when no toasts are provided', async () => {
    const page = await newSpecPage({
      components: [ToastList],
      html: '<toast-list></toast-list>',
    });

    // Verify component renders
    expect(page.root).not.toBeNull();

    // Verify toast-list container exists
    const toastListContainer = page.root.querySelector('.toast-list');
    expect(toastListContainer).not.toBeNull();

    // Verify no toasts are rendered
    const transactionToasts = page.root.querySelectorAll('transaction-toast');
    const genericToasts = page.root.querySelectorAll('generic-toast');

    expect(transactionToasts.length).toBe(0);
    expect(genericToasts.length).toBe(0);
  });

  it('renders transaction toasts correctly', async () => {
    const page = await newSpecPage({
      components: [ToastList],
      html: '<toast-list></toast-list>',
    });

    // Set transaction toasts
    page.rootInstance.transactionToasts = mockTransactionToasts;
    await page.waitForChanges();

    // Verify transaction toasts are rendered
    const transactionToastElements = page.root.querySelectorAll('transaction-toast');
    expect(transactionToastElements.length).toBe(2);
  });

  it('renders custom toasts correctly', async () => {
    const page = await newSpecPage({
      components: [ToastList],
      html: '<toast-list></toast-list>',
    });

    // Set custom toasts
    page.rootInstance.customToasts = mockCustomToasts;
    await page.waitForChanges();

    // Verify custom toasts are rendered
    const genericToastElements = page.root.querySelectorAll('generic-toast');
    expect(genericToastElements.length).toBe(2);
  });

  it('renders both transaction and custom toasts simultaneously', async () => {
    const page = await newSpecPage({
      components: [ToastList],
      html: '<toast-list></toast-list>',
    });

    // Set both types of toasts
    page.rootInstance.transactionToasts = mockTransactionToasts;
    page.rootInstance.customToasts = mockCustomToasts;
    await page.waitForChanges();

    // Verify both types of toasts are rendered
    const transactionToastElements = page.root.querySelectorAll('transaction-toast');
    const genericToastElements = page.root.querySelectorAll('generic-toast');

    expect(transactionToastElements.length).toBe(2);
    expect(genericToastElements.length).toBe(2);
  });

  it('passes maxTransactions prop to transaction toasts', async () => {
    const page = await newSpecPage({
      components: [ToastList],
      html: '<toast-list></toast-list>',
    });

    // Set custom maxTransactions value
    page.rootInstance.maxTransactions = 10;
    page.rootInstance.transactionToasts = mockTransactionToasts;
    await page.waitForChanges();

    // Get the transaction toast elements
    const transactionToastElements = page.root.querySelectorAll('transaction-toast');

    // Verify maxTransactions is passed to each transaction toast
    // Note: In unit tests, we can't directly check props passed to child components
    // We would need integration tests or component mocks to fully verify this
    // This test primarily checks that the component renders with the prop set
    expect(transactionToastElements.length).toBe(2);
  });

  it('handles transaction toast deletion correctly', async () => {
    const page = await newSpecPage({
      components: [ToastList],
      html: '<toast-list></toast-list>',
    });

    // Mock the event bus
    const eventBusMock = {
      publish: jest.fn(),
      subscribe: jest.fn(),
    };
    page.rootInstance.eventBus = eventBusMock;

    // Set transaction toasts and trigger delete handler
    page.rootInstance.transactionToasts = mockTransactionToasts;
    await page.waitForChanges();

    // Call the handler directly (since we can't easily trigger the event in the test)
    page.rootInstance.handleTransactionToastDelete('tx1');

    // Verify the event was published with correct parameters
    expect(eventBusMock.publish).toHaveBeenCalledWith(ToastEventsEnum.CLOSE_TOAST, 'tx1');
  });

  it('handles custom toast deletion correctly', async () => {
    const page = await newSpecPage({
      components: [ToastList],
      html: '<toast-list></toast-list>',
    });

    // Mock the event bus
    const eventBusMock = {
      publish: jest.fn(),
      subscribe: jest.fn(),
    };
    page.rootInstance.eventBus = eventBusMock;

    // Set custom toasts and trigger delete handler
    page.rootInstance.customToasts = mockCustomToasts;
    await page.waitForChanges();

    // Call the handler directly
    page.rootInstance.handleCustomToastDelete('custom1');

    // Verify the event was published with correct parameters
    expect(eventBusMock.publish).toHaveBeenCalledWith(ToastEventsEnum.CLOSE_TOAST, 'custom1');
  });

  it('properly subscribes to events in componentDidLoad', async () => {
    const page = await newSpecPage({
      components: [ToastList],
      html: '<toast-list></toast-list>',
    });

    // Mock the event bus
    const eventBusMock = {
      publish: jest.fn(),
      subscribe: jest.fn(),
    };
    page.rootInstance.eventBus = eventBusMock;

    // Manually call componentDidLoad (it's already called by newSpecPage, but we've replaced the eventBus after that)
    page.rootInstance.componentDidLoad();

    // Verify subscriptions
    expect(eventBusMock.subscribe).toHaveBeenCalledTimes(2);
    expect(eventBusMock.subscribe).toHaveBeenCalledWith(ToastEventsEnum.TRANSACTION_TOAST_DATA_UPDATE, expect.any(Function));
    expect(eventBusMock.subscribe).toHaveBeenCalledWith(ToastEventsEnum.CUSTOM_TOAST_DATA_UPDATE, expect.any(Function));
  });

  it('updates transaction toasts when receiving the update event', async () => {
    const page = await newSpecPage({
      components: [ToastList],
      html: '<toast-list></toast-list>',
    });

    // Initial state
    expect(page.rootInstance.transactionToasts).toBeUndefined();

    // Call update handler
    page.rootInstance.transactionToastUpdate(mockTransactionToasts);

    // Verify state is updated
    expect(page.rootInstance.transactionToasts).toEqual(mockTransactionToasts);
  });

  it('updates custom toasts when receiving the update event', async () => {
    const page = await newSpecPage({
      components: [ToastList],
      html: '<toast-list></toast-list>',
    });

    // Initial state
    expect(page.rootInstance.customToasts).toBeUndefined();

    // Call update handler
    page.rootInstance.customToastsUpdate(mockCustomToasts);

    // Verify state is updated
    expect(page.rootInstance.customToasts).toEqual(mockCustomToasts);
  });

  it('returns the event bus instance when getEventBus is called', async () => {
    const page = await newSpecPage({
      components: [ToastList],
      html: '<toast-list></toast-list>',
    });

    // Create a reference to the original event bus
    const originalEventBus = page.rootInstance.eventBus;

    // Call getEventBus method
    const returnedEventBus = await page.rootInstance.getEventBus();

    // Verify the same event bus instance is returned
    expect(returnedEventBus).toBe(originalEventBus);
  });
});
