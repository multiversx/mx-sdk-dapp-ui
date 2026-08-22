import { newSpecPage } from '@stencil/core/testing';
import { TransactionStatusEnum } from 'constants/transactionStatus.enum';

import { ToastList } from '../toast-list';
import { ToastEventsEnum } from '../toast-list.types';
import { createSimpleToast, createToastDataState, createTransactions, createTransactionToast } from './mocks/toasts';

describe('toast-list', () => {
  const mockTransactionToasts = [
    createTransactionToast({ toastId: 'tx1' }),
    createTransactionToast({
      toastId: 'tx2',
      transactions: createTransactions(1, TransactionStatusEnum.pending),
      toastDataState: createToastDataState(TransactionStatusEnum.pending),
    }),
  ];

  const mockCustomToasts = [
    createSimpleToast({ toastId: 'custom1', title: 'Custom Toast 1', message: 'Description 1' }),
    createSimpleToast({ toastId: 'custom2', title: 'Custom Toast 2', message: 'Description 2' }),
  ];

  it('renders empty toast list when no toasts are provided', async () => {
    const page = await newSpecPage({
      components: [ToastList],
      html: '<mvx-toast-list></mvx-toast-list>',
    });

    expect(page.root).not.toBeNull();

    const toastListContainer = page.root.querySelector('.mvx-toast-list');
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

    expect(eventBusMock.subscribe).toHaveBeenCalledTimes(4);
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

    const viewAllButton = page.root.querySelector('.mvx-view-all-button');
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

    const viewAllButton = page.root.querySelector('.mvx-view-all-button');
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
