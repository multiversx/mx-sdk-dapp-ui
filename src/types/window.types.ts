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
