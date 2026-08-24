import { IconNamesEnum } from 'common/Icon/icon.types';
import type { ITransactionListItem } from 'components/functional/notifications-feed/components/TransactionListItem/transactionListItem.types';
import type {
  IComponentToast,
  ISimpleToast,
  IToastDataState,
  ITransactionToast,
} from 'components/functional/toasts-list/components/transaction-toast/transaction-toast.type';
import { TransactionStatusEnum } from 'constants/transactionStatus.enum';

export const PLACEHOLDER_IMAGE =
  'data:image/svg+xml;utf8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 32 32%22%3E%3Ccircle cx=%2216%22 cy=%2216%22 r=%2216%22 fill=%22%2323f7dd%22/%3E%3C/svg%3E';

const EXAMPLE_ADDRESS = 'erd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th';
const EXAMPLE_HASH = 'd1c9f0b0e8a44a5d9c2a1f3b7e6d5c4b3a291807f6e5d4c3b2a190807f6e5d4c';

export const uniqueToastId = (prefix: string): string => `${prefix}-${Math.random().toString(36).slice(2, 10)}`;

export const createTransaction = (overrides: Partial<ITransactionListItem> = {}): ITransactionListItem => ({
  asset: { text: 'EGLD', imageUrl: PLACEHOLDER_IMAGE },
  action: { name: 'Transfer', description: 'Transfer to account' },
  interactor: EXAMPLE_ADDRESS,
  directionLabel: 'To',
  amount: '-1.5 EGLD',
  hash: EXAMPLE_HASH,
  status: TransactionStatusEnum.success,
  link: `https://devnet-explorer.multiversx.com/transactions/${EXAMPLE_HASH}`,
  timestamp: 1_735_689_600,
  ...overrides,
});

export const createTransactions = (
  count: number,
  status: `${TransactionStatusEnum}` = TransactionStatusEnum.success,
): ITransactionListItem[] =>
  Array.from({ length: count }, (_, index) => {
    const hash = `${index}`.padStart(2, '0') + EXAMPLE_HASH.slice(2);

    return createTransaction({
      hash,
      status,
      link: `https://devnet-explorer.multiversx.com/transactions/${hash}`,
      amount: `-${(index + 1) * 0.25} EGLD`,
      timestamp: 1_735_689_600 + index * 60,
    });
  });

/**
 * Mirrors `getToastDataStateByStatus` in sdk-dapp, which is what actually feeds
 * these components in a real dApp.
 */
export const createToastDataState = (status: `${TransactionStatusEnum}`): IToastDataState => {
  switch (status) {
    case TransactionStatusEnum.success:
      return {
        title: 'Transaction successful',
        icon: IconNamesEnum.circleCheck,
        iconClassName: 'success',
        hasCloseButton: true,
      };
    case TransactionStatusEnum.fail:
    case TransactionStatusEnum.invalid:
      return {
        title: 'Transaction failed',
        icon: IconNamesEnum.fail,
        iconClassName: 'danger',
        hasCloseButton: true,
      };
    default:
      return {
        title: 'Processing transaction',
        icon: IconNamesEnum.hourglass,
        iconClassName: 'pending',
        hasCloseButton: false,
      };
  }
};

export const createTransactionToast = (overrides: Partial<ITransactionToast> = {}): ITransactionToast => {
  const status = overrides.transactions?.[0]?.status ?? TransactionStatusEnum.success;

  return {
    toastId: uniqueToastId('transaction-toast'),
    wrapperClass: 'mvx-transaction-toast-wrapper',
    processedTransactionsStatus: 'Transaction processed',
    transactions: createTransactions(1, status),
    toastDataState: createToastDataState(status),
    transactionProgressState: null,
    ...overrides,
  };
};

/** `startTime`/`endTime` are UNIX seconds, not milliseconds. */
export const createProgressState = (durationInSeconds = 30, isCrossShard = false) => {
  const startTime = Math.floor(Date.now() / 1000);

  return { startTime, endTime: startTime + durationInSeconds, isCrossShard };
};

export const createSimpleToast = (overrides: Partial<ISimpleToast> = {}): ISimpleToast => ({
  toastId: uniqueToastId('simple-toast'),
  icon: IconNamesEnum.circleInfo,
  iconClassName: 'success',
  title: 'Custom toast',
  message: 'This is a custom toast message.',
  hasCloseButton: true,
  ...overrides,
});

export const createComponentToast = (overrides: Partial<IComponentToast> = {}): IComponentToast => ({
  toastId: uniqueToastId('component-toast'),
  hasCloseButton: true,
  instantiateToastElement: () => {
    const element = document.createElement('div');
    element.className = 'mvx:flex mvx:flex-col mvx:gap-1 mvx:p-2';
    element.innerHTML =
      '<strong>Agnostic component</strong><span>Built with document.createElement and handed over as a function prop.</span>';

    return element;
  },
  ...overrides,
});
