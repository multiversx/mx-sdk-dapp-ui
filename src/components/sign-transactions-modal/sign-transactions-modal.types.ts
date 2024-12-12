// types here need to be synced with the types in sdk-dapp-core signTransactionsModal.types.ts

export interface ITransactionData {
  receiver?: string;
  value?: string;
  data?: string;
}

export interface ISignTransactionsModalData {
  transaction: ITransactionData | null;
  shouldClose?: true;
}

export enum SignEventsEnum {
  'SIGN_TRANSACTION' = 'SIGN_TRANSACTION',
  'NEXT_PAGE' = 'NEXT_PAGE',
  'PREV_PAGE' = 'PREV_PAGE',
  'CLOSE' = 'CLOSE',
  'DATA_UPDATE' = 'DATA_UPDATE',
}
