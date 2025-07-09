import { safeWindow } from 'constants/window.constants';

// Helper to check if MetaMask is available
export const getIsMetaMaskAvailable = () => {
  // Check if MetaMask is available through the ethereum object and that isMetaMask is true
  return Boolean(safeWindow?.ethereum && safeWindow.ethereum.isMetaMask);
};
