import { Fragment, h } from '@stencil/core';
import classNames from 'classnames';
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

const styles = {
  button:
    'mvx:pl-3 mvx:pr-4 mvx:h-15 mvx:flex! mvx:gap-4 mvx:cursor-pointer mvx:items-center mvx:transition-all mvx:duration-200 mvx:ease-in-out unlock-button-hover',
  icon: 'mvx:h-10 mvx:flex mvx:relative mvx:z-1 mvx:items-center mvx:justify-center mvx:w-10',
  iconClipped: 'mvx:items-end mvx:justify-start',
  label: 'mvx:text-base mvx:relative mvx:z-1 mvx:leading-none',
  status:
    'mvx:ml-auto mvx:relative mvx:z-1 mvx:leading-none mvx:flex mvx:items-center mvx:py-1 mvx:px-2 mvx:font-medium mvx:gap-1 mvx:text-xs',
  statusIcon: 'mvx:flex mvx:items-center',
};

interface IUnlockButtonProps {
  label: string;
  iconUrl: string;
  icon?: HTMLElement;
  dataTestId?: string;
  type?: IProviderBase['type'];
  class?: string;
}

export function UnlockButton({ label, iconUrl, icon, dataTestId, type, class: className }: IUnlockButtonProps) {
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
      <style>
        {`
          .unlock-button-hover:hover {
            background: var(--mvx-hover-color-primary) !important;
          }
          .unlock-button-status-icon svg path {
            fill: var(--mvx-teal-350);
          }
        `}
      </style>
      <div
        data-testid={dataTestId}
        class={classNames(styles.button, className)}
        style={{
          background: 'var(--mvx-bg-color-secondary)',
        }}
        onClick={handleInstallButtonClick}
      >
        <div class={styles.label} style={{ color: 'var(--mvx-text-color-primary)' }}>
          {label}
        </div>

        <div
          class={classNames(styles.icon, {
            [styles.iconClipped]: isExtensionProvider,
          })}
          style={{ order: '-1' }}
        >
          {icon ? icon : <img src={iconUrl} alt={label} />}
        </div>

        {isDetectableProvider && (
          <div
            class={styles.status}
            style={{
              borderRadius: '20px',
              border: '1px solid var(--mvx-border-color-primary)',
              background: 'var(--mvx-bg-color-primary)',
            }}
          >
            <div style={{ color: 'var(--mvx-text-accent-color)' }}>{shouldShowOpenLabel ? 'Open' : 'Install'}</div>
            {!shouldShowOpenLabel && <mvx-arrow-up-right-icon class={styles.statusIcon} />}
          </div>
        )}
      </div>
    </Fragment>
  );
}
