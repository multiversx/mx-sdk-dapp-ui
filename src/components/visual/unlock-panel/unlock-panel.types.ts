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
  OPEN_UNLOCK_PANEL = 'OPEN_UNLOCK_PANEL',
  CLOSE_UNLOCK_PANEL = 'CLOSE_UNLOCK_PANEL',
  HANDLE_LOGIN = 'HANDLE_LOGIN',
  HANDLE_CANCEL_LOGIN = 'HANDLE_CANCEL_LOGIN',
}
