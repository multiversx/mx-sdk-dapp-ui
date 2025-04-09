import { Component, h, Prop } from '@stencil/core';
import { getIsExtensionAvailable, getIsMetaMaskAvailable } from 'components/visual/unlock-panel/helpers';
import { ProviderTypeEnum } from 'types/provider.types';

@Component({
  tag: 'mvx-unlock-button',
  styleUrl: 'unlock-button.scss',
})
export class UnlockButton {
  @Prop() label: string;
  @Prop() icon: HTMLElement;
  @Prop() type?: ProviderTypeEnum;
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
        {this.icon ? (
          <div class="unlock-button-icon">{this.icon}</div>
        ) : (
          <div class="unlock-button-icon">
            <mvx-multiversx-logo-icon />
          </div>
        )}

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
