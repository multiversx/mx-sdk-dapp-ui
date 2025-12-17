import { Fragment, h } from '@stencil/core';
import { getProviderButtonIcon } from 'components/functional/unlock-panel/helpers';
import { SidePanelHeader } from 'components/visual/SidePanel/components/SidePanelHeader/SidePanelHeader';
import type { IProviderBase } from 'types/provider.types';
import { ProviderTypeEnum } from 'types/provider.types';

import { getProviderIntroText } from './helpers/getProviderIntroText';

const styles = {
  container: 'mvx:flex mvx:flex-col mvx:flex-1 mvx:overflow-hidden',
  intro: 'mvx:flex mvx:flex-col mvx:flex-1 mvx:justify-center mvx:items-center mvx:text-center mvx:p-12 mvx:gap-4',
  icon: 'mvx:mb-6 mvx:h-37.5 mvx:items-end mvx:flex mvx:justify-start mvx:w-37.5',
  title: 'mvx:text-xl mvx:font-medium mvx:leading-none',
  text: 'mvx:text-base mvx:font-medium mvx:leading-5',
};

interface IProviderIdleScreenProps {
  provider: IProviderBase | null;
  introTitle?: string;
  introText?: string;
  onClose?: () => void;
  onAccess?: () => void;
  children?: any;
  isLogin?: boolean;
}

export function ProviderIdleScreen({
  provider,
  introTitle = 'Requesting Connection',
  introText = '',
  onClose,
  onAccess,
  children,
  isLogin,
}: IProviderIdleScreenProps) {
  if (!provider) {
    return null;
  }

  const providerType = provider.type;
  const isExtensionProvider = providerType === ProviderTypeEnum.extension;
  const extensionProviderIconBaseSize = 150;
  const extensionProviderIconWidth = extensionProviderIconBaseSize + (15 / 100) * extensionProviderIconBaseSize;
  const extensionProviderIconHeight = extensionProviderIconBaseSize + (10 / 100) * extensionProviderIconBaseSize;

  const providerIntroIcon = isExtensionProvider
    ? getProviderButtonIcon({ providerType, extensionProviderIconWidth, extensionProviderIconHeight })
    : getProviderButtonIcon({ providerType });
  const providerIntroText = introText || getProviderIntroText({ providerType, isLogin });

  if (provider.type === ProviderTypeEnum.ledger) {
    return (
      <Fragment>
        <SidePanelHeader hasLeftButton={false} panelTitle={provider.name} onRightButtonClick={onClose} />

        <mvx-ledger-intro onConnect={onAccess} />
      </Fragment>
    );
  }

  return (
    <div class={styles.container}>
      <SidePanelHeader hasLeftButton={false} panelTitle={provider.name} onRightButtonClick={onClose} />

      <div class={styles.intro} style={{ color: 'var(--mvx-text-color-primary)' }}>
        <div class={styles.icon}>{providerIntroIcon}</div>

        <div class={styles.title}>{introTitle}</div>
        {providerIntroText && (
          <div class={styles.text} style={{ color: 'var(--mvx-text-color-secondary)' }}>
            {providerIntroText}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
