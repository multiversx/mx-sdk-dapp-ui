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

export interface ISignTransactionsPanelCommonData {
  receiver?: string;
  data?: string;
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
  needsSigning?: boolean;
  isEditable?: boolean;
  highlight?: string | null;
  scCall?: string | null;
  nextUnsignedTxIndex?: number;
}

export interface ISignTransactionsPanelData {
  shouldClose?: boolean;
  commonData: ISignTransactionsPanelCommonData;
  tokenTransaction: {
    identifier?: string;
    amount: string;
    usdValue: string;
  } | null;
  nftTransaction: FungibleTransactionType | null;
  sftTransaction: FungibleTransactionType | null;
}

export enum SignEventsEnum {
  CONFIRM = 'CONFIRM',
  BACK = 'BACK',
  OPEN_SIGN_TRANSACTIONS_PANEL = 'sign-event-open',
  CLOSE_SIGN_TRANSACTIONS = 'sign-event-close',
  DATA_UPDATE = 'sign-event-data-update',
  SET_PPU = 'sign-event-set-ppu',
}
