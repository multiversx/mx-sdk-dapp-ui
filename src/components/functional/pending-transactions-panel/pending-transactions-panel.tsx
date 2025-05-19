import { Component, h, Method, Prop, State, Watch } from '@stencil/core';
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

interface IPendingTransactionsPanelState {
  provider: IProviderBase | null;
  shouldClose?: boolean;
}

@Component({
  tag: 'mvx-pending-transactions-panel',
  styleUrl: 'pending-transactions-panel.css',
})
export class PendingTransactionstPanel {
  private eventBus: IEventBus = new EventBus();

  @Prop() data: IPendingTransactionsPanelState = {
    provider: null,
    shouldClose: false,
  };

  @State() state: IPendingTransactionsPanelState = this.data;
  @State() isOpen: boolean = false;

  @Method() async getEventBus() {
    return this.eventBus;
  }

  @Watch('provider')
  handleDataChange(newProvider: IPendingTransactionsPanelState) {
    this.state = { ...newProvider };
  }

  cmponentWillLoad() {
    this.state = { ...this.data };
  }

  componentDidLoad() {
    this.eventBus.subscribe(PendingTransactionsEventsEnum.DATA_UPDATE, this.dataUpdate.bind(this));
    this.eventBus.subscribe(PendingTransactionsEventsEnum.OPEN_PENDING_TRANSACTIONS_PANEL, this.handleOpen.bind(this));
    this.eventBus.subscribe(PendingTransactionsEventsEnum.CLOSE_PENDING_TRANSACTIONS, this.onClose.bind(this, { isUserClick: false }));
  }

  disconnectedCallback() {
    this.resetState();
    this.eventBus.unsubscribe(PendingTransactionsEventsEnum.DATA_UPDATE, this.dataUpdate.bind(this));
    this.eventBus.unsubscribe(PendingTransactionsEventsEnum.OPEN_PENDING_TRANSACTIONS_PANEL, this.handleOpen.bind(this));
    this.eventBus.unsubscribe(PendingTransactionsEventsEnum.CLOSE_PENDING_TRANSACTIONS, this.onClose.bind(this, { isUserClick: false }));
  }

  private resetState() {
    this.state = null;
    this.isOpen = false;
  }

  handleOpen() {
    this.isOpen = true;
  }

  handleClose() {
    this.isOpen = false;
    this.onClose({ isUserClick: true });
  }

  onClose(props = { isUserClick: true }) {
    this.isOpen = false;

    if (props.isUserClick) {
      this.eventBus.publish(PendingTransactionsEventsEnum.CLOSE_PENDING_TRANSACTIONS);
    }
  }

  private dataUpdate(newData: IPendingTransactionsPanelState) {
    this.state = { ...newData };

    if (newData.shouldClose) {
      this.onClose({ isUserClick: false });
    }
  }

  render() {
    return (
      <mvx-side-panel isOpen={this.isOpen} panelTitle={this.state.provider?.name} panelClassName="pending-transactions-panel" showHeader={false}>
        <mvx-provider-idle-screen provider={this.state.provider} onClose={this.handleClose.bind(this)} introText={getProviderIntroText(this.state.provider?.type)}>
          <button onClick={this.handleClose.bind(this)} slot="close-button">
            Close
          </button>
        </mvx-provider-idle-screen>
      </mvx-side-panel>
    );
  }
}
