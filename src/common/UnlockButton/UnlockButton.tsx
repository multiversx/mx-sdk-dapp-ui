import { h } from '@stencil/core';
import classNames from 'classnames';
import { Icon } from 'common/Icon';
import { getIsExtensionAvailable, getIsMetaMaskAvailable } from 'components/functional/unlock-panel/helpers';
import { BrowserEnum } from 'constants/browser.enum';
import {
  CHROME_EXTENSION_LINK,
  CHROME_METAMASK_EXTENSION_LINK,
  FIREFOX_ADDON_LINK,
  FIREFOX_METAMASK_ADDON_LINK,
} from 'constants/installExtensionsLinks';
import { safeWindow } from 'constants/window.constants';
import type { IProviderBase } from 'types/provider.types';
import { ProviderTypeEnum } from 'types/provider.types';
import { getDetectedBrowser } from 'utils/getDetectedBrowser';

import styles from './unlockButton.styles';

interface UnlockButtonPropsType {
  label: string;
  iconUrl: string;
  icon?: HTMLElement;
  dataTestId?: string;
  type?: IProviderBase['type'];
  class?: string;
}

export function UnlockButton({ label, iconUrl, icon, dataTestId, type, class: className }: UnlockButtonPropsType) {
  const isExtensionProvider = type === ProviderTypeEnum.extension;
  const isMetaMaskProvider = type === ProviderTypeEnum.metamask;
  const isDetectableProvider = isExtensionProvider || isMetaMaskProvider;
  const isExtensionInstalled = isExtensionProvider && getIsExtensionAvailable();
  const isMetaMaskInstalled = isMetaMaskProvider && getIsMetaMaskAvailable();
  const shouldShowOpenLabel = isDetectableProvider && (isExtensionInstalled || isMetaMaskInstalled);

  const detectedBrowser = getDetectedBrowser();
  const isFirefox = detectedBrowser === BrowserEnum.Firefox;

  const handleInstallButtonClick = () => {
    if (shouldShowOpenLabel) {
      return;
    }

    if (isExtensionProvider) {
      safeWindow?.open(isFirefox ? FIREFOX_ADDON_LINK : CHROME_EXTENSION_LINK);
    } else if (isMetaMaskProvider) {
      safeWindow?.open(isFirefox ? FIREFOX_METAMASK_ADDON_LINK : CHROME_METAMASK_EXTENSION_LINK);
    }
  };

  return (
    <div data-testid={dataTestId} onClick={handleInstallButtonClick} class={classNames(styles.unlockButton, className)}>
      <div class={styles.unlockButtonLabel}>{label}</div>

      <div
        class={classNames(styles.unlockButtonIcon, {
          [styles.unlockButtonIconClipped]: isExtensionProvider,
        })}
      >
        {icon ? icon : <img src={iconUrl} alt={label} />}
      </div>

      {isDetectableProvider && (
        <div class={styles.unlockButtonStatus}>
          <div class={styles.unlockButtonStatusText}>{shouldShowOpenLabel ? 'Open' : 'Install'}</div>
          {!shouldShowOpenLabel && <Icon name="arrow-up-right" class={styles.unlockButtonStatusIcon} />}
        </div>
      )}
    </div>
  );
}
