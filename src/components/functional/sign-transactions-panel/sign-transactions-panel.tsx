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
    const { currentIndex, transactionsCount, origin, address } = commonData;
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
              <div class="transaction-details">
                <div class="transaction-info">
                  <div class="send-section">
                    <div class="address-row">
                      <span class="send">Send</span>
                      <div class="token-info">
                        <div class="amount-container">
                          <div class="amount-display">
                            <div class="currency-amount">
                              <div class="numbers">
                                <span class="comma">1</span>
                                <span class="point-fifty">.12</span>
                              </div>
                              <span class="token-identifier">{identifier}</span>
                            </div>
                            <span class="dollar-amount">{usdValue}</span>
                          </div>
                        </div>
                        <div class="token-icon">
                          <div class="token-logo">
                            <div class="egld-token-logo"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="receiver-section">
                    <div class="address-row">
                      <span class="to">To</span>
                      <div class="receiver-info">
                        <div class="receiver-logo-container">
                          <div class="receiver-logo">
                            <div class="receiver-image"></div>
                          </div>
                        </div>
                        <div class="receiver-details">
                          <div class="receiver-name-container">
                            <span class="receiver-name">Staking Agency</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="fee-section">
                  <div class="fee-row">
                    <div class="fee-label-container">
                      <span class="network-fee">Network Fee</span>
                    </div>
                    <div class="fee-amount-container">
                      <span class="currency-amount">~$0.00078</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div class="advanced-details">
                <div class="advanced-content">
                  <div class="gas-settings">
                    <div class="gas-wrapper">
                      <div class="gas-header">
                        <span class="gas-price">Gas Price</span>
                        <span class="gas-price-value">0.000000003 EGLD</span>
                      </div>
                      <div class="gas-speed-selector">
                        <div class="speed-option active">
                          <span class="speed-text">Standard</span>
                        </div>
                        <div class="speed-option">
                          <span class="speed-text">Fast</span>
                        </div>
                        <div class="speed-option">
                          <span class="speed-text">Faster</span>
                        </div>
                      </div>
                      <div class="gas-limit-row">
                        <span class="gas-limit">Gas Limit</span>
                        <span class="gas-limit-value">6,000,000</span>
                      </div>
                    </div>
                  </div>
                  <div class="data-section">
                    <div class="data-container">
                      <div class="data-header">
                        <div class="data-title">
                          <span class="data-label">Data</span>
                          <div class="data-content">
                            <div class="data-box">
                              <div class="data-text-container">
                                <span class="data-text">
                                  joinGame@0000000c5745474c442d6264346437390000000c4c45474c442d64373464613900000008299d5f7b060e76ff0000000000000000050000b4c094947e427d79931a8bad81316b797d238cdb3f00000019737761704d756c7469546f6b656e734669786564496e707574000000040000000101000000000000000c5745474c442d6264346437390000000c4c45474c442d6437346461390000000c4c45474c442d6437346461390000000a4f4e452d663939353466000000000000000000000000050000b4c094947e427d79931a8bad81316b797d238cdb3f00000019737761704d756c7469546f6b656e734669786564496e707574000000040000000101000000000000000c4c45474c442d6437346461390000000a4f4e452d6639393534660000000c5745474c442d6264346437390000000a4f4e452d6639393534660000000820a1a52c864889010000000000000000050000b4c094947e427d79931a8bad81316b797d238cdb3f00000019737761704d756c7469546f6b656e734669786564496e707574000000040000000101000000000000000c5745474c442d6264346437390000000a4f4e452d663939353466@0000000c5745474c442d626434643739000000000000000c4c45474c442d643734646139000000000000000a4f4e452d6639393534660000000935c0dc293353bb273b
                                </span>
                                <div class="data-cursor"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <mvx-sign-transactions-action-buttons></mvx-sign-transactions-action-buttons>

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
