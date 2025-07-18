import { h } from '@stencil/core';
import type { IProviderBase } from 'types/provider.types';
import { ProviderTypeEnum } from 'types/provider.types';
import { getBrowserDetect } from 'utils/getBrowserDetect';

export const getProviderButtonIcon = (providerType: IProviderBase['type']): HTMLElement => {
  const { isFirefox, isChrome, isEdge, isBrave, isArc } = getBrowserDetect();

  switch (providerType) {
    case ProviderTypeEnum.extension:
      if (isEdge()) {
        return <mvx-edge-extension-provider-icon />;
      } else if (isFirefox()) {
        return <mvx-firefox-extension-provider-icon />;
      } else if (isBrave()) {
        return <mvx-brave-extension-provider-icon />;
      } else if (isArc()) {
        return <mvx-arc-extension-provider-icon />;
      } else if (isChrome()) {
        return <mvx-extension-provider-icon />;
      } else {
        return <mvx-wallet-provider-icon />;
      }
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
