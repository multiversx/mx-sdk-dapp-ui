import { Component, h, Prop } from '@stencil/core';
import classNames from 'classnames';
import { getIsExtensionAvailable, getIsMetaMaskAvailable } from 'components/functional/unlock-panel/helpers';
import {
  CHROME_EXTENSION_LINK,
  CHROME_METAMASK_EXTENSION_LINK,
  FIREFOX_ADDON_LINK,
  FIREFOX_METAMASK_ADDON_LINK,
} from 'constants/installExtensionsLinks';
import { safeWindow } from 'constants/window.constants';
import type { IProviderBase } from 'types/provider.types';
import { ProviderTypeEnum } from 'types/provider.types';
import { getBrowserDetect } from 'utils/getBrowserDetect';

const unlockButtonClasses: Record<string, string> = {
  statusIcon: 'mvx:fill-accent!',
};

@Component({
  tag: 'mvx-unlock-button',
  styleUrl: 'unlock-button.scss',
  shadow: true,
})
export class UnlockButton {
  @Prop() label: string;
  @Prop() iconUrl: string;
  @Prop() icon?: HTMLElement;
  @Prop() dataTestId?: string;
  @Prop() type?: IProviderBase['type'];
  @Prop() class?: string;

  render() {
    const isExtensionProvider = this.type === ProviderTypeEnum.extension;
    const isMetaMaskProvider = this.type === ProviderTypeEnum.metamask;
    const isDetectableProvider = isExtensionProvider || isMetaMaskProvider;
    const isExtensionInstalled = isExtensionProvider && getIsExtensionAvailable();
    const isMetaMaskInstalled = isMetaMaskProvider && getIsMetaMaskAvailable();
    const shouldShowOpenLabel = isDetectableProvider && (isExtensionInstalled || isMetaMaskInstalled);

    const { isFirefox } = getBrowserDetect();

    const handleInstallButtonClick = () => {
      if (shouldShowOpenLabel) {
        return;
      }

      if (isExtensionProvider) {
        safeWindow?.open(isFirefox() ? FIREFOX_ADDON_LINK : CHROME_EXTENSION_LINK);
      } else if (isMetaMaskProvider) {
        safeWindow?.open(isFirefox() ? FIREFOX_METAMASK_ADDON_LINK : CHROME_METAMASK_EXTENSION_LINK);
      }
    };

    return (
      <div
        data-testid={this.dataTestId}
        class={{ 'unlock-button': true, [this.class]: Boolean(this.class) }}
        onClick={handleInstallButtonClick}
      >
        <div class="unlock-button-label">{this.label}</div>

        <div
          class={{
            'unlock-button-icon': true,
            'clipped': isExtensionProvider,
          }}
        >
          {this.icon ? this.icon : <img src={this.iconUrl} alt={this.label} />}
        </div>

        {isDetectableProvider && (
          <div class="unlock-button-status">
            <div class="unlock-button-status-text">{shouldShowOpenLabel ? 'Open' : 'Install'}</div>

            {!shouldShowOpenLabel && (
              <mvx-arrow-up-right-icon
                class={classNames('unlock-button-status-icon', {
                  [unlockButtonClasses.statusIcon]: true,
                })}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}
