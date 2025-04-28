export enum WalletConnectEventsEnum {
  CLOSE_WALLET_CONNECT_PANEL = 'CLOSE_WALLET_CONNECT_PANEL',
  OPEN_WALLET_CONNECT_PANEL = 'OPEN_WALLET_CONNECT_PANEL',
  DATA_UPDATE = 'DATA_UPDATE',
  UI_DISCONNECTED = 'UI_DISCONNECTED',
}

export interface IWalletConnectPanelData {
  wcURI: string;
  shouldClose?: boolean;
}
