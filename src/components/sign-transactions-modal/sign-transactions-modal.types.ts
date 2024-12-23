// types here need to be synced with the types in sdk-dapp-core signTransactionsModal.types.ts

export interface ITransactionData {
  receiver?: string;
  data?: string;
  value?: string;
}

export type FungibleTransactionType = {
  amount: string;
  identifier?: string;
  imageURL: string;
};

export type TokenTransactionType = {
  identifier?: string;
  amount: string;
  usdValue: string;
};

export interface ISignTransactionsModalData {
  commonData: {
    receiver?: string;
    data?: string;
    transactionsCount: number;
    /**
     * Token type of the transaction.
     * @param {string} `null` - if is EGLD or MultiEsdt transaction.
     */
    tokenType?: 'SemiFungibleESDT' | 'NonFungibleESDT' | 'FungibleESDT' | null;
    egldLabel: string;
    feeLimit?: string;
    feeInFiatLimit?: string | null;
    currentIndex: number;
  };
  shouldClose?: true;
  tokenTransaction: TokenTransactionType | null;
  nftTransaction: FungibleTransactionType | null;
  sftTransaction: FungibleTransactionType | null;
}

export enum SignEventsEnum {
  'SIGN_TRANSACTION' = 'SIGN_TRANSACTION',
  'NEXT_PAGE' = 'NEXT_PAGE',
  'PREV_PAGE' = 'PREV_PAGE',
  'CLOSE' = 'CLOSE',
  'DATA_UPDATE' = 'DATA_UPDATE',
}
