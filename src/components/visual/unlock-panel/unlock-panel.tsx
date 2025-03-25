import type { EventEmitter } from '@stencil/core';
import { Component, Event, h, Prop, State } from '@stencil/core';
import { ProviderTypeEnum } from 'types/provider.types';

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
  @Prop() isExtensionAvailable: boolean = false;

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

  componentWillLoad() {
    console.log('Allowed Providers:', this.allowedProviders, this.observeContainer);
  }

  render() {
    return (
      <side-panel
        isOpen={this.isOpen}
        title="Connect your wallet"
        panelClassName="unlock-panel"
        onClose={this.handleClose.bind(this)}
        onBack={this.handleResetLoginState.bind(this)}
      >
        <div id="anchor" ref={element => this.observeContainer(element)} />
        {!this.isLoggingIn && (
          <div class="body">
            {this.allowedProviders.map(method => (
              <provider-button type={method} onClick={this.handleLogin.bind(this, method)}></provider-button>
            ))}
            <slot></slot>
          </div>
        )}
      </side-panel>
    );
  }
}
