import { Component, h, Prop } from '@stencil/core';
import type { IProviderBase } from 'types/provider.types';
import { ProviderTypeEnum } from 'types/provider.types';

const getProviderButtonIcon = (providerType: IProviderBase['type']) => {
  switch (providerType) {
    case ProviderTypeEnum.extension:
      return <mvx-extension-provider-icon />;
    case ProviderTypeEnum.metamask:
      return <mvx-metamask-provider-icon />;
    case ProviderTypeEnum.passkey:
      return <mvx-passkey-provider-icon />;
    case ProviderTypeEnum.walletConnect:
      return <mvx-multiversx-logo-icon />;
    case ProviderTypeEnum.ledger:
      return <mvx-ledger-provider-icon />;
    case ProviderTypeEnum.crossWindow:
      return <mvx-wallet-provider-icon />;

    default:
      return <mvx-multiversx-logo-icon />;
  }
};

@Component({
  tag: 'mvx-unlock-provider-button',
  shadow: true,
})
export class UnlockProviderButton {
  @Prop() provider: IProviderBase<ProviderTypeEnum>;
  @Prop() class?: string;

  render() {
    if (!this.provider) {
      return null;
    }
    const icon: HTMLElement | null = !this.provider.iconUrl ? getProviderButtonIcon(this.provider.type) : null;

    return <mvx-unlock-button iconUrl={this.provider.iconUrl} label={this.provider.name} type={this.provider.type} class={this.class} icon={icon} />;
  }
}
