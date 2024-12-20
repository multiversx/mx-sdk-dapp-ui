// types here need to be synced with the types in sdk-dapp-core signTransactionsModal.types.ts

export interface ITransactionData {
  receiver?: string;
  data?: string;
  value?: string;
}

export interface ISignTransactionsModalData {
  transaction: ITransactionData | null;
  total: number;
  /**
   * Token type of the transaction.
   * @param {string} `null` - if is EGLD or MultiEsdt transaction.
   */
  tokenType?: 'SemiFungibleESDT' | 'NonFungibleESDT' | 'FungibleESDT' | null;
  identifier?: string;
  tokenAmount?: string;
  tokenImageUrl?: string;
  egldLabel: string;
  usdValue?: string;
  feeLimit?: string;
  feeInFiatLimit?: string | null;
  currentIndex: number;
  shouldClose?: true;
}

export enum SignEventsEnum {
  'SIGN_TRANSACTION' = 'SIGN_TRANSACTION',
  'NEXT_PAGE' = 'NEXT_PAGE',
  'PREV_PAGE' = 'PREV_PAGE',
  'CLOSE' = 'CLOSE',
  'DATA_UPDATE' = 'DATA_UPDATE',
}
