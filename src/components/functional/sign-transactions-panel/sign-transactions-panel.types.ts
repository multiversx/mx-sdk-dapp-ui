// types here need to be synced with the types in sdk-dapp-core signTransactionsModal.types.ts
import type { EsdtEnumType, NftEnumType } from 'types/tokens.types';

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

export interface ISignTransactionsPanelData {
  commonData: {
    transactionsCount: number;
    currentIndex: number;
    tokenType?: string;
    egldLabel?: string;
    feeLimit?: string;
    feeInFiatLimit?: string;
    receiver?: string;
    data?: string;
    nextUnsignedTxIndex?: number;
    highlight?: string;
    scCall?: string;
  };
  tokenTransaction: any;
  sftTransaction: any;
  nftTransaction: any;
  isLoading?: boolean;
  isWaitingForSignature?: boolean;
}

export enum SignEventsEnum {
  DATA_UPDATE = 'sign-event-data-update',
  SIGN_TRANSACTION = 'sign-event-sign-transaction',
  PREV_TRANSACTION = 'sign-event-prev-transaction',
  NEXT_TRANSACTION = 'sign-event-next-transaction',
  CLOSE_SIGN_TRANSACTIONS = 'sign-event-close',
  OPEN_SIGN_TRANSACTIONS_PANEL = 'sign-event-open',
}
