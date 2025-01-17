// types here need to be synced with the types in sdk-dapp-core signTransactionsModal.types.ts
import { EsdtEnumType, NftEnumType } from 'types/tokens.types';

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

export type TokenType = EsdtEnumType | NftEnumType;

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
    /**
     * Tracks the index of the next unsigned transaction to be processed.
     */
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
