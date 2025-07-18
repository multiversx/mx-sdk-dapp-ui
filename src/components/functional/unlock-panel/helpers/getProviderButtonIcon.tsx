import { h } from '@stencil/core';
import { safeWindow } from 'constants/window.constants';
import type { IProviderBase } from 'types/provider.types';
import { ProviderTypeEnum } from 'types/provider.types';
import { getBrowserDetect } from 'utils/getBrowserDetect';

export const getProviderButtonIcon = (providerType: IProviderBase['type']): HTMLElement => {
  const { isFirefox, isChrome, isEdge, isBrave } = getBrowserDetect();
  console.log(safeWindow.navigator);
  const extensionProviderIconBaseSize = 150;
  const extensionProviderIconWidth = extensionProviderIconBaseSize + (15 / 100) * extensionProviderIconBaseSize;
  const extensionProviderIconHeight = extensionProviderIconBaseSize + (10 / 100) * extensionProviderIconBaseSize;
  switch (providerType) {
    case ProviderTypeEnum.extension:
      if (isEdge()) {
        return <mvx-edge-extension-provider-icon />;
      } else if (isFirefox()) {
        return (
          <mvx-firefox-extension-provider-icon
            width={extensionProviderIconWidth}
            height={extensionProviderIconHeight}
          />
        );
      } else if (isBrave()) {
        return <mvx-brave-extension-provider-icon />;
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
