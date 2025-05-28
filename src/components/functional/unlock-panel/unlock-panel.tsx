import { Component, Element, h, Method, State } from '@stencil/core';
import { ANIMATION_DELAY_PROMISE } from 'components/visual/side-panel/side-panel.constants';
import type { IProviderBase } from 'types/provider.types';
import { ProviderTypeEnum } from 'types/provider.types';
import type { IEventBus } from 'utils/EventBus';
import { EventBus } from 'utils/EventBus';

import { getIsExtensionAvailable, getIsMetaMaskAvailable } from './helpers';
import { UnlockPanelEventsEnum } from './unlock-panel.types';

@Component({
  tag: 'mvx-unlock-panel',
  styleUrl: 'unlock-panel.scss',
  shadow: true,
})
export class UnlockPanel {
  private eventBus: IEventBus = new EventBus();
  private unsubscribeFunctions: (() => void)[] = [];

  @Element() hostElement: HTMLElement;

  @State() isOpen: boolean = false;
  @State() allowedProviders: IProviderBase[] = [];

  @State() isLoggingIn: boolean = false;
  @State() isIntroScreenVisible: boolean = false;
  @State() selectedMethod: IProviderBase | null = null;

  @Method() async getEventBus() {
    return this.eventBus;
  }

  @Method() async closeWithAnimation() {
    this.isOpen = false;
    const animationDelay = await ANIMATION_DELAY_PROMISE;
    return animationDelay;
  }

  componentDidLoad() {
    const unsubDataUpdate = this.eventBus.subscribe(UnlockPanelEventsEnum.OPEN, this.unlockPanelUpdate);
    const unsubCancelInProvider = this.eventBus.subscribe(
      UnlockPanelEventsEnum.CANCEL_IN_PROVIDER,
      this.handleResetLoginState,
    );
    this.unsubscribeFunctions.push(unsubDataUpdate, unsubCancelInProvider);
  }

  async disconnectedCallback() {
    this.unsubscribeFunctions.forEach(unsub => unsub());
    this.unsubscribeFunctions = [];
    this.isLoggingIn = false;
    this.selectedMethod = null;
    this.isOpen = false;
    this.isIntroScreenVisible = false;
    this.allowedProviders = [];
  }

  private isExtensionInstalled(currentProvider: IProviderBase['type']) {
    return currentProvider === ProviderTypeEnum.extension && getIsExtensionAvailable();
  }

  private isMetaMaskInstalled(currentProvider: IProviderBase['type']) {
    return currentProvider === ProviderTypeEnum.metamask && getIsMetaMaskAvailable();
  }

  private isCustomProvider(currentProvider: IProviderBase['type']) {
    return !Object.values(ProviderTypeEnum).includes(currentProvider as ProviderTypeEnum);
  }

  private anchor: HTMLElement | null = null;

  private setAnchor(element: HTMLElement | null) {
    if (!element) {
      return;
    }

    this.anchor = element;
    this.anchor.addEventListener(UnlockPanelEventsEnum.ANCHOR_CLOSE, this.handleResetLoginState);
  }

  private unlockPanelUpdate = (allowedProviders: IProviderBase[]) => {
    this.isOpen = true;
    this.allowedProviders = allowedProviders;
  };

  private handleLogin(provider: IProviderBase) {
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

  private handleResetLoginState = () => {
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
  };

  private handleClose = () => {
    if (this.selectedMethod) {
      this.eventBus.publish(UnlockPanelEventsEnum.CANCEL_LOGIN);
    }

    this.eventBus.publish(UnlockPanelEventsEnum.CLOSE);
  };

  private handleAccess = () => {
    this.isIntroScreenVisible = false;
    this.isLoggingIn = true;
    this.eventBus.publish(UnlockPanelEventsEnum.LOGIN, { type: this.selectedMethod.type, anchor: this.anchor });
  };

  render() {
    const detectedProviders: IProviderBase[] = this.allowedProviders.filter(
      allowedProvider =>
        this.isExtensionInstalled(allowedProvider.type) || this.isMetaMaskInstalled(allowedProvider.type),
    );

    const otherProviders = this.allowedProviders.filter(
      allowedProvider => !detectedProviders.includes(allowedProvider),
    );

    const panelTitle = this.selectedMethod ? this.selectedMethod.name : 'Connect your wallet';
    const hasDetectedProviders = detectedProviders.length > 0;

    const isProviderScreenVisible = !this.isLoggingIn && !this.isIntroScreenVisible;
    const isCustomProviderActive = this.selectedMethod && this.isCustomProvider(this.selectedMethod.type);

    return (
      <mvx-side-panel
        isOpen={this.isOpen}
        panelTitle={panelTitle}
        onClose={this.handleClose}
        onBack={this.handleResetLoginState}
        hasBackButton={isCustomProviderActive}
        showHeader={isProviderScreenVisible || isCustomProviderActive}
        panelClassName="unlock-panel"
      >
        <div
          id="anchor"
          ref={(element: HTMLDivElement) => this.setAnchor(element)}
          class={{ 'unlock-panel-anchor': this.isLoggingIn || this.isIntroScreenVisible }}
        >
          {this.isIntroScreenVisible && (
            <mvx-provider-idle-screen
              onAccess={this.handleAccess}
              provider={this.selectedMethod}
              onClose={this.handleResetLoginState}
            />
          )}
        </div>

        {isProviderScreenVisible && (
          <div class="unlock-panel">
            <div class="unlock-panel-groups">
              {hasDetectedProviders && (
                <mvx-unlock-panel-group
                  groupTitle="Detected"
                  providers={detectedProviders}
                  onLogin={(event: CustomEvent) => this.handleLogin(event.detail)}
                />
              )}

              <mvx-unlock-panel-group
                providers={otherProviders}
                groupTitle={hasDetectedProviders ? 'Other Options' : 'Options'}
                onLogin={(event: CustomEvent) => this.handleLogin(event.detail)}
              >
                <slot />
              </mvx-unlock-panel-group>
            </div>

            <mvx-unlock-panel-footer />
          </div>
        )}
      </mvx-side-panel>
    );
  }
}
