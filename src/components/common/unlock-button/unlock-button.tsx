import { Component, h, Prop } from '@stencil/core';
import { getIsExtensionAvailable, getIsMetaMaskAvailable } from 'components/visual/unlock-panel/helpers';
import type { ICustomProviderBase } from 'types/provider.types';
import { ProviderTypeEnum } from 'types/provider.types';

@Component({
  tag: 'mvx-unlock-button',
  styleUrl: 'unlock-button.scss',
  shadow: true,
})
export class UnlockButton {
  @Prop() label: string;
  @Prop() iconUrl: string;
  @Prop() icon?: HTMLElement;

  @Prop() type?: ICustomProviderBase['type'];
  @Prop() class?: string;

  render() {
    const isExtensionProvider = this.type === ProviderTypeEnum.extension;
    const isMetaMaskProvider = this.type === ProviderTypeEnum.metamask;
    const isDetectableProvider = isExtensionProvider || isMetaMaskProvider;
    const isExtensionInstalled = isExtensionProvider && getIsExtensionAvailable();
    const isMetaMaskInstalled = isMetaMaskProvider && getIsMetaMaskAvailable();
    const shouldShowOpenLabel = isDetectableProvider && (isExtensionInstalled || isMetaMaskInstalled);

    return (
      <div class={{ 'unlock-button': true, [this.class]: Boolean(this.class) }}>
        <div class="unlock-button-icon">{this.icon ? this.icon : <img src={this.iconUrl} alt={this.label} />}</div>
        <div class="unlock-button-label">{this.label}</div>

        {isDetectableProvider && (
          <div class="unlock-button-status">
            {shouldShowOpenLabel ? (
              <div class="unlock-button-status-open">Open</div>
            ) : (
              <div class="unlock-button-status-install">
                <span class="unlock-button-status-install-label">Install</span>
                <mvx-arrow-up-right-icon class="unlock-button-status-install-icon" />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
