import { Component, h, Prop } from '@stencil/core';
import { UnlockButton as UnlockButtonFunction } from 'common/UnlockButton/UnlockButton';
import type { IProviderBase } from 'types/provider.types';

@Component({
  tag: 'mvx-unlock-button',
  shadow: true,
})
export class UnlockButton {
  @Prop() label: string;
  @Prop() iconUrl: string;
  @Prop() icon?: HTMLElement;
  @Prop() dataTestId?: string;
  @Prop() type?: IProviderBase['type'];
  @Prop() class?: string;

  render() {
    return (
      <UnlockButtonFunction
        label={this.label}
        iconUrl={this.iconUrl}
        icon={this.icon}
        dataTestId={this.dataTestId}
        type={this.type}
        class={this.class}
      />
    );
  }
}
