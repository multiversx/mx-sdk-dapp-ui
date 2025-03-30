import type { EventEmitter } from '@stencil/core';
import { Component, Event, h, Prop, State } from '@stencil/core';
import classNames from 'classnames';
import { ProviderTypeEnum } from 'types/provider.types';
import { StyledHost } from 'utils/StyledHost';

import { getIsExtensionAvailable, getIsMetaMaskAvailable } from './helpers';

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

  private isExtensionInstalled = (currentProvider: ProviderTypeEnum) => currentProvider === ProviderTypeEnum.extension && getIsExtensionAvailable();
  private isMetaMaskInstalled = (currentProvider: ProviderTypeEnum) => currentProvider === ProviderTypeEnum.metamask && getIsMetaMaskAvailable();

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

  handleResetLoginState = (event: MouseEvent) => {
    event.preventDefault();

    this.isLoggingIn = false;
    this.selectedMethod = null;

    if (!this.anchor) {
      return;
    }

    while (this.anchor.firstChild) {
      this.anchor.removeChild(this.anchor.firstChild);
    }
  };

  handleClose = (event: MouseEvent) => {
    event.preventDefault();
    this.close.emit();
  };

  render() {
    const detectedProviders: ProviderTypeEnum[] = this.allowedProviders.filter(
      allowedProvider => this.isExtensionInstalled(allowedProvider) || this.isMetaMaskInstalled(allowedProvider),
    );

    const otherProviders = this.allowedProviders.filter(allowedProvider => !detectedProviders.includes(allowedProvider));
    const hasDetectedProviders = detectedProviders.length > 0;

    return (
      <StyledHost>
        <side-panel
          isOpen={this.isOpen}
          panelTitle="Connect your wallet"
          onClose={this.handleClose.bind(this)}
          onBack={this.handleResetLoginState.bind(this)}
          withBackButton={this.isLoggingIn}
        >
          <div id="anchor" ref={element => this.observeContainer(element)} />

          <div class="unlock-panel">
            {!this.isLoggingIn && (
              <div class="unlock-panel-groups">
                {hasDetectedProviders && (
                  <div class="unlock-panel-group">
                    <div class="unlock-panel-group-label">Detected</div>

                    <div class="unlock-panel-group-providers">
                      {detectedProviders.map((provider, providerIndex) => (
                        <provider-button
                          type={provider}
                          onClick={this.handleLogin.bind(this, provider)}
                          class={classNames('unlock-panel-group-provider', {
                            first: providerIndex === 0,
                            last: providerIndex === detectedProviders.length - 1,
                          })}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div class="unlock-panel-group">
                  <div class="unlock-panel-group-label">{hasDetectedProviders ? 'Other Options' : 'Options'}</div>

                  <div class="unlock-panel-group-providers">
                    {otherProviders.map((provider, providerIndex) => (
                      <provider-button
                        type={provider}
                        onClick={this.handleLogin.bind(this, provider)}
                        class={classNames('unlock-panel-group-provider', {
                          first: providerIndex === 0,
                          last: providerIndex === otherProviders.length - 1,
                        })}
                      />
                    ))}
                  </div>
                </div>

                <slot></slot>
              </div>
            )}
          </div>
        </side-panel>
      </StyledHost>
    );
  }
}
