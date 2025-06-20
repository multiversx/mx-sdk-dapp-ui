import { Component, h, Method, State } from '@stencil/core';
import { ANIMATION_DELAY_PROMISE } from 'components/visual/side-panel/side-panel.constants';
import type { IProviderBase } from 'types/provider.types';
import { ProviderTypeEnum } from 'types/provider.types';
import type { IEventBus } from 'utils/EventBus';
import { EventBus } from 'utils/EventBus';

import { PendingTransactionsEventsEnum } from './pending-transactions-panel.types';

const getProviderIntroText = (providerType?: IProviderBase['type']) => {
  switch (providerType) {
    case ProviderTypeEnum.extension:
      return 'Check  the MultiversX Browser Extension to connect to your wallet.';
    case ProviderTypeEnum.metamask:
      return 'Open the MetaMask Browser Extension to connect to your wallet.';
    case ProviderTypeEnum.passkey:
      return 'Use your predefined passkey to connect to your wallet.';
    case ProviderTypeEnum.crossWindow:
      return 'Follow the steps on MultiversX Web Wallet to connect to your wallet.';
    default:
      return 'Follow the steps on your selected provider to connect to your wallet.';
  }
};

@Component({
  tag: 'mvx-pending-transactions-panel',
  styleUrl: 'pending-transactions-panel.scss',
  shadow: true,
})
export class PendingTransactionsPanel {
  private eventBus: IEventBus = new EventBus();
  private unsubscribeFunctions: (() => void)[] = [];

  @State() provider: IProviderBase = null;
  @State() isOpen: boolean = false;

  @Method() async getEventBus() {
    return this.eventBus;
  }

  @Method() async closeWithAnimation() {
    this.isOpen = false;
    const animationDelay = await ANIMATION_DELAY_PROMISE;
    return animationDelay;
  }

  componentDidLoad() {
    const unsubDataUpdate = this.eventBus.subscribe(PendingTransactionsEventsEnum.DATA_UPDATE, this.dataUpdate);
    this.unsubscribeFunctions.push(unsubDataUpdate);
  }

  disconnectedCallback() {
    this.resetState();
    this.unsubscribeFunctions.forEach(unsub => unsub());
    this.unsubscribeFunctions = [];
  }

  private resetState() {
    this.provider = null;
    this.isOpen = false;
  }

  private handleClose = () => {
    this.eventBus.publish(PendingTransactionsEventsEnum.CLOSE);
  };

  private dataUpdate = (newData: IProviderBase) => {
    this.provider = newData;
    this.isOpen = true;
  };

  render() {
    return (
      <mvx-side-panel isOpen={this.isOpen} panelTitle={this?.provider?.name} showHeader={false}>
        <mvx-provider-idle-screen
          provider={this.provider}
          onClose={this.handleClose}
          introTitle="Signing Transaction"
          introText={getProviderIntroText(this.provider?.type)}
        >
          <button onClick={this.handleClose} slot="close-button">
            Close
          </button>
        </mvx-provider-idle-screen>
      </mvx-side-panel>
    );
  }
}
