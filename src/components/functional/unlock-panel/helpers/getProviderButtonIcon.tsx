import { h } from '@stencil/core';
import { ArcExtensionProviderIcon } from 'assets/icons/arc-extension-provider-icon/arc-extension-provider-icon';
import { BraveExtensionProviderIcon } from 'assets/icons/brave-extension-provider-icon/brave-extension-provider-icon';
import { EdgeExtensionProviderIcon } from 'assets/icons/edge-extension-provider-icon/edge-extension-provider-icon';
import { ExtensionProviderIcon } from 'assets/icons/extension-provider-icon/extension-provider-icon';
import { FirefoxExtensionProviderIcon } from 'assets/icons/firefox-extension-provider-icon/firefox-extension-provider-icon';
import { LedgerProviderIcon } from 'assets/icons/ledger-provider-icon/ledger-provider-icon';
import { MetaMaskProviderIcon } from 'assets/icons/metamask-provider-icon/metamask-provider-icon';
import { MultiversXLogoIcon } from 'assets/icons/multiversx-logo-icon/multiversx-logo-icon';
import { PasskeyProviderIcon } from 'assets/icons/passkey-provider-icon/passkey-provider-icon';
import { WalletProviderIcon } from 'assets/icons/wallet-provider-icon/wallet-provider-icon';
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
          return <EdgeExtensionProviderIcon width={extensionProviderIconWidth} height={extensionProviderIconHeight} />;
        case BrowserEnum.Firefox:
          return (
            <FirefoxExtensionProviderIcon width={extensionProviderIconWidth} height={extensionProviderIconHeight} />
          );
        case BrowserEnum.Brave:
          return <BraveExtensionProviderIcon width={extensionProviderIconWidth} height={extensionProviderIconHeight} />;
        case BrowserEnum.Arc:
          return <ArcExtensionProviderIcon width={extensionProviderIconWidth} height={extensionProviderIconHeight} />;
        case BrowserEnum.Chrome:
          return <ExtensionProviderIcon width={extensionProviderIconWidth} height={extensionProviderIconHeight} />;
        default:
          return <WalletProviderIcon />;
      }
    case ProviderTypeEnum.metamask:
      return <MetaMaskProviderIcon />;
    case ProviderTypeEnum.passkey:
      return <PasskeyProviderIcon />;
    case ProviderTypeEnum.walletConnect:
      return <MultiversXLogoIcon />;
    case ProviderTypeEnum.ledger:
      return <LedgerProviderIcon />;
    case ProviderTypeEnum.crossWindow:
      return <WalletProviderIcon />;

    default:
      return <MultiversXLogoIcon />;
  }
};
