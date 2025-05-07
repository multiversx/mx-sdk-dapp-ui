import { Component, Element, h, Method, Prop, State, Watch } from '@stencil/core';
import classNames from 'classnames';
import type { IProviderBase } from 'types/provider.types';
import { ProviderTypeEnum } from 'types/provider.types';
import type { IEventBus } from 'utils/EventBus';
import { EventBus } from 'utils/EventBus';
import { processImgSrc } from 'utils/processImgSrc';

import { getIsExtensionAvailable, getIsMetaMaskAvailable } from './helpers';
import { UnlockPanelEventsEnum } from './unlock-panel.types';

const unlockPanelClasses: Record<string, string> = {
  footerIcon: 'mvx:w-4! mvx:h-auto!',
};

@Component({
  tag: 'mvx-unlock-panel',
  styleUrl: 'unlock-panel.scss',
  shadow: true,
})
export class UnlockPanel {
  private eventBus: IEventBus = new EventBus();
  @Element() hostElement: HTMLElement;

  @Prop() isOpen: boolean = false;
  @Prop() allowedProviders: IProviderBase[] = [];

  @State() isLoggingIn: boolean = false;
  @State() isIntroScreenVisible: boolean = false;
  @State() selectedMethod: IProviderBase | null = null;
  @State() hasSlotContent: boolean = false;
  @State() panelState = {
    isOpen: false,
    allowedProviders: this.allowedProviders,
  };
  @Method() async getEventBus() {
    return this.eventBus;
  }

  @Watch('isOpen')
  handleIsOpenChange(newValue: boolean) {
    this.panelState = { ...this.panelState, isOpen: newValue };
  }

  @Watch('allowedProviders')
  handleAllowedProvidersChange(newValue: IProviderBase[]) {
    this.panelState = { ...this.panelState, allowedProviders: newValue };
  }

  private isExtensionInstalled(currentProvider: IProviderBase['type']) {
    return currentProvider === ProviderTypeEnum.extension && getIsExtensionAvailable();
  }

  private isMetaMaskInstalled(currentProvider: IProviderBase['type']) {
    return currentProvider === ProviderTypeEnum.metamask && getIsMetaMaskAvailable();
  }

  private anchor: HTMLElement | null = null;
  private observer: MutationObserver | null = null;

  async disconnectedCallback() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }

    this.eventBus.unsubscribe(UnlockPanelEventsEnum.OPEN, this.unlockPanelUpdate.bind(this));
    this.eventBus.unsubscribe(UnlockPanelEventsEnum.CANCEL_IN_PROVIDER, this.handleResetLoginState.bind(this));
    this.isLoggingIn = false;
    this.selectedMethod = null;
    this.panelState = { isOpen: false, allowedProviders: [] };

    const delayClosingAnimation = new Promise(resolve => setTimeout(resolve, 300));
    return delayClosingAnimation;
  }

  componentDidLoad() {
    this.eventBus.subscribe(UnlockPanelEventsEnum.OPEN, this.unlockPanelUpdate.bind(this));
    this.eventBus.subscribe(UnlockPanelEventsEnum.CANCEL_IN_PROVIDER, this.handleResetLoginState.bind(this));
  }

  private unlockPanelUpdate(payload: { isOpen: boolean; allowedProviders: IProviderBase[] }) {
    this.panelState = {
      ...payload,
      allowedProviders: payload.allowedProviders,
    };
  }

  handleLogin(provider: IProviderBase) {
    this.selectedMethod = provider;

    switch (provider.type) {
      case ProviderTypeEnum.ledger:
        this.isIntroScreenVisible = true;
        break;
      case ProviderTypeEnum.crossWindow:
      case ProviderTypeEnum.extension:
      case ProviderTypeEnum.metamask:
      case ProviderTypeEnum.passkey:
        this.isIntroScreenVisible = true;
        this.isLoggingIn = true;
        this.eventBus.publish(UnlockPanelEventsEnum.LOGIN, { type: provider.type, anchor: this.anchor });
        break;
      default:
        this.handleAccess();
    }
  }

  handleResetLoginState(event?: MouseEvent) {
    event?.preventDefault?.();
    this.isLoggingIn = false;
    this.isIntroScreenVisible = false;
    this.selectedMethod = null;

    if (!this.anchor) {
      return;
    }

    while (this.anchor.firstChild) {
      this.anchor.removeChild(this.anchor.firstChild);
    }
    this.eventBus.publish(UnlockPanelEventsEnum.CANCEL_LOGIN);
  }

  handleClose(event: MouseEvent) {
    event.preventDefault();
    if (this.selectedMethod) {
      this.eventBus.publish(UnlockPanelEventsEnum.CANCEL_LOGIN);
    }

    this.eventBus.publish(UnlockPanelEventsEnum.CLOSE);
  }

  handleAccess() {
    this.isIntroScreenVisible = false;
    this.isLoggingIn = true;
    this.eventBus.publish(UnlockPanelEventsEnum.LOGIN, { type: this.selectedMethod.type, anchor: this.anchor });
  }

  render() {
    const detectedProviders: IProviderBase[] = this.panelState.allowedProviders.filter(
      allowedProvider => this.isExtensionInstalled(allowedProvider.type) || this.isMetaMaskInstalled(allowedProvider.type),
    );

    const otherProviders = this.panelState.allowedProviders.filter(allowedProvider => !detectedProviders.includes(allowedProvider));
    const panelTitle = this.selectedMethod ? this.selectedMethod.name : 'Connect your wallet';
    const hasDetectedProviders = detectedProviders.length > 0;

    const isProviderScreenVisible = !this.isLoggingIn && !this.isIntroScreenVisible;

    return (
      <mvx-side-panel
        isOpen={this.panelState.isOpen}
        panelTitle={panelTitle}
        withBackButton={this.isLoggingIn}
        onClose={this.handleClose.bind(this)}
        onBack={this.handleResetLoginState.bind(this)}
      >
        <div
          id="anchor"
          ref={el => {
            this.anchor = el;
          }}
          class={{ 'unlock-panel-anchor': this.isLoggingIn }}
        >
          {this.isIntroScreenVisible && <mvx-unlock-provider-intro provider={this.selectedMethod} onAccess={this.handleAccess.bind(this)} />}
        </div>

        {isProviderScreenVisible && (
          <div class="unlock-panel">
            <div class="unlock-panel-groups">
              {hasDetectedProviders && (
                <div class="unlock-panel-group">
                  <div class="unlock-panel-group-label">Detected</div>

                  <div class="unlock-panel-group-providers">
                    {detectedProviders.map(provider => (
                      <mvx-unlock-provider-button provider={provider} onClick={this.handleLogin.bind(this, provider)} />
                    ))}
                  </div>
                </div>
              )}

              <div class="unlock-panel-group">
                <div class="unlock-panel-group-label">{hasDetectedProviders ? 'Other Options' : 'Options'}</div>

                <div class="unlock-panel-group-providers">
                  {otherProviders.map(provider => (
                    <mvx-unlock-provider-button provider={provider} onClick={this.handleLogin.bind(this, provider)} />
                  ))}

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

                <mvx-arrow-up-right-icon
                  class={classNames('unlock-panel-footer-icon', {
                    [unlockPanelClasses.footerIcon]: true,
                  })}
                />
              </div>
            </div>
          </div>
        )}
      </mvx-side-panel>
    );
  }
}
