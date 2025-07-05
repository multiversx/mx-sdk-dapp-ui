import type { IAddressTableData } from 'types/address-table.types';

export interface IConnectScreenData {
  customContentMarkup?: string;
  disabled?: boolean;
  error?: string;
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
  accountScreenData: IAddressTableData | null;
  confirmScreenData: IConfirmScreenData | null;
}

export enum LedgerConnectEventsEnum {
  CONNECT_DEVICE = 'CONNECT_DEVICE',
  ACCESS_WALLET = 'ACCESS_WALLET',
  GO_TO_PAGE = 'GO_TO_PAGE',
  CLOSE = 'CLOSE',
  DATA_UPDATE = 'DATA_UPDATE',
  UI_DISCONNECTED = 'UI_DISCONNECTED',
}
