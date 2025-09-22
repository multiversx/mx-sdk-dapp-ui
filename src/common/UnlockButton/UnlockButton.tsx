import { Fragment, h } from '@stencil/core';
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

// prettier-ignore
const styles = {
  unlockButton: 'unlock-button mvx:pl-3 mvx:pr-4 mvx:h-15 mvx:flex! mvx:gap-4 mvx:cursor-pointer mvx:items-center mvx:transition-all mvx:duration-200 mvx:ease-in-out mvx:bg-secondary mvx:hover:bg-hover',
  unlockButtonIcon: 'unlock-button-icon mvx:-order-1 mvx:h-10 mvx:flex mvx:relative mvx:z-1 mvx:items-center mvx:justify-center mvx:w-10',
  unlockButtonIconClipped: 'mvx:items-end mvx:justify-start',
  unlockButtonLabel: 'unlock-button-label mvx:text-base mvx:relative mvx:z-1 mvx:text-primary mvx:leading-none',
  unlockButtonStatus: 'unlock-button-status mvx:ml-auto mvx:relative mvx:rounded-3xl mvx:z-1 mvx:leading-none mvx:flex mvx:items-center mvx:py-1 mvx:px-2 mvx:font-medium mvx:gap-1 mvx:text-xs mvx:bg-surface mvx:border mvx:border-solid mvx:border-outline',
  unlockButtonStatusText: 'unlock-button-status-text mvx:text-accent',
  unlockButtonStatusIcon: 'unlock-button-status-icon mvx:flex mvx:items-center mvx:text-accent mvx:w-2.5 mvx:h-2.5',
} satisfies Record<string, string>;

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
    <Fragment>
      <div
        data-testid={dataTestId}
        onClick={handleInstallButtonClick}
        class={classNames(styles.unlockButton, className)}
      >
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
    </Fragment>
  );
}
