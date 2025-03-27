import { Component, h, Prop } from '@stencil/core';
import { getIsExtensionAvailable, getIsMetaMaskAvailable } from 'components/visual/unlock-panel/helpers';
import { StyledHost } from 'utils/StyledHost';

import type { ProviderTypeEnum } from '../../types/provider.types';

@Component({
  tag: 'unlock-button',
  styleUrl: 'unlock-button.scss',
  shadow: true,
})
export class UnlockButton {
  @Prop() buttonLabel: string;
  @Prop() buttonIcon: HTMLElement;
  @Prop() buttonType?: ProviderTypeEnum;

  render() {
    const isExtensionProvider = this.buttonType === 'extension';
    const isMetaMaskProvider = this.buttonType === 'metamask';
    const isDetectableProvider = isExtensionProvider || isMetaMaskProvider;
    const isExtensionInstalled = isExtensionProvider && getIsExtensionAvailable();
    const isMetaMaskInstalled = isMetaMaskProvider && getIsMetaMaskAvailable();
    const shouldShowOpenLabel = isDetectableProvider && (isExtensionInstalled || isMetaMaskInstalled);

    return (
      <StyledHost>
        <div class="unlock-button">
          <div class="unlock-button-icon">{this.buttonIcon}</div>
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
      </StyledHost>
    );
  }
}
