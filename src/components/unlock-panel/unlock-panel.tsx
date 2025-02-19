import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import type { EventEmitter } from '@stencil/core';
import { Component, Event, h, Prop, State, Watch } from '@stencil/core';
import { ProviderTypeEnum } from 'types/provider.types';

@Component({
  tag: 'unlock-panel',
  styleUrl: 'unlock-panel.scss',
  shadow: true,
})
export class UnlockPanel {
  @Prop() open: boolean = false;
  @Prop() allowedProviders?: ProviderTypeEnum[] = Object.values(ProviderTypeEnum);
  @Event() close: EventEmitter;
  @Event() login: EventEmitter<{ provider: ProviderTypeEnum; anchor?: HTMLElement }>;

  @State() isVisible: boolean = false; // Controls DOM presence
  @State() shouldAnimate: boolean = false; // Ensures animation plays on open
  @State() isLoggingIn: boolean = false;
  @State() selectedMethod: ProviderTypeEnum | null = null;

  private anchor: HTMLElement | null = null;
  private observer: MutationObserver | null = null;
  private closeTimeout: NodeJS.Timeout | null = null;

  @Watch('open')
  handleOpenChange(newValue: boolean) {
    if (newValue) {
      if (this.closeTimeout) {
        clearTimeout(this.closeTimeout);
      }
      this.isVisible = true; // Ensure component is in DOM

      // Delay animation to allow rendering first
      return requestAnimationFrame(() => {
        this.shouldAnimate = true;
      });
    }

    this.shouldAnimate = false;
    this.closeTimeout = setTimeout(() => {
      this.isVisible = false;
      this.resetLoginState();
    }, 300); // Delay unmounting after animation
  }

  handleClose = (event: MouseEvent) => {
    if (event.target === event.currentTarget) {
      this.close.emit();
    }
  };

  private observeContainer(element: HTMLElement | null) {
    if (!element) {
      return;
    }
    this.anchor = element;

    if (this.observer) this.observer.disconnect();

    this.observer = new MutationObserver(() => {
      this.isLoggingIn = element.childElementCount > 0;
    });

    this.observer.observe(element, { childList: true, subtree: true });
  }

  handleLogin = (provider: ProviderTypeEnum) => {
    this.login.emit({ provider, anchor: this.anchor });
    this.selectedMethod = provider;
  };

  resetLoginState = () => {
    this.isLoggingIn = false;
    this.selectedMethod = null;
    if (!this.anchor) {
      return;
    }
    while (this.anchor.firstChild) {
      this.anchor.removeChild(this.anchor.firstChild);
    }
  };

  render() {
    if (!this.isVisible) {
      return null;
    }

    return (
      <div
        class={{
          overlay: true,
          visible: this.shouldAnimate,
          hidden: !this.shouldAnimate,
        }}
        onClick={this.handleClose}
        tabindex="-1"
      >
        <div class="panel">
          <unlock-header
            text={this.isLoggingIn ? `${this.selectedMethod} connect` : 'Connect your wallet'}
            backIcon={this.isLoggingIn ? faArrowLeft : null}
            onBack={this.resetLoginState}
            onClose={() => this.close.emit()}
          />
          <div id="anchor" ref={element => this.observeContainer(element)}></div>
          {!this.isLoggingIn && (
            <div class="body">
              {this.allowedProviders.map(method => (
                <provider-button type={method} onClick={() => this.handleLogin(method)}></provider-button>
              ))}

              <slot></slot>
            </div>
          )}
        </div>
      </div>
    );
  }
}
