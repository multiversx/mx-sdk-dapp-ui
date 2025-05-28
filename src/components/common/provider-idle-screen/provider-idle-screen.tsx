import type { EventEmitter } from '@stencil/core';
import { Component, Event, Fragment, h, Prop } from '@stencil/core';
import { getProviderButtonIcon } from 'components/functional/unlock-panel/helpers';
import type { IProviderBase } from 'types/provider.types';
import { ProviderTypeEnum } from 'types/provider.types';

const getProviderIntroText = (providerType?: IProviderBase['type']) => {
  switch (providerType) {
    case ProviderTypeEnum.extension:
      return 'Open the MultiversX Browser Extension to sign the transaction.';
    case ProviderTypeEnum.metamask:
      return 'Open the Metamask Browser Extension to sign the transaction.';
    case ProviderTypeEnum.passkey:
      return 'Use your predefined passkey to sign the transaction.';
    case ProviderTypeEnum.walletConnect:
      return 'Open Xportal to sign the transaction.';
    case ProviderTypeEnum.crossWindow:
      return 'Go to MultiversX Web Wallet to sign the transaction.';
    default:
      return 'Go to your connected provider to sign the transaction.';
  }
};

@Component({
  tag: 'mvx-provider-idle-screen',
  styleUrl: 'provider-idle-screen.scss',
  shadow: true,
})
export class ProviderIdleScreen {
  @Prop() provider: IProviderBase | null = null;
  @Prop() introTitle: string = 'Requesting Connection';
  @Prop() introText: string = '';

  @Event({ composed: false, bubbles: false }) close: EventEmitter;
  @Event({ composed: false, bubbles: false }) access: EventEmitter;

  render() {
    if (!this.provider) {
      return null;
    }

    const providerType = this.provider.type;
    const isExtensionProvider = providerType === ProviderTypeEnum.extension;
    const extensionProviderIconBaseSize = 150;
    const extensionProviderIconWidth = extensionProviderIconBaseSize + (15 / 100) * extensionProviderIconBaseSize;
    const extensionProviderIconHeight = extensionProviderIconBaseSize + (10 / 100) * extensionProviderIconBaseSize;

    const providerIntroIcon = getProviderButtonIcon(providerType);
    const providerIntroText = this.introText || getProviderIntroText(providerType);

    if (this.provider.type === ProviderTypeEnum.ledger) {
      return (
        <Fragment>
          <mvx-side-panel-header
            hasLeftButton={false}
            panelTitle={this.provider.name}
            onRightButtonClick={this.close.emit}
          />

          <mvx-ledger-intro onConnect={this.access.emit} />
        </Fragment>
      );
    }

    return (
      <Fragment>
        <mvx-side-panel-header
          hasLeftButton={false}
          panelTitle={this.provider.name}
          onRightButtonClick={this.close.emit}
        />

        <div class="unlock-provider-intro">
          {isExtensionProvider ? (
            <div class="unlock-provider-intro-icon">
              <mvx-extension-provider-icon width={extensionProviderIconWidth} height={extensionProviderIconHeight} />
            </div>
          ) : (
            <div class="unlock-provider-intro-icon">{providerIntroIcon}</div>
          )}

          <div class="unlock-provider-intro-title">{this.introTitle}</div>
          {providerIntroText && <div class="unlock-provider-intro-text">{providerIntroText}</div>}
          <slot name="close-button" />
        </div>
      </Fragment>
    );
  }
}
