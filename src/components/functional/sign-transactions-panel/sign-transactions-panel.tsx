import { faArrowUpRightFromSquare, faChevronLeft, faChevronRight, faCopy } from '@fortawesome/free-solid-svg-icons';
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
  @State() activeTab: 'overview' | 'advanced' = 'overview';

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

    if (data.shouldClose) {
      this.onClose({ isUserClick: false });
    }
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

  setActiveTab(tab: 'overview' | 'advanced') {
    this.activeTab = tab;
  }

  render() {
    const { commonData } = state;
    const { currentIndex, transactionsCount, origin, address, data } = commonData;
    const { identifier, usdValue } = this.getTransactionData();

    return (
      <mvx-side-panel isOpen={this.isOpen} panelClassName="sign-transactions-panel" onClose={this.handleClose.bind(this)} panelTitle="Confirm Transaction">
        <div class="main-container">
          <div class="transaction-navigation">
            <div class="transaction-switcher">
              <div class="navigation-icon">
                <mvx-fa-icon icon={faChevronLeft} class="icon-angle-left" />
              </div>
              <div class="transaction-counter">
                <div class="counter-label-container">
                  <span class="transaction">Transaction</span>
                </div>
                <div class="counter-value-container">
                  <span class="counter-text">
                    {currentIndex + 1} of {transactionsCount}
                  </span>
                </div>
              </div>
              <div class="navigation-icon">
                <mvx-fa-icon icon={faChevronRight} class="icon-angle-right" />
              </div>
            </div>
          </div>

          <div class="origin-container">
            <span class="request-from">Request from</span>
            <div class="origin-details">
              <div class="origin-logo-container">
                <img class="origin-logo" src={`${origin}/favicon.ico`} />
              </div>
              <span class="origin-name">{origin}</span>
            </div>
          </div>

          <div class="sign-transaction-content">
            <div class="tab-selector">
              <div class={`tab-item ${this.activeTab === 'overview' ? 'active' : ''}`} onClick={() => this.setActiveTab('overview')}>
                <span class="tab-text">Overview</span>
              </div>
              <div class={`tab-item ${this.activeTab === 'advanced' ? 'active' : ''}`} onClick={() => this.setActiveTab('advanced')}>
                <span class="tab-text">Advanced</span>
              </div>
            </div>

            {this.activeTab === 'overview' ? (
              <mvx-sign-transactions-overview style={{ width: '100%' }} identifier={identifier} usdValue={usdValue}></mvx-sign-transactions-overview>
            ) : (
              <mvx-sign-transactions-advanced style={{ width: '100%' }} data={data}></mvx-sign-transactions-advanced>
            )}

            <mvx-sign-transactions-action-buttons style={{ width: '100%' }}></mvx-sign-transactions-action-buttons>

            <div class="signing-address">
              <div class="address-container">
                <span class="sign-with">Sign with</span>
                <span class="wallet-address">{address}</span>
              </div>
              <div class="address-actions">
                <div class="copy-icon">
                  <mvx-fa-icon icon={faCopy} class="icon" />
                </div>
                <div class="explorer-icon">
                  <mvx-fa-icon icon={faArrowUpRightFromSquare} class="icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </mvx-side-panel>
    );
  }
}
