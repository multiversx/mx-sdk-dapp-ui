// types here need to be synced with the types in sdk-dapp providerFactory.types.ts
export enum ProviderTypeEnum {
  extension = 'extension',
  metamask = 'metamask',
  crossWindow = 'crossWindow',
  walletConnect = 'walletConnect',
  ledger = 'ledger',
  passkey = 'passkey',
}

export interface IProviderBase<T extends ProviderTypeEnum = ProviderTypeEnum> {
  name: string;
  type: T[keyof T];
  iconUrl?: string;
}
