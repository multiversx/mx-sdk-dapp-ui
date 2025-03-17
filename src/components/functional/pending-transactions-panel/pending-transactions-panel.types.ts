// types here need to be synced with the types in sdk-dapp-core pendingTransactions.types.ts

export enum PendingTransactionsEventsEnum {
  CLOSE_PENDING_TRANSACTIONS = 'CLOSE_PENDING_TRANSACTIONS',
  OPEN_PENDING_TRANSACTIONS_PANEL = 'OPEN_PENDING_TRANSACTIONS_PANEL',
  DATA_UPDATE = 'DATA_UPDATE',
}

export interface IPendingTransactionsPanelData {
  isPending: boolean;
  title: string;
  subtitle?: string;
  shouldClose?: boolean;
}
