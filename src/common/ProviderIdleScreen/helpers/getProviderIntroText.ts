import type { IProviderBase } from 'types/provider.types';
import { ProviderTypeEnum } from 'types/provider.types';

export const getProviderIntroText = ({
  providerType,
  isLogin,
}: {
  providerType?: IProviderBase['type'];
  isLogin?: boolean;
}) => {
  const loginText = isLogin ? 'connect to your wallet.' : 'sign the transaction.';

  switch (providerType) {
    case ProviderTypeEnum.extension:
      return `Open the MultiversX Browser Extension to ${loginText}`;
    case ProviderTypeEnum.metamask:
      return `Open the Metamask Browser Extension to ${loginText}`;
    case ProviderTypeEnum.walletConnect:
      return `Open Xportal to ${loginText}`;
    case ProviderTypeEnum.crossWindow:
      return `Go to MultiversX Web Wallet to ${loginText}`;
    default:
      return `Go to your connected provider to ${loginText}`;
  }
};
