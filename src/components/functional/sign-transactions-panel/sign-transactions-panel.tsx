import { Component, forceUpdate, h, Method, Prop, State, Watch } from '@stencil/core';
import type { IEventBus } from 'utils/EventBus';
import { EventBus } from 'utils/EventBus';

import type { ISignTransactionsPanelData } from './sign-transactions-panel.types';
import { SignEventsEnum } from './sign-transactions-panel.types';
import state, { resetState } from './signTransactionsPanelStore';

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
    console.log('componentWillLoad');
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

  getTransactionData() {
    const { tokenTransaction, sftTransaction, nftTransaction } = state;
    const data = sftTransaction || nftTransaction || tokenTransaction;

    return {
      ...data,
      usdValue: tokenTransaction?.usdValue || '',
    };
  }

  render() {
    const { commonData, isLoading } = state;
    const { currentIndex, transactionsCount, origin, address } = commonData;
    const { amount, identifier, imageURL, usdValue } = this.getTransactionData();
    const previewSubtitle = `${amount} ${identifier}`;

    return (
      <mvx-side-panel isOpen={this.isOpen} panelClassName="sign-transactions-panel" onClose={this.handleClose.bind(this)} panelTitle="Confirm Transaction">
        <div class="transaction-panel-content">
          <mvx-transaction-header address={address} currentTransaction={currentIndex + 1} totalTransactions={transactionsCount} />

          <div class="transaction-panel-body">
            {isLoading ? (
              <div class="loading-spinner">
                <mvx-generic-spinner />
              </div>
            ) : (
              <div class="transaction-content">
                <mvx-request-origin origin={origin} />
                <mvx-transaction-preview previewTitle="Sending" previewSubtitle={previewSubtitle} previewAdditionalInfo={usdValue} imageURL={imageURL} />
                <mvx-transaction-details />
                <mvx-action-buttons />
              </div>
            )}
          </div>
        </div>
      </mvx-side-panel>
    );
  }
}
