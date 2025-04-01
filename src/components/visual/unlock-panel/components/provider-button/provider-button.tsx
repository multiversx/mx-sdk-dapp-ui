import { Component, Fragment, h, Prop } from '@stencil/core';
import { ProviderTypeEnum } from 'types/provider.types';

const providerButtonInfo = {
  [ProviderTypeEnum.extension]: {
    icon: <Fragment></Fragment>,
    label: 'MultiversX Wallet Extension',
  },
  [ProviderTypeEnum.metamask]: {
    icon: <Fragment></Fragment>,
    label: 'Metamask Snap',
  },
  [ProviderTypeEnum.passkey]: {
    icon: <Fragment></Fragment>,
    label: 'Passkey',
  },
  [ProviderTypeEnum.walletConnect]: {
    icon: <Fragment></Fragment>,
    label: 'xPortal Wallet',
  },
  [ProviderTypeEnum.ledger]: {
    icon: <Fragment></Fragment>,
    label: 'Ledger',
  },
  [ProviderTypeEnum.crossWindow]: {
    icon: <Fragment></Fragment>,
    label: 'MultiversX Web Wallet',
  },
};

@Component({
  tag: 'mvx-provider-button',
  styleUrl: 'provider-button.scss',
  shadow: true,
})
export class ProviderButton {
  @Prop() type: ProviderTypeEnum;

  render() {
    const walletInfo = this.type ? providerButtonInfo[this.type] : null;
    if (!walletInfo) {
      return <Fragment></Fragment>;
    }

    return <mvx-unlock-button icon={walletInfo.icon} label={walletInfo.label}></mvx-unlock-button>;
  }
}
