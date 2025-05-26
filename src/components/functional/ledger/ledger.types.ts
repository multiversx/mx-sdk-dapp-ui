export interface IConnectScreenData {
  customContentMarkup?: string;
  disabled?: boolean;
  error?: string;
}

export interface IAccountScreenData {
  accounts: ILedgerAccount[];
  startIndex: number;
  addressesPerPage: number;
  isLoading: boolean;
}

export interface IConfirmScreenData {
  data?: string;
  selectedAddress: string;
  confirmAddressText?: string;
  authText?: string;
  explorerLink: string;
}

export interface ILedgerConnectPanelData {
  connectScreenData: IConnectScreenData | null;
  accountScreenData: IAccountScreenData | null;
  confirmScreenData: IConfirmScreenData | null;
}

export interface ILedgerAccount {
  address: string;
  balance: string;
  usdValue?: string;
  index: number;
}

export enum LedgerConnectEventsEnum {
  CONNECT_DEVICE = 'CONNECT_DEVICE',
  ACCESS_WALLET = 'ACCESS_WALLET',
  GO_TO_PAGE = 'GO_TO_PAGE',
  CLOSE = 'CLOSE',
  DATA_UPDATE = 'DATA_UPDATE',
  UI_DISCONNECTED = 'UI_DISCONNECTED',
}
