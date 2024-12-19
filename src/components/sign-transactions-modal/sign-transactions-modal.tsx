import { Component, Prop, h, Element, Method, forceUpdate } from '@stencil/core';
import { EventBus, IEventBus } from 'utils/EventBus';
import { ISignTransactionsModalData, SignEventsEnum } from './sign-transactions-modal.types';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

@Component({
  tag: 'sign-transactions-modal',
  styleUrl: 'sign-transactions-modal.css',
  shadow: true,
})
export class SignTransactionsModal {
  @Element() hostElement: HTMLElement;
  private eventBus: IEventBus = EventBus.getInstance();

  @Prop() data: ISignTransactionsModalData = {
    transaction: null,
    egldLabel: '',
    feeLimit: '',
    feeInFiatLimit: '',
    total: 0,
    currentIndex: 0,
  };

  @Method() async getEventBus() {
    return this.eventBus;
  }

  render() {
    const { transaction, feeInFiatLimit, feeLimit, egldLabel, usdValue } = this.data;

    return (
      <generic-modal
        onClose={() => this.close()}
        modalTitle="Sign transaction"
        modalSubtitle={`Transaction ${this.data.currentIndex + 1} of ${this.data.total}`}
        body={
          <div>
            <p>{transaction?.receiver}</p>
            <p>{transaction?.value}</p>
            <p>{usdValue}</p>
            <p>
              {feeLimit} {egldLabel} ({feeInFiatLimit})
            </p>
            <p>{transaction?.data}</p>

            <button data-testid={DataTestIdsEnum.ledgerConnectBtn} class="access-button" onClick={() => this.eventBus.publish(SignEventsEnum.SIGN_TRANSACTION)}>
              Sign
            </button>
          </div>
        }
      />
    );
  }

  async nextPage() {
    this.eventBus.publish(SignEventsEnum.NEXT_PAGE);
  }

  async prevPage() {
    this.eventBus.publish(SignEventsEnum.PREV_PAGE);
  }

  close(props = { isUserClick: true }) {
    if (props.isUserClick) {
      this.eventBus.publish(SignEventsEnum.CLOSE);
    }

    if (this.hostElement && this.hostElement.parentNode) {
      this.hostElement.parentNode.removeChild(this.hostElement);
    }
  }

  private dataUpdate(payload: ISignTransactionsModalData) {
    this.data = { ...payload };
    forceUpdate(this);
  }

  componentDidLoad() {
    this.eventBus.subscribe(SignEventsEnum.DATA_UPDATE, this.dataUpdate.bind(this));
  }

  disconnectedCallback() {
    this.eventBus.unsubscribe(SignEventsEnum.DATA_UPDATE, this.dataUpdate.bind(this));
  }
}
