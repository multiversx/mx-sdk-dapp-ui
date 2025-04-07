// types here need to be synced with the types in sdk-dapp-core providerFactory.types.ts

export enum ProviderTypeEnum {
  extension = 'extension',
  metamask = 'metamask',
  crossWindow = 'crossWindow',
  walletConnect = 'walletConnect',
  ledger = 'ledger',
  passkey = 'passkey',
  xalias = 'xalias',
}

export enum ProviderLabelsEnum {
  extension = 'MultiversX Wallet Extension',
  metamask = 'MetaMask Snap',
  passkey = 'Passkey',
  walletConnect = 'xPortal App',
  ledger = 'Ledger',
  crossWindow = 'MultiversX Web Wallet',
  xalias = 'Google (xAlias)',
}
