import { Component, h, Prop } from '@stencil/core';
import type { IProviderBase } from 'types/provider.types';
import type { ProviderTypeEnum } from 'types/provider.types';

import { getProviderButtonIcon } from '../../helpers';

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

    return <mvx-unlock-button iconUrl={this.provider.iconUrl} label={this.provider.name} type={this.provider.type} class={this.class} icon={icon} />;
  }
}
