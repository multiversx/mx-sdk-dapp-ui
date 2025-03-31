import { Component, h, Prop } from '@stencil/core';
import { ProviderTypeEnum } from 'components';
import { getIsExtensionAvailable, getIsMetaMaskAvailable } from 'components/visual/unlock-panel/helpers';

@Component({
  tag: 'mvx-unlock-button',
  styleUrl: 'unlock-button.scss',
})
export class UnlockButton {
  @Prop() buttonLabel: string;
  @Prop() buttonIcon: HTMLElement;
  @Prop() buttonType?: ProviderTypeEnum;
  @Prop() class?: string;

  render() {
    const isExtensionProvider = this.buttonType === ProviderTypeEnum.extension;
    const isMetaMaskProvider = this.buttonType === ProviderTypeEnum.metamask;
    const isDetectableProvider = isExtensionProvider || isMetaMaskProvider;
    const isExtensionInstalled = isExtensionProvider && getIsExtensionAvailable();
    const isMetaMaskInstalled = isMetaMaskProvider && getIsMetaMaskAvailable();
    const shouldShowOpenLabel = isDetectableProvider && (isExtensionInstalled || isMetaMaskInstalled);

    return (
      <div class={{ 'unlock-button': true, [this.class]: Boolean(this.class) }}>
        {this.buttonIcon ? (
          <div class="unlock-button-icon">{this.buttonIcon}</div>
        ) : (
          <div class="unlock-button-icon">
            <multiversx-logo-icon />
          </div>
        )}

        <div class="unlock-button-label">{this.buttonLabel}</div>

        {isDetectableProvider && (
          <div class="unlock-button-status">
            {shouldShowOpenLabel ? (
              <div class="unlock-button-status-open">Open</div>
            ) : (
              <div class="unlock-button-status-install">
                <span class="unlock-button-status-install-label">Install</span>
                <arrow-up-right-icon class="unlock-button-status-install-icon" />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
