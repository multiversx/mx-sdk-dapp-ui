import { Component, forceUpdate, h, Method, Prop, State } from '@stencil/core';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';
import type { IEventBus } from 'utils/EventBus';
import { EventBus } from 'utils/EventBus';

import type { IPendingTransactionsPanelData } from './pending-transactions-panel.types';
import { PendingTransactionsEventsEnum } from './pending-transactions-panel.types';

@Component({
  tag: 'pending-transactions-panel',
  styleUrl: 'pending-transactions-panel.css',
  shadow: true,
})
export class PendingTransactionstPanel {
  private eventBus: IEventBus = new EventBus();
  @State() isOpen: boolean = false;

  @Prop() data: IPendingTransactionsPanelData = {
    isPending: false,
    title: '',
    subtitle: '',
  };

  componentDidLoad() {
    this.eventBus.subscribe(PendingTransactionsEventsEnum.DATA_UPDATE, this.dataUpdate.bind(this));
    this.eventBus.subscribe(PendingTransactionsEventsEnum.OPEN_PENDING_TRANSACTIONS_PANEL, this.handleOpen.bind(this));
    this.eventBus.subscribe(PendingTransactionsEventsEnum.CLOSE_PENDING_TRANSACTIONS, this.onClose.bind(this, { isUserClick: false }));
  }

  disconnectedCallback() {
    this.eventBus.unsubscribe(PendingTransactionsEventsEnum.DATA_UPDATE, this.dataUpdate.bind(this));
    this.eventBus.unsubscribe(PendingTransactionsEventsEnum.OPEN_PENDING_TRANSACTIONS_PANEL, this.handleOpen.bind(this));
    this.eventBus.unsubscribe(PendingTransactionsEventsEnum.CLOSE_PENDING_TRANSACTIONS, this.onClose.bind(this, { isUserClick: false }));
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
    this.data = { ...payload };
    forceUpdate(this);
  }

  @Method() async getEventBus() {
    return this.eventBus;
  }

  render() {
    return (
      <side-panel isOpen={this.isOpen} panelClassName="pending-transactions-panel" onClose={this.handleClose.bind(this)}>
        PENDING TRANSACTIONS PANEL
        <div class="pending-transactions-content">
          <div class="pending-transactions-header">
            <h2 data-testid={DataTestIdsEnum.pendingTransactionsTitle}>{this.data.title}</h2>
            <h4 data-testid={DataTestIdsEnum.pendingTransactionsSubtitle}>{this.data.subtitle}</h4>
          </div>
          <div class="pending-transactions-body">
            <button class="close-button" onClick={this.handleClose.bind(this)}>
              Close
            </button>
          </div>
        </div>
      </side-panel>
    );
  }
}
