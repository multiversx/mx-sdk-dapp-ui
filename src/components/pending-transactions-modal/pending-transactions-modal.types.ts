// types here need to be synced with the types in sdk-dapp-core pendingTransactions.types.ts

import { ProviderTypeEnum } from 'types/provider.types';

export enum PendingTransactionsEventsEnum {
  'CLOSE' = 'CLOSE',
  'DATA_UPDATE' = 'DATA_UPDATE',
}

export interface IPendingTransactionsModalData {
  isPending: boolean;
  title: string;
  subtitle?: string;
  type: ProviderTypeEnum;
}
