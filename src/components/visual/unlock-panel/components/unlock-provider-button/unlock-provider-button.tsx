import { Component, Fragment, h, Prop } from '@stencil/core';
import { ProviderLabelsEnum, ProviderTypeEnum } from 'types/provider.types';

const providerButtonInfo = {
  [ProviderTypeEnum.extension]: {
    icon: <mvx-extension-provider-icon />,
    label: ProviderLabelsEnum.extension,
  },
  [ProviderTypeEnum.metamask]: {
    icon: <mvx-metamask-provider-icon />,
    label: ProviderLabelsEnum.metamask,
  },
  [ProviderTypeEnum.passkey]: {
    icon: <mvx-passkey-provider-icon />,
    label: ProviderLabelsEnum.passkey,
  },
  [ProviderTypeEnum.walletConnect]: {
    icon: <mvx-multiversx-logo-icon />,
    label: ProviderLabelsEnum.walletConnect,
  },
  [ProviderTypeEnum.ledger]: {
    icon: <mvx-ledger-provider-icon />,
    label: ProviderLabelsEnum.ledger,
  },
  [ProviderTypeEnum.crossWindow]: {
    icon: <mvx-wallet-provider-icon />,
    label: ProviderLabelsEnum.crossWindow,
  },
  [ProviderTypeEnum.xalias]: {
    icon: <mvx-xalias-provider-icon />,
    label: ProviderLabelsEnum.xalias,
  },
};

@Component({
  tag: 'mvx-unlock-provider-button',
  shadow: true,
})
export class UnlockProviderButton {
  @Prop() type: ProviderTypeEnum;
  @Prop() providers: string[];
  @Prop() class?: string;

  render() {
    const walletInfo = this.type ? providerButtonInfo[this.type] : null;

    if (!walletInfo) {
      return <Fragment />;
    }

    return <mvx-unlock-button icon={walletInfo.icon} label={walletInfo.label} type={this.type} class={this.class} />;
  }
}
