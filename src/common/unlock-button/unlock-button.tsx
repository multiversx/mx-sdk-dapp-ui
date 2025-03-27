import { Component, h, Prop } from '@stencil/core';
import { getIsExtensionAvailable, getIsMetaMaskAvailable } from 'components/visual/unlock-panel/helpers';
import { StyledHost } from 'utils/StyledHost';

import { ProviderTypeEnum } from '../../types/provider.types';

@Component({
  tag: 'unlock-button',
  styleUrl: 'unlock-button.scss',
  shadow: true,
})
export class UnlockButton {
  @Prop() buttonLabel: string;
  @Prop() buttonIcon: HTMLElement;
  @Prop() buttonType?: ProviderTypeEnum;

  private isDetectableProvider: boolean = false;
  private shouldShowOpenLabel: boolean = false;
  private isExtensionProvider = this.buttonType === ProviderTypeEnum.extension;
  private isMetaMaskProvider = this.buttonType === ProviderTypeEnum.metamask;

  componentWillLoad() {
    this.isDetectableProvider = this.isExtensionProvider || this.isMetaMaskProvider;
    this.shouldShowOpenLabel = this.isDetectableProvider && ((this.isExtensionProvider && getIsExtensionAvailable()) || (this.isMetaMaskProvider && getIsMetaMaskAvailable()));

    console.log({
      buttonType: this.buttonType,
      isDetectableProvider: this.isDetectableProvider,
      isExtensionProvider: this.isExtensionProvider,
      isMetaMaskProvider: this.isMetaMaskProvider,
    });
  }

  render() {
    return (
      <StyledHost>
        <div class="unlock-button">
          <div class="unlock-button-icon">{this.buttonIcon}</div>
          <div class="unlock-button-label">{this.buttonLabel}</div>

          {this.isDetectableProvider && (
            <div class="unlock-button-status">
              {this.shouldShowOpenLabel ? (
                <div class="unlock-button-status-open">Open</div>
              ) : (
                <div class="unlock-button-install">
                  <span class="unlock-button-install-label">Install</span>
                  <arrow-up-right-icon class="unlock-button-install-icon" />
                </div>
              )}
            </div>
          )}
        </div>
      </StyledHost>
    );
  }
}
