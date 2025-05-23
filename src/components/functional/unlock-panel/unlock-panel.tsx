import { Component, Element, h, Method, Prop, State, Watch } from '@stencil/core';
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
  @Element() hostElement: HTMLElement;

  @Prop() isOpen: boolean = false;
  @Prop() allowedProviders: IProviderBase[] = [];

  @State() isLoggingIn: boolean = false;
  @State() isIntroScreenVisible: boolean = false;
  @State() selectedMethod: IProviderBase | null = null;
  @State() panelState = {
    isOpen: this.isOpen,
    allowedProviders: this.allowedProviders,
  };
  @Method() async getEventBus() {
    return this.eventBus;
  }

  @Method() async closeWithAnimation() {
    this.panelState = { ...this.panelState, isOpen: false };
    const animationDelay = await ANIMATION_DELAY_PROMISE;
    return animationDelay;
  }

  @Watch('isOpen')
  handleIsOpenChange(newValue: boolean) {
    this.panelState = { ...this.panelState, isOpen: newValue };
  }

  @Watch('allowedProviders')
  handleAllowedProvidersChange(newValue: IProviderBase[]) {
    this.panelState = { ...this.panelState, allowedProviders: newValue };
  }

  componentDidLoad() {
    this.eventBus.subscribe(UnlockPanelEventsEnum.OPEN, this.unlockPanelUpdate.bind(this));
    this.eventBus.subscribe(UnlockPanelEventsEnum.CANCEL_IN_PROVIDER, this.handleResetLoginState.bind(this));
  }

  async disconnectedCallback() {
    this.eventBus.unsubscribe(UnlockPanelEventsEnum.OPEN, this.unlockPanelUpdate.bind(this));
    this.eventBus.unsubscribe(UnlockPanelEventsEnum.CANCEL_IN_PROVIDER, this.handleResetLoginState.bind(this));
    this.isLoggingIn = false;
    this.selectedMethod = null;
    this.panelState = { isOpen: false, allowedProviders: [] };
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
    this.anchor.addEventListener(UnlockPanelEventsEnum.ANCHOR_CLOSE, this.handleResetLoginState.bind(this));
  }

  private unlockPanelUpdate(payload: { isOpen: boolean; allowedProviders: IProviderBase[] }) {
    this.panelState = {
      ...payload,
      allowedProviders: payload.allowedProviders,
    };
  }

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

  private handleResetLoginState(event?: MouseEvent) {
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

  private handleClose(event: MouseEvent) {
    event.preventDefault();
    if (this.selectedMethod) {
      this.eventBus.publish(UnlockPanelEventsEnum.CANCEL_LOGIN);
    }

    this.eventBus.publish(UnlockPanelEventsEnum.CLOSE);
  }

  private handleAccess() {
    this.isIntroScreenVisible = false;
    this.isLoggingIn = true;
    this.eventBus.publish(UnlockPanelEventsEnum.LOGIN, { type: this.selectedMethod.type, anchor: this.anchor });
  }

  render() {
    const detectedProviders: IProviderBase[] = this.panelState.allowedProviders.filter(
      allowedProvider =>
        this.isExtensionInstalled(allowedProvider.type) || this.isMetaMaskInstalled(allowedProvider.type),
    );

    const otherProviders = this.panelState.allowedProviders.filter(
      allowedProvider => !detectedProviders.includes(allowedProvider),
    );
    const panelTitle = this.selectedMethod ? this.selectedMethod.name : 'Connect your wallet';
    const hasDetectedProviders = detectedProviders.length > 0;

    const isProviderScreenVisible = !this.isLoggingIn && !this.isIntroScreenVisible;
    const isCustomProviderActive = this.selectedMethod && this.isCustomProvider(this.selectedMethod.type);

    return (
      <mvx-side-panel
        isOpen={this.panelState.isOpen}
        panelTitle={panelTitle}
        onClose={this.handleClose.bind(this)}
        onBack={this.handleResetLoginState.bind(this)}
        hasBackButton={isCustomProviderActive}
        showHeader={isProviderScreenVisible || isCustomProviderActive}
        panelClassName="unlock-panel"
      >
        <div id="anchor" ref={element => this.setAnchor(element)} class={{ 'unlock-panel-anchor': this.isLoggingIn }}>
          {this.isIntroScreenVisible && (
            <mvx-provider-idle-screen
              provider={this.selectedMethod}
              onAccess={this.handleAccess.bind(this)}
              onClose={this.handleResetLoginState.bind(this)}
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
                  onLogin={event => this.handleLogin(event.detail)}
                />
              )}
              <mvx-unlock-panel-group
                groupTitle={hasDetectedProviders ? 'Other Options' : 'Options'}
                providers={otherProviders}
                onLogin={event => this.handleLogin(event.detail)}
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
