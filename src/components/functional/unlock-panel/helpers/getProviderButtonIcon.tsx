import { h } from '@stencil/core';
import type { IProviderBase } from 'types/provider.types';
import { ProviderTypeEnum } from 'types/provider.types';
import { getBrowserDetect } from 'utils/getBrowserDetect';

interface IProviderButtonIcon {
  providerType: IProviderBase['type'];
  extensionProviderIconWidth?: number;
  extensionProviderIconHeight?: number;
}

export const getProviderButtonIcon = ({
  providerType,
  extensionProviderIconWidth,
  extensionProviderIconHeight,
}: IProviderButtonIcon): HTMLElement => {
  const { isFirefox, isChrome, isEdge, isBrave, isArc } = getBrowserDetect();

  switch (providerType) {
    case ProviderTypeEnum.extension:
      if (isEdge()) {
        return (
          <mvx-edge-extension-provider-icon width={extensionProviderIconWidth} height={extensionProviderIconHeight} />
        );
      } else if (isFirefox()) {
        return (
          <mvx-firefox-extension-provider-icon
            width={extensionProviderIconWidth}
            height={extensionProviderIconHeight}
          />
        );
      } else if (isBrave()) {
        return (
          <mvx-brave-extension-provider-icon width={extensionProviderIconWidth} height={extensionProviderIconHeight} />
        );
      } else if (isArc()) {
        return (
          <mvx-arc-extension-provider-icon width={extensionProviderIconWidth} height={extensionProviderIconHeight} />
        );
      } else if (isChrome()) {
        return <mvx-extension-provider-icon width={extensionProviderIconWidth} height={extensionProviderIconHeight} />;
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
