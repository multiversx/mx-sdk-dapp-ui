import { Component, Element, h, Method, State } from '@stencil/core';
import { ANIMATION_DELAY_PROMISE } from 'components/visual/side-panel/side-panel.constants';
import type { IProviderBase } from 'types/provider.types';
import { ProviderTypeEnum } from 'types/provider.types';
import type { IEventBus } from 'utils/EventBus';
import { EventBus } from 'utils/EventBus';

import { UnlockPanelGroupSlotEnum } from './components/unlock-panel-group/unlock-panel-group';
import { getIsExtensionAvailable, getIsMetaMaskAvailable } from './helpers';
import type { IUnlockPanelManagerData } from './unlock-panel.types';
import { UnlockPanelEventsEnum } from './unlock-panel.types';

const unlockPanelClasses: Record<string, string> = {
  detectedPanelGroup: 'mvx:hidden mvx:sm:flex',
  desktopPanelGroupTitle: 'mvx:hidden mvx:sm:flex',
  mobilePanelGroupTitle: 'mvx:sm:hidden',
};

@Component({
  tag: 'mvx-unlock-panel',
  styleUrl: 'unlock-panel.scss',
  shadow: true,
})
export class UnlockPanel {
  @Element() hostElement: HTMLElement;

  private eventBus: IEventBus = new EventBus();
  private unsubscribeFunctions: (() => void)[] = [];
  private anchor: HTMLElement | null = null;

  @State() isOpen: boolean = false;
  @State() walletAddress: IUnlockPanelManagerData['walletAddress'] = null;
  @State() allowedProviders: IUnlockPanelManagerData['providers'] = [];

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

  private setAnchor(element: HTMLElement | null) {
    if (!element) {
      return;
    }

    this.anchor = element;
    this.anchor.addEventListener(UnlockPanelEventsEnum.ANCHOR_CLOSE, this.handleResetLoginState);
  }

  private unlockPanelUpdate = ({ providers, walletAddress }: IUnlockPanelManagerData) => {
    this.isOpen = true;
    this.walletAddress = walletAddress;
    this.allowedProviders = providers;
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

    const panelTitle = this.selectedMethod ? this.selectedMethod.name : 'Connect a wallet';
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
                  providers={detectedProviders}
                  onLogin={(event: CustomEvent) => this.handleLogin(event.detail)}
                  class={unlockPanelClasses.detectedPanelGroup}
                >
                  <div slot={UnlockPanelGroupSlotEnum.groupLabel}>Detected</div>
                </mvx-unlock-panel-group>
              )}

              <mvx-unlock-panel-group
                providers={otherProviders}
                onLogin={(event: CustomEvent) => this.handleLogin(event.detail)}
              >
                <div slot={UnlockPanelGroupSlotEnum.groupLabel}>
                  <div class={unlockPanelClasses.mobilePanelGroupTitle}>Options</div>
                  <div class={unlockPanelClasses.desktopPanelGroupTitle}>
                    {hasDetectedProviders ? 'Other Options' : 'Options'}
                  </div>
                </div>

                <slot />
              </mvx-unlock-panel-group>
            </div>

            <mvx-unlock-panel-footer walletAddress={this.walletAddress} />
          </div>
        )}
      </mvx-side-panel>
    );
  }
}
