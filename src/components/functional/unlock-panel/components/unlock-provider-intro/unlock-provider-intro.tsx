import type { EventEmitter } from '@stencil/core';
import { Component, Event, Fragment, h, Prop } from '@stencil/core';
import { SidePanelHeaderSlotEnum } from 'components/visual/side-panel/components/side-panel-header/side-panel-header.types';
import type { IProviderBase } from 'types/provider.types';
import { ProviderTypeEnum } from 'types/provider.types';

import { getProviderButtonIcon } from '../../helpers';

const getProviderIntroText = (providerType?: IProviderBase['type']) => {
  switch (providerType) {
    case ProviderTypeEnum.extension:
      return 'Open the MultiversX Browser Extension to connect to your wallet.';
    case ProviderTypeEnum.metamask:
      return 'Open the MetaMask Browser Extension to connect to your wallet.';
    case ProviderTypeEnum.passkey:
      return 'Use your predefined passkey to connect to your wallet.';
    case ProviderTypeEnum.crossWindow:
      return 'Follow the steps on MultiversX Web Wallet to connect to your wallet.';
  }
};

@Component({
  tag: 'mvx-unlock-provider-intro',
  styleUrl: 'unlock-provider-intro.scss',
  shadow: true,
})
export class UnlockProviderIntro {
  @Prop() provider: IProviderBase | null = null;
  @Event({ composed: false, bubbles: false }) close: EventEmitter;
  @Event({ composed: false, bubbles: false }) access: EventEmitter;

  render() {
    const providerType = this.provider ? this.provider.type : null;
    const isExtensionProvider = providerType === ProviderTypeEnum.extension;
    const extensionProviderIconBaseSize = 150;
    const extensionProviderIconWidth = extensionProviderIconBaseSize + (15 / 100) * extensionProviderIconBaseSize;
    const extensionProviderIconHeight = extensionProviderIconBaseSize + (10 / 100) * extensionProviderIconBaseSize;

    const providerIntroIcon = getProviderButtonIcon(providerType);
    const providerIntroText = getProviderIntroText(providerType);

    if (!this.provider) {
      return null;
    }

    const header = (
      <mvx-side-panel-header panelTitle={this.provider.name} hasRightButton={false} onLeftButtonClick={this.close.emit.bind(this)}>
        <mvx-close-icon slot={SidePanelHeaderSlotEnum.leftIcon} />
      </mvx-side-panel-header>
    );

    if (this.provider.type === ProviderTypeEnum.ledger) {
      return (
        <Fragment>
          {header}
          <mvx-ledger-intro onConnect={this.access.emit} />
        </Fragment>
      );
    }

    return (
      <Fragment>
        {header}
        <div class="unlock-provider-intro">
          {isExtensionProvider ? (
            <div class="unlock-provider-intro-icon">
              <mvx-extension-provider-icon width={extensionProviderIconWidth} height={extensionProviderIconHeight} />
            </div>
          ) : (
            <div class="unlock-provider-intro-icon">{providerIntroIcon}</div>
          )}

          <div class="unlock-provider-intro-title">Requesting Connection</div>
          {providerIntroText && <div class="unlock-provider-intro-text">{providerIntroText}</div>}
        </div>
      </Fragment>
    );
  }
}
