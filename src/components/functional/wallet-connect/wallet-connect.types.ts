export enum WalletConnectEventsEnum {
  CLOSE = 'CLOSE',
  DATA_UPDATE = 'DATA_UPDATE',
  UI_DISCONNECTED = 'UI_DISCONNECTED',
}

export interface IWalletConnectPanelData {
  wcURI: string;
  walletConnectDeepLink?: string;
}
