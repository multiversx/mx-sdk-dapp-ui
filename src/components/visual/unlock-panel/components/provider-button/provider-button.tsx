import { Component, Fragment, h, Prop } from '@stencil/core';
import { ProviderTypeEnum } from 'types/provider.types';

const providerButtonInfo = {
  [ProviderTypeEnum.extension]: {
    icon: <extension-provider-icon />,
    label: 'MultiversX Wallet Extension',
  },
  [ProviderTypeEnum.metamask]: {
    icon: <metamask-provider-icon />,
    label: 'Metamask Snap',
  },
  [ProviderTypeEnum.passkey]: {
    icon: <passkey-provider-icon />,
    label: 'Passkey',
  },
  [ProviderTypeEnum.walletConnect]: {
    icon: <xportal-provider-icon />,
    label: 'xPortal Wallet',
  },
  [ProviderTypeEnum.ledger]: {
    icon: <ledger-provider-icon />,
    label: 'Ledger',
  },
  [ProviderTypeEnum.crossWindow]: {
    icon: <wallet-provider-icon />,
    label: 'MultiversX Web Wallet',
  },
  [ProviderTypeEnum.xalias]: {
    icon: <xalias-provider-icon />,
    label: 'xAlias',
  },
};

@Component({
  tag: 'provider-button',
  styleUrl: 'provider-button.scss',
  shadow: true,
})
export class ProviderButton {
  @Prop() type: ProviderTypeEnum;

  render() {
    const walletInfo = this.type ? providerButtonInfo[this.type] : null;
    if (!walletInfo) {
      return <Fragment />;
    }

    return <unlock-button icon={walletInfo.icon} label={walletInfo.label}></unlock-button>;
  }
}
