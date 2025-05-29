// types here need to be synced with the types in sdk-dapp signTransactionsModal.types.ts
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

export interface ISignTransactionsPanelCommonData {
  receiver?: string;
  receiverIcon?: string;
  data?: string;
  decodedData?: Partial<Record<DecodeMethodEnum, DecodedDisplayType>>;
  gasPrice?: string;
  /**
   * ppu - Price Per Unit
   * a constant that is used to calculate the gas price inside `recommendGasPrice`
   */
  ppu?: number;
  ppuOptions: {
    label: string;
    value: number;
  }[];
  gasLimit?: string;
  transactionsCount: number;
  tokenType?: TokenType;
  egldLabel: string;
  feeLimit?: string;
  feeInFiatLimit?: string | null;
  currentIndex: number;
  currentIndexToSign: number;
  needsSigning?: boolean;
  isEditable?: boolean;
  highlight?: string | null;
  scCall?: string | null;
  nextUnsignedTxIndex?: number;
  providerName?: string;
  address?: string;
  username?: string;
  origin?: string;
  explorerLink?: string;
}

export interface ISignTransactionsPanelData {
  isLoading?: boolean;
  commonData: ISignTransactionsPanelCommonData;
  tokenTransaction: {
    identifier?: string;
    amount: string;
    usdValue: string;
    imageURL?: string;
  } | null;
  nftTransaction: FungibleTransactionType | null;
  sftTransaction: FungibleTransactionType | null;
}

export enum DecodeMethodEnum {
  raw = 'raw',
  text = 'text',
  decimal = 'decimal',
  smart = 'smart',
}

export type DecodedDisplayType = {
  displayValue: string;
  validationWarnings: string[];
  highlight: string | null;
};

export enum SignEventsEnum {
  CONFIRM = 'CONFIRM_SIGN_TRANSACTIONS', // can be sign or next
  BACK = 'BACK_SIGN_TRANSACTIONS',
  NEXT = 'NEXT_SIGN_TRANSACTIONS',
  DATA_UPDATE = 'DATA_UPDATE_SIGN_TRANSACTIONS',
  SET_PPU = 'SET_PPU_SIGN_TRANSACTIONS',
  CLOSE = 'CLOSE_SIGN_TRANSACTIONS',
}

export enum TransactionTabsEnum {
  overview = 'overview',
  advanced = 'advanced',
}

export interface IOverviewProps {
  identifier: string;
  usdValue: string;
  amount: string;
  tokenIconUrl: string;
  interactor: string;
  interactorIconUrl: string;
  action: string;
  networkFee: string;
  isApp: boolean;
}
