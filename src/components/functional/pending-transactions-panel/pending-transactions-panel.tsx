import { Component, h, Method, Prop, State, Watch } from '@stencil/core';
import { ProviderTypeEnum } from 'types/provider.types';
import type { IEventBus } from 'utils/EventBus';
import { EventBus } from 'utils/EventBus';

import type { IPendingTransactionsPanelData } from './pending-transactions-panel.types';
import { PendingTransactionsEventsEnum } from './pending-transactions-panel.types';

const initialData: IPendingTransactionsPanelData = {
  isPending: false,
  title: '',
  subtitle: '',
};

@Component({
  tag: 'mvx-pending-transactions-panel',
  styleUrl: 'pending-transactions-panel.css',
})
export class PendingTransactionstPanel {
  private eventBus: IEventBus = new EventBus();

  @Prop() data = initialData;

  @State() dataState: IPendingTransactionsPanelData = initialData;
  @State() isOpen: boolean = false;

  @Method() async getEventBus() {
    return this.eventBus;
  }

  @Watch('data')
  handleDataChange(newValue: IPendingTransactionsPanelData) {
    this.dataState = { ...newValue };
  }

  cmponentWillLoad() {
    this.dataState = { ...this.data };
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
    this.dataState = { ...initialData };
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

  private dataUpdate(payload: IPendingTransactionsPanelData) {
    if (payload.shouldClose) {
      return this.onClose({ isUserClick: false });
    }

    this.isOpen = true;
    this.dataState = { ...payload };
  }

  render() {
    return (
      <mvx-side-panel isOpen={this.isOpen} panelTitle={this.data.title} panelClassName="pending-transactions-panel" showHeader={false}>
        <mvx-provider-idle-screen provider={{ name: 'Wallet', iconUrl: '', type: ProviderTypeEnum.crossWindow }} onClose={this.handleClose.bind(this)} />
      </mvx-side-panel>
    );
  }
}
