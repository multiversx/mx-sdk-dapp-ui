import type { IProviderBase } from 'types/provider.types';
import { ProviderTypeEnum } from 'types/provider.types';

export const getProviderIntroText = (providerType?: IProviderBase['type']) => {
  switch (providerType) {
    case ProviderTypeEnum.extension:
      return 'Open the MultiversX Browser Extension to sign the transaction.';
    case ProviderTypeEnum.metamask:
      return 'Open the Metamask Browser Extension to sign the transaction.';
    case ProviderTypeEnum.passkey:
      return 'Use your predefined passkey to sign the transaction.';
    case ProviderTypeEnum.walletConnect:
      return 'Open Xportal to sign the transaction.';
    case ProviderTypeEnum.crossWindow:
      return 'Go to MultiversX Web Wallet to sign the transaction.';
    default:
      return 'Go to your connected provider to sign the transaction.';
  }
};
