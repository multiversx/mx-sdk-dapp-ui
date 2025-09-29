import { h } from '@stencil/core';
import { BrowserEnum } from 'constants/browser.enum';
import type { IProviderBase } from 'types/provider.types';
import { ProviderTypeEnum } from 'types/provider.types';
import { getDetectedBrowser } from 'utils/getDetectedBrowser';

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
  const detectedBrowser = getDetectedBrowser();

  switch (providerType) {
    case ProviderTypeEnum.extension:
      switch (detectedBrowser) {
        case BrowserEnum.Edge:
          return (
            <mvx-edge-extension-provider-icon width={extensionProviderIconWidth} height={extensionProviderIconHeight} />
          );
        case BrowserEnum.Firefox:
          return (
            <mvx-firefox-extension-provider-icon
              width={extensionProviderIconWidth}
              height={extensionProviderIconHeight}
            />
          );
        case BrowserEnum.Brave:
          return (
            <mvx-brave-extension-provider-icon
              width={extensionProviderIconWidth}
              height={extensionProviderIconHeight}
            />
          );
        case BrowserEnum.Arc:
          return (
            <mvx-arc-extension-provider-icon width={extensionProviderIconWidth} height={extensionProviderIconHeight} />
          );
        case BrowserEnum.Chrome:
          return (
            <mvx-extension-provider-icon width={extensionProviderIconWidth} height={extensionProviderIconHeight} />
          );
        default:
          return <mvx-wallet-provider-icon />;
      }
    case ProviderTypeEnum.metamask:
      return <mvx-metamask-provider-icon />;
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
