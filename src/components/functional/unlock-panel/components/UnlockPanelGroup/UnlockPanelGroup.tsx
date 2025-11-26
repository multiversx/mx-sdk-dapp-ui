import { h } from '@stencil/core';
import classNames from 'classnames';
import { type IProviderBase, ProviderTypeEnum } from 'types/provider.types';

import { UnlockProviderButton } from '../UnlockProviderButton';
import styles from './unlockPanelGroup.styles';

export enum UnlockPanelGroupSlotEnum {
  groupLabel = 'group-label',
}

interface UnlockPanelGroupPropsType {
  providers: IProviderBase[];
  class?: string;
  onLogin?: (provider: IProviderBase) => void;
  groupLabel?: JSX.Element;
}

export function UnlockPanelGroup({ providers = [], class: className, onLogin, groupLabel }: UnlockPanelGroupPropsType) {
  const handleLogin = (provider: IProviderBase) => {
    onLogin?.(provider);
  };

  const isInstallableExtension = (provider: IProviderBase<ProviderTypeEnum>) =>
    [ProviderTypeEnum.extension, ProviderTypeEnum.metamask].includes(provider.type as ProviderTypeEnum);

  return (
    <div class={styles.unlockPanelGroupContainer}>
      <div class={{ [styles.unlockPanelGroup]: true, [className]: Boolean(className) }}>
        <div class={styles.unlockPanelGroupLabel}>{groupLabel}</div>

        <div class={styles.unlockPanelGroupProviders}>
          {providers.map((provider, providerIndex) => (
            <UnlockProviderButton
              provider={provider}
              onClick={() => handleLogin(provider)}
              class={classNames({
                [styles.detectedPanelGroup]: isInstallableExtension(provider),
                [styles.lastProviderButton]: providerIndex === providers.length - 1,
              })}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
