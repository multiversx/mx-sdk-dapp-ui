import { h } from '@stencil/core';
import { LedgerProviderIcon } from 'assets/icons/ledger-provider-icon/ledger-provider-icon';
import { MultiversXLogoIcon } from 'assets/icons/multiversx-logo-icon/multiversx-logo-icon';
import { PasskeyProviderIcon } from 'assets/icons/passkey-provider-icon/passkey-provider-icon';
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
    case ProviderTypeEnum.passkey:
      return <PasskeyProviderIcon />;
    case ProviderTypeEnum.walletConnect:
      return <MultiversXLogoIcon />;
    case ProviderTypeEnum.ledger:
      return <LedgerProviderIcon />;
    case ProviderTypeEnum.crossWindow:
      return <mvx-wallet-provider-icon />;

    default:
      return <MultiversXLogoIcon />;
  }
};
