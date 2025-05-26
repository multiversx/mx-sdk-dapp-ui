// types here need to be synced with the types in sdk-dapp providerFactory.constants.ts
import { ProviderTypeEnum } from 'types/provider.types';

export const providerLabels: Record<string, string> = {
  [ProviderTypeEnum.crossWindow]: 'MultiversX Web Wallet',
  [ProviderTypeEnum.extension]: 'MultiversX Wallet Extension',
  [ProviderTypeEnum.walletConnect]: 'xPortal App',
  [ProviderTypeEnum.ledger]: 'Ledger',
  [ProviderTypeEnum.metamask]: 'MetaMask Snap',
  [ProviderTypeEnum.passkey]: 'Passkey',
};
