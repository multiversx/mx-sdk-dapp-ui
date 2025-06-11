import type { IProviderBase } from 'components';

// Extend the Window interface globally to include custom properties
export interface ExtendedWindow extends Window {
  elrondWallet?: {
    extensionId: string;
  };
  multiversxWallet?: {
    extensionId: string;
  };
  ethereum?: {
    isMetaMask?: boolean;
  };
}

// SafeWindowType that ensures a safe access to window properties
export type SafeWindowType<InferredWindowType extends Window = ExtendedWindow> = {
  [Key in keyof InferredWindowType]?: InferredWindowType[Key];
};

export enum UnlockPanelEventsEnum {
  OPEN = 'OPEN',
  CLOSE = 'CLOSE',
  LOGIN = 'LOGIN',
  CANCEL_LOGIN = 'CANCEL_LOGIN',
  CANCEL_IN_PROVIDER = 'CANCEL_IN_PROVIDER',
  /**
   * User clicks Close button inside mounted provider
   */
  ANCHOR_CLOSE = 'ANCHOR_CLOSE',
}

export interface IUnlockPanelManagerData {
  providers: IProviderBase[] | null;
  walletAddress: string | null;
}
