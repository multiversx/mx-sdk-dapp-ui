// types here need to be synced with the types in sdk-dapp-core ledger.types.ts

export interface ITransactionData {
  receiver?: string;
  value?: string;
}

export interface ISignTransactionsModalData {
  transaction: ITransactionData | null;
}

export enum SignEventsEnum {
  'SIGN_TRANSACTION' = 'SIGN_TRANSACTION',
  'NEXT_PAGE' = 'NEXT_PAGE',
  'PREV_PAGE' = 'PREV_PAGE',
  'CLOSE' = 'CLOSE',
  'DATA_UPDATE' = 'DATA_UPDATE',
}
