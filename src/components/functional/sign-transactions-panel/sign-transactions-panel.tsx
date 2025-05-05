import { Component, forceUpdate, h, Method, Prop, State, Watch } from '@stencil/core';
import type { IEventBus } from 'utils/EventBus';
import { EventBus } from 'utils/EventBus';

import type { ISignTransactionsPanelData } from './sign-transactions-panel.types';
import { SignEventsEnum } from './sign-transactions-panel.types';
import state, { resetState } from './signTransactionsPanelStore';

const signScreens = {
  FungibleESDT: 'mvx-token-component',
  SemiFungibleESDT: 'mvx-fungible-component',
  NonFungibleESDT: 'mvx-fungible-component',
  MetaESDT: 'mvx-token-component',
};

@Component({
  tag: 'mvx-sign-transactions-panel',
  styleUrl: 'sign-transactions-panel.css',
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
      ppuOptions: [],
    },
    tokenTransaction: null,
    nftTransaction: null,
    sftTransaction: null,
  };

  componentWillLoad() {
    state.onCancel = () => {
      this.onClose({ isUserClick: true });
    };

    state.onConfirm = () => {
      this.eventBus.publish(SignEventsEnum.CONFIRM);
    };

    state.onBack = () => {
      this.eventBus.publish(SignEventsEnum.BACK);
    };

    state.onSetPpu = (ppu: number) => {
      this.eventBus.publish(SignEventsEnum.SET_PPU, ppu);
    };
  }

  componentDidLoad() {
    this.eventBus.subscribe(SignEventsEnum.DATA_UPDATE, this.dataUpdate.bind(this));
    this.eventBus.subscribe(SignEventsEnum.OPEN_SIGN_TRANSACTIONS_PANEL, this.handleOpen.bind(this));
    this.eventBus.subscribe(SignEventsEnum.CLOSE_SIGN_TRANSACTIONS_PANEL, this.onClose.bind(this, { isUserClick: false }));
  }

  disconnectedCallback() {
    resetState();
    this.eventBus.unsubscribe(SignEventsEnum.DATA_UPDATE, this.dataUpdate.bind(this));
    this.eventBus.unsubscribe(SignEventsEnum.OPEN_SIGN_TRANSACTIONS_PANEL, this.handleOpen.bind(this));
    this.eventBus.unsubscribe(SignEventsEnum.CLOSE_SIGN_TRANSACTIONS_PANEL, this.onClose.bind(this, { isUserClick: false }));
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
      this.eventBus.publish(SignEventsEnum.CLOSE_SIGN_TRANSACTIONS_PANEL);
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
      <mvx-side-panel isOpen={this.isOpen} panelClassName="sign-transactions-panel" onClose={this.handleClose.bind(this)}>
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
                <mvx-generic-spinner></mvx-generic-spinner>
              </div>
            ) : (
              <SignScreen></SignScreen>
            )}
          </div>
        </div>
      </mvx-side-panel>
    );
  }
}
