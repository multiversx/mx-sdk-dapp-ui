import { Component, forceUpdate, h, Method, Prop, State, Watch } from '@stencil/core';
import type { IEventBus } from 'utils/EventBus';
import { EventBus } from 'utils/EventBus';

import type { ISignTransactionsPanelData } from './sign-transactions-panel.types';
import { SignEventsEnum } from './sign-transactions-panel.types';
import state, { resetState } from './signTransactionsPanelStore';

const signScreens = {
  FungibleESDT: 'token-component',
  SemiFungibleESDT: 'fungible-component',
  NonFungibleESDT: 'fungible-component',
  MetaESDT: 'token-component',
};

@Component({
  tag: 'sign-transactions-panel',
  styleUrl: 'sign-transactions-panel.css',
  shadow: true,
})
export class SignTransactionsPanel {
  private eventBus: IEventBus = new EventBus();
  @State() isOpen: boolean = false;

  @Prop() data: ISignTransactionsPanelData = {
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

  componentWillLoad() {
    state.onSign = () => {
      state.isWaitingForSignature = true;
      this.eventBus.publish(SignEventsEnum.SIGN_TRANSACTION);
    };

    state.onPrev = () => {
      this.eventBus.publish(SignEventsEnum.PREV_TRANSACTION);
    };

    state.onNext = () => {
      this.eventBus.publish(SignEventsEnum.NEXT_TRANSACTION);
    };

    state.onCancel = () => {
      this.eventBus.publish(SignEventsEnum.CLOSE_SIGN_TRANSACTIONS);
    };
  }

  componentDidLoad() {
    this.eventBus.subscribe(SignEventsEnum.DATA_UPDATE, this.dataUpdate.bind(this));
    this.eventBus.subscribe(SignEventsEnum.OPEN_SIGN_TRANSACTIONS_PANEL, this.handleOpen.bind(this));
    this.eventBus.subscribe(SignEventsEnum.CLOSE_SIGN_TRANSACTIONS, this.onClose.bind(this, { isUserClick: false }));
  }

  disconnectedCallback() {
    resetState();
    this.eventBus.unsubscribe(SignEventsEnum.DATA_UPDATE, this.dataUpdate.bind(this));
    this.eventBus.unsubscribe(SignEventsEnum.OPEN_SIGN_TRANSACTIONS_PANEL, this.handleOpen.bind(this));
    this.eventBus.unsubscribe(SignEventsEnum.CLOSE_SIGN_TRANSACTIONS, this.onClose.bind(this, { isUserClick: false }));
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
    resetState();

    if (props.isUserClick) {
      this.eventBus.publish(SignEventsEnum.CLOSE_SIGN_TRANSACTIONS);
    }
  }

  private dataUpdate(payload: ISignTransactionsPanelData) {
    this.data = { ...payload };
    forceUpdate(this);
  }

  @Watch('data')
  onDataChange(data: ISignTransactionsPanelData) {
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(state, key)) {
        state[key] = data[key];
      }
    }

    state.isWaitingForSignature = false;
    state.isLoading = false;
  }

  @Method() async getEventBus() {
    return this.eventBus;
  }

  render() {
    const { commonData, isLoading } = state;
    const { tokenType, currentIndex, transactionsCount } = commonData;
    const SignScreen = signScreens[tokenType];

    return (
      <side-panel isOpen={this.isOpen} panelClassName="sign-transactions-panel" onClose={this.handleClose.bind(this)}>
        <div class="sign-transactions-content">
          <div class="sign-transactions-header">
            <h2>Sign transaction</h2>
            <h4>
              Transaction {currentIndex + 1} of {transactionsCount}
            </h4>
          </div>
          <div class="sign-transactions-body">
            {isLoading ? (
              <div class="loading-spinner">
                <generic-spinner></generic-spinner>
              </div>
            ) : (
              <SignScreen></SignScreen>
            )}
          </div>
        </div>
      </side-panel>
    );
  }
}
