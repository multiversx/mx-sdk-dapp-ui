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

export type TokenType =
  | 'MetaESDT'
  | 'SemiFungibleESDT'
  | 'NonFungibleESDT'
  | 'FungibleESDT';

export interface ISignTransactionsModalData {
  shouldClose?: true;
  commonData: {
    receiver?: string;
    data?: string;
    transactionsCount: number;
    tokenType?: TokenType;
    egldLabel: string;
    feeLimit?: string;
    feeInFiatLimit?: string | null;
    currentIndex: number;
    nextUnsignedTxIndex?: number;
    highlight?: string;
    scCall?: string;
  };
  tokenTransaction: {
    identifier?: string;
    amount: string;
    usdValue: string;
  } | null;
  nftTransaction: FungibleTransactionType | null;
  sftTransaction: FungibleTransactionType | null;
}

export enum SignEventsEnum {
  'SIGN_TRANSACTION' = 'SIGN_TRANSACTION',
  'NEXT_TRANSACTION' = 'NEXT_TRANSACTION',
  'PREV_TRANSACTION' = 'PREV_TRANSACTION',
  'CLOSE' = 'CLOSE',
  'DATA_UPDATE' = 'DATA_UPDATE'
}
