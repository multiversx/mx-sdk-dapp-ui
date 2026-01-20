import { h } from '@stencil/core';
import classNames from 'classnames';
import { UnlockButton } from 'common/UnlockButton/UnlockButton';
import type { IProviderBase } from 'types/provider.types';
import type { ProviderTypeEnum } from 'types/provider.types';

import { getProviderButtonIcon } from '../../helpers';

const unlockProviderButtonClasses: Record<string, string> = {
  button: 'mvx:w-full',
};

interface UnlockProviderButtonPropsType {
  provider: IProviderBase<ProviderTypeEnum>;
  class?: string;
  onClick?: () => void;
}

export function UnlockProviderButton({ provider, class: className, onClick }: UnlockProviderButtonPropsType) {
  if (!provider) {
    return null;
  }

  const icon: HTMLElement | null = !provider.iconUrl ? getProviderButtonIcon({ providerType: provider.type }) : null;

  return (
    <div onClick={onClick}>
      <UnlockButton
        iconUrl={provider.iconUrl}
        label={provider.name}
        type={provider.type}
        class={classNames(className, unlockProviderButtonClasses.button)}
        icon={icon}
        data-testid={provider.type.toString()}
      />
    </div>
  );
}
