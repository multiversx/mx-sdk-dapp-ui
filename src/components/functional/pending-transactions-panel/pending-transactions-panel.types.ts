// types here need to be synced with the types in sdk-dapp-core pendingTransactions.types.ts

export enum PendingTransactionsEventsEnum {
  'CLOSE' = 'CLOSE',
  'DATA_UPDATE' = 'DATA_UPDATE',
}

export interface IPendingTransactionsPanelData {
  isPending: boolean;
  title: string;
  subtitle?: string;
  shouldClose?: boolean;
}
