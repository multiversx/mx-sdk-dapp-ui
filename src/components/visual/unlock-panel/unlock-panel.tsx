import type { EventEmitter } from '@stencil/core';
import { Component, Element, Event, h, Prop, State } from '@stencil/core';
import classNames from 'classnames';
import { ProviderLabelsEnum, ProviderTypeEnum } from 'types/provider.types';
import { processImgSrc } from 'utils/processImgSrc';

import { getIsExtensionAvailable, getIsMetaMaskAvailable } from './helpers';

@Component({
  tag: 'mvx-unlock-panel',
  styleUrl: 'unlock-panel.scss',
  shadow: true,
})
export class UnlockPanel {
  @Element() hostElement: HTMLElement;

  @Prop() isOpen: boolean = false;
  @Prop() allowedProviders?: ProviderTypeEnum[] = Object.values(ProviderTypeEnum);

  @Event() close: EventEmitter;
  @Event() login: EventEmitter<{ provider: ProviderTypeEnum; anchor?: HTMLElement }>;

  @State() isLoggingIn: boolean = false;
  @State() selectedMethod: ProviderTypeEnum | null = null;
  @State() hasSlotContent: boolean = false;

  private isExtensionInstalled(currentProvider: ProviderTypeEnum) {
    return currentProvider === ProviderTypeEnum.extension && getIsExtensionAvailable();
  }

  private isMetaMaskInstalled(currentProvider: ProviderTypeEnum) {
    return currentProvider === ProviderTypeEnum.metamask && getIsMetaMaskAvailable();
  }

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

  handleResetLoginState(event: MouseEvent) {
    event.preventDefault();

    this.isLoggingIn = false;
    this.selectedMethod = null;

    if (!this.anchor) {
      return;
    }

    while (this.anchor.firstChild) {
      this.anchor.removeChild(this.anchor.firstChild);
    }
  }

  handleClose(event: MouseEvent) {
    event.preventDefault();
    this.close.emit();
  }

  render() {
    const detectedProviders: ProviderTypeEnum[] = this.allowedProviders.filter(
      allowedProvider => this.isExtensionInstalled(allowedProvider) || this.isMetaMaskInstalled(allowedProvider),
    );

    const otherProviders = this.allowedProviders.filter(allowedProvider => !detectedProviders.includes(allowedProvider));
    const panelTitle = this.selectedMethod ? ProviderLabelsEnum[this.selectedMethod] : 'Connect your wallet';
    const hasDetectedProviders = detectedProviders.length > 0;

    return (
      <mvx-side-panel
        isOpen={this.isOpen}
        panelTitle={panelTitle}
        withBackButton={this.isLoggingIn}
        onClose={this.handleClose.bind(this)}
        onBack={this.handleResetLoginState.bind(this)}
      >
        <div id="anchor" ref={element => this.observeContainer(element)} class={{ 'unlock-panel-anchor': this.isLoggingIn }} />

        {!this.isLoggingIn && (
          <div class="unlock-panel">
            <div class="unlock-panel-groups">
              {hasDetectedProviders && (
                <div class="unlock-panel-group">
                  <div class="unlock-panel-group-label">Detected</div>

                  <div class="unlock-panel-group-providers">
                    {detectedProviders.map((provider, providerIndex) => (
                      <mvx-provider-button
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
                    <mvx-provider-button
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

              <div class="unlock-panel-group">
                <div class="unlock-panel-group-label">External Providers</div>

                <div class="unlock-panel-group-providers">
                  <slot />
                </div>
              </div>
            </div>

            <div class="unlock-panel-footer">
              <img src={processImgSrc('unlock-panel-wallet.png')} class="unlock-panel-footer-image" />

              <div class="unlock-panel-footer-wrapper">
                <div class="unlock-panel-footer-title">Don't have a wallet?</div>
                <div class="unlock-panel-footer-subtitle">
                  Take full control of <br /> your assets.
                </div>

                <mvx-arrow-up-right-icon class="unlock-panel-footer-icon" />
              </div>
            </div>
          </div>
        )}
      </mvx-side-panel>
    );
  }
}
