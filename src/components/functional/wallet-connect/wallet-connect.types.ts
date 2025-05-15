export interface IWalletConnectPanelData {
  wcURI: string;
}

export enum WalletConnectEventsEnum {
  CLOSE = 'CLOSE',
  OPEN = 'OPEN',
  DATA_UPDATE = 'DATA_UPDATE',
  UI_DISCONNECTED = 'UI_DISCONNECTED',
}
