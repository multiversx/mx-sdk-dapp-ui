import { Component, h, Prop } from '@stencil/core';
import classNames from 'classnames';
import type { IProviderBase } from 'types/provider.types';
import type { ProviderTypeEnum } from 'types/provider.types';

import { getProviderButtonIcon } from '../../helpers';

const unlockProviderButtonClasses: Record<string, string> = {
  button: 'mvx:w-full',
};

@Component({
  tag: 'mvx-unlock-provider-button',
  shadow: true,
})
export class UnlockProviderButton {
  @Prop() provider: IProviderBase<ProviderTypeEnum>;
  @Prop() class?: string;

  render() {
    if (!this.provider) {
      return null;
    }

    const icon: HTMLElement | null = !this.provider.iconUrl ? getProviderButtonIcon(this.provider.type) : null;

    return (
      <mvx-unlock-button
        iconUrl={this.provider.iconUrl}
        label={this.provider.name}
        type={this.provider.type}
        class={classNames(this.class, unlockProviderButtonClasses.button)}
        icon={icon}
      />
    );
  }
}
