import { safeWindow } from 'constants/window.constants';

export const getIsExtensionAvailable = () => {
  // Check if either elrondWallet or multiversxWallet exists and has an extensionId
  return Boolean(safeWindow?.elrondWallet) || Boolean(safeWindow?.multiversxWallet);
};
