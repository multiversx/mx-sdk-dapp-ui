import type { EventEmitter } from '@stencil/core';
import { Component, Event, h, Prop } from '@stencil/core';
import type { IProviderBase } from 'types/provider.types';
import { ProviderTypeEnum } from 'types/provider.types';

@Component({
  tag: 'mvx-unlock-provider-intro',
  styleUrl: 'unlock-provider-intro.scss',
  shadow: true,
})
export class UnlockProviderIntro {
  @Prop() provider: IProviderBase | null = null;
  @Event() access: EventEmitter;

  render() {
    switch (this.provider.type) {
      case ProviderTypeEnum.ledger:
        return <mvx-ledger-intro onConnect={this.access.emit} />;
      default:
        return null;
    }
  }
}
