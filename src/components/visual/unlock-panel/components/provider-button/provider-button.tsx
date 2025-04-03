import { Component, Fragment, h, Prop } from '@stencil/core';
import { ProviderTypeEnum } from 'types/provider.types';

enum ProviderButtonLabelsEnum {
  extension = 'MultiversX Wallet Extension',
  metamask = 'MetaMask Snap',
  passkey = 'Passkey',
  xportal = 'xPortal Wallet',
  ledger = 'Ledger',
  wallet = 'MultiversX Web Wallet',
  xalias = 'Google (xAlias)',
}

const providerButtonInfo = {
  [ProviderTypeEnum.extension]: {
    icon: <mvx-extension-provider-icon />,
    label: ProviderButtonLabelsEnum.extension,
  },
  [ProviderTypeEnum.metamask]: {
    icon: <mvx-metamask-provider-icon />,
    label: ProviderButtonLabelsEnum.metamask,
  },
  [ProviderTypeEnum.passkey]: {
    icon: <mvx-passkey-provider-icon />,
    label: ProviderButtonLabelsEnum.passkey,
  },
  [ProviderTypeEnum.walletConnect]: {
    icon: <mvx-multiversx-logo-icon />,
    label: ProviderButtonLabelsEnum.xportal,
  },
  [ProviderTypeEnum.ledger]: {
    icon: <mvx-ledger-provider-icon />,
    label: ProviderButtonLabelsEnum.ledger,
  },
  [ProviderTypeEnum.crossWindow]: {
    icon: <mvx-wallet-provider-icon />,
    label: ProviderButtonLabelsEnum.wallet,
  },
  [ProviderTypeEnum.xalias]: {
    icon: <mvx-xalias-provider-icon />,
    label: ProviderButtonLabelsEnum.xalias,
  },
};

@Component({
  tag: 'mvx-provider-button',
  styleUrl: 'provider-button.scss',
})
export class ProviderButton {
  @Prop() type: ProviderTypeEnum;
  @Prop() class?: string;

  render() {
    const walletInfo = this.type ? providerButtonInfo[this.type] : null;

    if (!walletInfo) {
      return <Fragment />;
    }

    return <mvx-unlock-button icon={walletInfo.icon} label={walletInfo.label} type={this.type} class={this.class} />;
  }
}
