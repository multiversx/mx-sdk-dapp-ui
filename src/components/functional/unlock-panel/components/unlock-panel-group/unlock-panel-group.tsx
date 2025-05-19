import type { EventEmitter } from '@stencil/core';
import { Component, Event, h, Prop } from '@stencil/core';
import type { IProviderBase } from 'types/provider.types';

@Component({
  tag: 'mvx-unlock-panel-group',
  styleUrl: 'unlock-panel-group.scss',
  shadow: true,
})
export class UnlockPanelGroup {
  @Prop() groupTitle: string = '';
  @Prop() providers: IProviderBase[] = [];
  @Event({ composed: false, bubbles: false }) login: EventEmitter<IProviderBase>;

  private handleLogin = (provider: IProviderBase) => {
    this.login.emit(provider);
  };

  render() {
    return (
      <div class="unlock-panel-group">
        <div class="unlock-panel-group-label">{this.groupTitle}</div>

        <div class="unlock-panel-group-providers">
          {this.providers.map(provider => (
            <mvx-unlock-provider-button provider={provider} onClick={() => this.handleLogin(provider)} />
          ))}
          <slot />
        </div>
      </div>
    );
  }
}
