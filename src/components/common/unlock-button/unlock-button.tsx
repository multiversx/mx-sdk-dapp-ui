import { Component, h, Prop } from '@stencil/core';
import { UnlockButton as UnlockButtonComponent } from 'common/UnlockButton/UnlockButton';
import type { IProviderBase } from 'types/provider.types';

@Component({
  tag: 'mvx-unlock-button',
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
      <UnlockButtonComponent
        type={this.type}
        icon={this.icon}
        class={this.class}
        label={this.label}
        iconUrl={this.iconUrl}
        dataTestId={this.dataTestId}
      />
    );
  }
}
