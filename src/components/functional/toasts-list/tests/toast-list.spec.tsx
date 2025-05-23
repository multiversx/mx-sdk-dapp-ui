import { newSpecPage } from '@stencil/core/testing';

import { ToastList } from '../toast-list';
import { ToastEventsEnum } from '../toast-list.types';

describe('toast-list', () => {
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
      html: '<mvx-toast-list></mvx-toast-list>',
    });

    expect(page.root).not.toBeNull();

    const toastListContainer = page.root.querySelector('.toast-list');
    expect(toastListContainer).not.toBeNull();

    const transactionToasts = page.root.querySelectorAll('transaction-toast');
    const genericToasts = page.root.querySelectorAll('generic-toast');

    expect(transactionToasts.length).toBe(0);
    expect(genericToasts.length).toBe(0);
  });

  it('renders transaction toasts correctly', async () => {
    const page = await newSpecPage({
      components: [ToastList],
      html: '<mvx-toast-list></mvx-toast-list>',
    });

    page.rootInstance.transactionToasts = mockTransactionToasts;
    await page.waitForChanges();

    const transactionToastElements = page.root.querySelectorAll('mvx-transaction-toast');
    expect(transactionToastElements.length).toBe(2);
  });

  it('renders custom toasts correctly', async () => {
    const page = await newSpecPage({
      components: [ToastList],
      html: '<mvx-toast-list></mvx-toast-list>',
    });

    page.rootInstance.customToasts = mockCustomToasts;
    await page.waitForChanges();

    const genericToastElements = page.root.querySelectorAll('mvx-generic-toast');
    expect(genericToastElements.length).toBe(2);
  });

  it('renders both transaction and custom toasts simultaneously', async () => {
    const page = await newSpecPage({
      components: [ToastList],
      html: '<mvx-toast-list></mvx-toast-list>',
    });

    page.rootInstance.transactionToasts = mockTransactionToasts;
    page.rootInstance.customToasts = mockCustomToasts;
    await page.waitForChanges();

    const transactionToastElements = page.root.querySelectorAll('mvx-transaction-toast');
    const genericToastElements = page.root.querySelectorAll('mvx-generic-toast');

    expect(transactionToastElements.length).toBe(2);
    expect(genericToastElements.length).toBe(2);
  });

  it('handles transaction toast deletion correctly', async () => {
    const page = await newSpecPage({
      components: [ToastList],
      html: '<mvx-toast-list></mvx-toast-list>',
    });

    const eventBusMock = {
      publish: jest.fn(),
      subscribe: jest.fn(),
    };
    page.rootInstance.eventBus = eventBusMock;

    page.rootInstance.transactionToasts = mockTransactionToasts;
    await page.waitForChanges();

    page.rootInstance.handleTransactionToastDelete('tx1');

    expect(eventBusMock.publish).toHaveBeenCalledWith(ToastEventsEnum.CLOSE, 'tx1');
  });

  it('handles custom toast deletion correctly', async () => {
    const page = await newSpecPage({
      components: [ToastList],
      html: '<mvx-toast-list></mvx-toast-list>',
    });

    const eventBusMock = {
      publish: jest.fn(),
      subscribe: jest.fn(),
    };
    page.rootInstance.eventBus = eventBusMock;

    page.rootInstance.customToasts = mockCustomToasts;
    await page.waitForChanges();

    page.rootInstance.handleCustomToastDelete('custom1');

    expect(eventBusMock.publish).toHaveBeenCalledWith(ToastEventsEnum.CLOSE, 'custom1');
  });

  it('properly subscribes to events in componentDidLoad', async () => {
    const page = await newSpecPage({
      components: [ToastList],
      html: '<mvx-toast-list></mvx-toast-list>',
    });

    const eventBusMock = {
      publish: jest.fn(),
      subscribe: jest.fn(),
    };
    page.rootInstance.eventBus = eventBusMock;

    page.rootInstance.componentDidLoad();

    expect(eventBusMock.subscribe).toHaveBeenCalledTimes(2);
    expect(eventBusMock.subscribe).toHaveBeenCalledWith(
      ToastEventsEnum.TRANSACTION_TOAST_DATA_UPDATE,
      expect.any(Function),
    );
    expect(eventBusMock.subscribe).toHaveBeenCalledWith(ToastEventsEnum.CUSTOM_TOAST_DATA_UPDATE, expect.any(Function));
  });

  it('updates transaction toasts when receiving the update event', async () => {
    const page = await newSpecPage({
      components: [ToastList],
      html: '<mvx-toast-list></mvx-toast-list>',
    });

    expect(page.rootInstance.transactionToasts).toStrictEqual([]);

    page.rootInstance.transactionToasts = mockTransactionToasts;
    await page.waitForChanges();

    expect(page.rootInstance.transactionToasts).toEqual(mockTransactionToasts);
  });

  it('updates custom toasts when receiving the update event', async () => {
    const page = await newSpecPage({
      components: [ToastList],
      html: '<mvx-toast-list></mvx-toast-list>',
    });

    expect(page.rootInstance.customToasts).toStrictEqual([]);

    page.rootInstance.customToasts = mockCustomToasts;
    await page.waitForChanges();

    expect(page.rootInstance.customToasts).toEqual(mockCustomToasts);
  });

  it('returns the event bus instance when getEventBus is called', async () => {
    const page = await newSpecPage({
      components: [ToastList],
      html: '<mvx-toast-list></mvx-toast-list>',
    });

    const originalEventBus = page.rootInstance.eventBus;

    const returnedEventBus = await page.rootInstance.getEventBus();

    expect(returnedEventBus).toBe(originalEventBus);
  });

  it('renders View All button when transaction toasts are present', async () => {
    const page = await newSpecPage({
      components: [ToastList],
      html: '<mvx-toast-list></mvx-toast-list>',
    });

    page.rootInstance.transactionToasts = mockTransactionToasts;
    await page.waitForChanges();

    const viewAllButton = page.root.querySelector('.view-all-button');
    expect(viewAllButton).not.toBeNull();
    expect(viewAllButton.textContent.trim()).toBe('View All');
  });

  it('does not render View All button when no transaction toasts are present', async () => {
    const page = await newSpecPage({
      components: [ToastList],
      html: '<mvx-toast-list></mvx-toast-list>',
    });

    page.root.customToasts = mockCustomToasts;
    await page.waitForChanges();

    const viewAllButton = page.root.querySelector('.view-all-button');
    expect(viewAllButton).toBeNull();
  });

  it('publishes OPEN event when View All button is clicked', async () => {
    const page = await newSpecPage({
      components: [ToastList],
      html: '<mvx-toast-list></mvx-toast-list>',
    });

    const eventBusMock = {
      publish: jest.fn(),
      subscribe: jest.fn(),
    };
    page.rootInstance.eventBus = eventBusMock;

    page.rootInstance.transactionToasts = mockTransactionToasts;
    await page.waitForChanges();

    page.rootInstance.handleViewAllClick();

    expect(eventBusMock.publish).toHaveBeenCalledWith(ToastEventsEnum.OPEN_NOTIFICATIONS_FEED);
  });
});
