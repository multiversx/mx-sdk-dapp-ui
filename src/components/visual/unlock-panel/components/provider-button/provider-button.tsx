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
    icon: <extension-provider-icon />,
    label: ProviderButtonLabelsEnum.extension,
  },
  [ProviderTypeEnum.metamask]: {
    icon: <metamask-provider-icon />,
    label: ProviderButtonLabelsEnum.metamask,
  },
  [ProviderTypeEnum.passkey]: {
    icon: <passkey-provider-icon />,
    label: ProviderButtonLabelsEnum.passkey,
  },
  [ProviderTypeEnum.walletConnect]: {
    icon: <multiversx-logo-icon />,
    label: ProviderButtonLabelsEnum.xportal,
  },
  [ProviderTypeEnum.ledger]: {
    icon: <ledger-provider-icon />,
    label: ProviderButtonLabelsEnum.ledger,
  },
  [ProviderTypeEnum.crossWindow]: {
    icon: <wallet-provider-icon />,
    label: ProviderButtonLabelsEnum.wallet,
  },
  [ProviderTypeEnum.xalias]: {
    icon: <xalias-provider-icon />,
    label: ProviderButtonLabelsEnum.xalias,
  },
};

@Component({
  tag: 'provider-button',
  styleUrl: 'provider-button.scss',
  shadow: false,
})
export class ProviderButton {
  @Prop() type: ProviderTypeEnum;
  @Prop() class?: string;

  render() {
    const walletInfo = this.type ? providerButtonInfo[this.type] : null;

    if (!walletInfo) {
      return <Fragment />;
    }

    return <mvx-unlock-button buttonIcon={walletInfo.icon} buttonLabel={walletInfo.label} buttonType={this.type} class={this.class} />;
  }
}
