import { Component, h, Element, Method, forceUpdate, Prop } from '@stencil/core';
import { EventBus, IEventBus } from 'utils/EventBus';
import { IPendingTransactionsModalData, PendingTransactionsEventsEnum } from './pending-transactions-modal.types';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

@Component({
  tag: 'pending-transactions-modal',
  styleUrl: 'pending-transactions-modal.css',
  shadow: true,
})
export class PendingTransactionstModal {
  @Element() hostElement: HTMLElement;
  private eventBus: IEventBus = EventBus.getInstance();

  @Prop() data: IPendingTransactionsModalData = {
    isPending: false,
    title: '',
    subtitle: '',
  };

  @Method() async getEventBus() {
    return this.eventBus;
  }

  render() {
    return (
      <generic-modal
        modalTitle={<div data-testid={DataTestIdsEnum.pendingTransactionsTitle}>{this.data.title}</div>}
        modalSubtitle={<div data-testid={DataTestIdsEnum.pendingTransactionsSubtitle}>{this.data.subtitle}</div>}
        onClose={() => this.close()}
        body={
          <div class="modal-body">
            <button class="close-button" onClick={() => this.close()}>
              Close
            </button>
          </div>
        }
      ></generic-modal>
    );
  }

  close(props = { isUserClick: true }) {
    if (props.isUserClick) {
      this.eventBus.publish(PendingTransactionsEventsEnum.CLOSE);
    }

    if (this.hostElement && this.hostElement.parentNode) {
      this.hostElement.parentNode.removeChild(this.hostElement);
    }
  }

  private dataUpdate(payload: any) {
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
