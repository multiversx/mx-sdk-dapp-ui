import { h } from '@stencil/core';
import { getIsExtensionAvailable, getIsMetaMaskAvailable } from 'components/visual/unlock-panel/helpers';
import { StyledHost } from 'utils/StyledHost';

import { ProviderTypeEnum } from '../../types/provider.types';

export interface UnlockButtonProps {
  buttonLabel: string;
  buttonIcon: HTMLElement;
  buttonType?: ProviderTypeEnum;
  class?: string;
}

export const renderUnlockButton = (props: UnlockButtonProps) => {
  const isExtensionProvider = props.buttonType === ProviderTypeEnum.extension;
  const isMetaMaskProvider = props.buttonType === ProviderTypeEnum.metamask;
  const isDetectableProvider = isExtensionProvider || isMetaMaskProvider;
  const isExtensionInstalled = isExtensionProvider && getIsExtensionAvailable();
  const isMetaMaskInstalled = isMetaMaskProvider && getIsMetaMaskAvailable();
  const shouldShowOpenLabel = isDetectableProvider && (isExtensionInstalled || isMetaMaskInstalled);

  return (
    <StyledHost>
      <div
        part="unlock-button"
        class={{
          'unlock-button': true,
          [props.class]: Boolean(props.class),
        }}
      >
        {props.buttonIcon ? (
          <div class="unlock-button-icon">{props.buttonIcon}</div>
        ) : (
          <div class="unlock-button-icon">
            <multiversx-logo-icon />
          </div>
        )}

        <div class="unlock-button-label">{props.buttonLabel}</div>

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
};
