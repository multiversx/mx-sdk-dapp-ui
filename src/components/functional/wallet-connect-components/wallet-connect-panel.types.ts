export enum WalletConnectEventsEnum {
  'CLOSE' = 'CLOSE', //  close modal event
  'DATA_UPDATE' = 'DATA_UPDATE', // update data event
}

export interface IWalletConnectPanelData {
  wcURI: string;
  shouldClose?: boolean;
}
