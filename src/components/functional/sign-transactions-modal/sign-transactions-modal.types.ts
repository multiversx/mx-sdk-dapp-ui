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

export interface ISignTransactionsModalCommonData {
  receiver?: string;
  data?: string;
  gasPrice?: string;
  gasPriceMultiplier?: 1 | 2 | 3;
  gasLimit?: string;
  transactionsCount: number;
  tokenType?: TokenType;
  egldLabel: string;
  feeLimit?: string;
  feeInFiatLimit?: string | null;
  currentTransactionIndex: number;
  needsSigning?: boolean;
  highlight?: string | null;
  scCall?: string | null;
}
export interface ISignTransactionsModalData {
  shouldClose?: true;
  commonData: ISignTransactionsModalCommonData;
  tokenTransaction: {
    identifier?: string;
    amount: string;
    usdValue: string;
  } | null;
  nftTransaction: FungibleTransactionType | null;
  sftTransaction: FungibleTransactionType | null;
}

export enum SignEventsEnum {
  'CONFIRM' = 'CONFIRM', // can be sign or next
  'BACK' = 'BACK',
  'CLOSE' = 'CLOSE',
  'DATA_UPDATE' = 'DATA_UPDATE',
  'SET_GAS_PRICE_MULTIPLIER' = 'SET_GAS_PRICE_MULTIPLIER',
}
