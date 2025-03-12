import { Component, Element, forceUpdate, h, Method, Prop, Watch } from '@stencil/core';
import type { IEventBus } from 'utils/EventBus';
import { EventBus } from 'utils/EventBus';

import type { ISignTransactionsModalData } from './sign-transactions-modal.types';
import { SignEventsEnum } from './sign-transactions-modal.types';
import state, { resetState } from './signTransactionsModalStore';

const signScreens = {
  FungibleESDT: 'token-component',
  SemiFungibleESDT: 'fungible-component',
  NonFungibleESDT: 'fungible-component',
  MetaESDT: 'token-component',
};

@Component({
  tag: 'sign-transactions-modal',
  styleUrl: 'sign-transactions-modal.css',
  shadow: true,
})
export class SignTransactionsModal {
  @Element() hostElement: HTMLElement;
  private eventBus: IEventBus = new EventBus();

  @Prop() data: ISignTransactionsModalData = {
    commonData: {
      egldLabel: '',
      feeLimit: '',
      feeInFiatLimit: '',
      transactionsCount: 0,
      currentIndex: 0,
    },
    tokenTransaction: null,
    nftTransaction: null,
    sftTransaction: null,
  };

  @Method() async getEventBus() {
    return this.eventBus;
  }

  @Watch('data')
  onDataChange(data: ISignTransactionsModalData) {
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(state, key)) {
        state[key] = data[key];
      }
    }

    state.isWaitingForSignature = false;
    state.isLoading = false;
  }

  componentWillLoad() {
    state.onConfirm = () => {
      this.eventBus.publish(SignEventsEnum.CONFIRM);
    };

    state.onCancel = () => {
      this.eventBus.publish(SignEventsEnum.CLOSE);
    };

    state.onBack = () => {
      this.eventBus.publish(SignEventsEnum.BACK);
    };

    state.onSetGasPriceMultiplier = (gasPriceMultiplier: 1 | 2 | 3) => {
      this.eventBus.publish(SignEventsEnum.SET_GAS_PRICE_MULTIPLIER, gasPriceMultiplier);
    };
  }

  render() {
    const { commonData, isLoading } = state;
    const { tokenType, currentIndex: currentTransactionIndex, transactionsCount } = commonData;
    const SignScreen = signScreens[tokenType];

    return (
      <generic-modal
        onClose={() => this.close()}
        modalTitle="Sign transaction"
        modalSubtitle={`Transaction ${currentTransactionIndex + 1} of ${transactionsCount}`}
        body={
          isLoading ? (
            <div class="loading-spinner">
              <generic-spinner></generic-spinner>
            </div>
          ) : (
            <SignScreen></SignScreen>
          )
        }
      />
    );
  }

  close(props = { isUserClick: true }) {
    resetState();

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
    resetState();
    this.eventBus.unsubscribe(SignEventsEnum.DATA_UPDATE, this.dataUpdate.bind(this));
  }
}
