import type { ExtendedWindow, SafeWindowType } from '../unlock-panel.types';

// Helper to check if MetaMask is available
export const getIsMetaMaskAvailable = () => {
  const safeWindow = typeof window !== 'undefined' ? (window as ExtendedWindow) : ({} as SafeWindowType);

  // Check if MetaMask is available through the ethereum object and that isMetaMask is true
  return Boolean(safeWindow?.ethereum && safeWindow.ethereum.isMetaMask);
};
