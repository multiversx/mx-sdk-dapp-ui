import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import type { EventEmitter } from '@stencil/core';
import { Component, Event, h, Prop, State } from '@stencil/core';
import { ProviderTypeEnum } from 'types/provider.types';
import { StyledHost } from 'utils/StyledHost';

import { SidePanelSideEnum } from '../side-panel/side-panel.types';

@Component({
  tag: 'unlock-panel',
  styleUrl: 'unlock-panel.scss',
  shadow: true,
})
export class UnlockPanel {
  @Prop() isOpen: boolean = false;
  @Prop() allowedProviders?: ProviderTypeEnum[] = Object.values(ProviderTypeEnum);
  @Event() close: EventEmitter;
  @Event() login: EventEmitter<{ provider: ProviderTypeEnum; anchor?: HTMLElement }>;

  @State() isLoggingIn: boolean = false;
  @State() selectedMethod: ProviderTypeEnum | null = null;

  private anchor: HTMLElement | null = null;
  private observer: MutationObserver | null = null;

  disconnectedCallback() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private observeContainer(element: HTMLElement | null) {
    if (!element) {
      return;
    }
    this.anchor = element;

    if (this.observer) {
      this.observer.disconnect();
    }

    this.observer = new MutationObserver(() => {
      this.isLoggingIn = element.childElementCount > 0;
    });

    this.observer.observe(element, { childList: true, subtree: true });
  }

  handleLogin(provider: ProviderTypeEnum) {
    this.login.emit({ provider, anchor: this.anchor });
    this.selectedMethod = provider;
  }

  resetLoginState() {
    this.isLoggingIn = false;
    this.selectedMethod = null;
    if (!this.anchor) {
      return;
    }
    while (this.anchor.firstChild) {
      this.anchor.removeChild(this.anchor.firstChild);
    }
  }

  handleClose() {
    this.close.emit();
  }

  render() {
    return (
      <StyledHost>
        <side-panel isOpen={this.isOpen} side={SidePanelSideEnum.RIGHT} onClose={this.handleClose.bind(this)} panelClassName="unlock-panel">
          <unlock-header
            text={this.isLoggingIn ? `${this.selectedMethod} connect` : 'Connect your wallet'}
            backIcon={this.isLoggingIn ? faArrowLeft : null}
            onBack={this.resetLoginState.bind(this)}
            onClose={this.handleClose.bind(this)}
          />
          <div id="anchor" ref={element => this.observeContainer(element)}></div>
          {!this.isLoggingIn && (
            <div class="body bg-indigo-400">
              {this.allowedProviders.map(method => (
                <provider-button type={method} onClick={this.handleLogin.bind(this, method)}></provider-button>
              ))}
              <slot></slot>
            </div>
          )}
        </side-panel>
      </StyledHost>
    );
  }
}
