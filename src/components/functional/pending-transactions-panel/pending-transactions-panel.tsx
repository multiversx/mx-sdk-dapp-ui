import { Component, Element, forceUpdate, h, Method, Prop, State } from '@stencil/core';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';
import type { IEventBus } from 'utils/EventBus';
import { EventBus } from 'utils/EventBus';

import { SidePanelSideEnum } from '../../visual/side-panel/side-panel.types';
import type { IPendingTransactionsPanelData } from './pending-transactions-panel.types';
import { PendingTransactionsEventsEnum } from './pending-transactions-panel.types';

@Component({
  tag: 'pending-transactions-panel',
  styleUrl: 'pending-transactions-panel.css',
  shadow: true,
})
export class PendingTransactionstPanel {
  @Element() hostElement: HTMLElement;
  private eventBus: IEventBus = new EventBus();
  @State() isPanelOpen: boolean = false;

  @Prop() data: IPendingTransactionsPanelData = {
    isPending: false,
    title: '',
    subtitle: '',
  };

  @Method() async getEventBus() {
    return this.eventBus;
  }

  handleClose() {
    this.close();
  }

  componentWillLoad() {
    this.isPanelOpen = true;
  }

  render() {
    return (
      <side-panel isOpen={this.isPanelOpen} side={SidePanelSideEnum.RIGHT} panelClassName="pending-transactions-panel" onClose={this.handleClose.bind(this)}>
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

  close(props = { isUserClick: true }) {
    this.isPanelOpen = false;

    if (props.isUserClick) {
      this.eventBus.publish(PendingTransactionsEventsEnum.CLOSE);
    }

    // Add a slight delay to allow the side panel to animate closed
    setTimeout(() => {
      if (this.hostElement && this.hostElement.parentNode) {
        this.hostElement.parentNode.removeChild(this.hostElement);
      }
    }, 300); // Match the animation duration in side-panel
  }

  private dataUpdate(payload: IPendingTransactionsPanelData) {
    if (payload.shouldClose) {
      return this.close({ isUserClick: false });
    }
    this.data = { ...payload };
    forceUpdate(this);
  }

  componentDidLoad() {
    this.eventBus.subscribe(PendingTransactionsEventsEnum.DATA_UPDATE, this.dataUpdate.bind(this));
  }

  disconnectedCallback() {
    this.eventBus.unsubscribe(PendingTransactionsEventsEnum.DATA_UPDATE, this.dataUpdate.bind(this));
  }
}
