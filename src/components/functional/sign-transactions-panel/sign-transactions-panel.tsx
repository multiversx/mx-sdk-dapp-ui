import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Component, h, Method, State } from '@stencil/core';
import { ANIMATION_DELAY_PROMISE } from 'components/visual/side-panel/side-panel.constants';
import type { IEventBus } from 'utils/EventBus';
import { EventBus } from 'utils/EventBus';

import type { ISignTransactionsPanelData } from './sign-transactions-panel.types';
import { SignEventsEnum } from './sign-transactions-panel.types';
import state, { resetState } from './signTransactionsPanelStore';
interface IOverviewProps {
  identifier: string;
  usdValue: string;
  amount: string;
  tokenIconUrl: string;
  interactor: string;
  interactorIconUrl: string;
  action: string;
  networkFee: string;
  isApp: boolean;
}

@Component({
  tag: 'mvx-sign-transactions-panel',
  styleUrl: 'sign-transactions-panel.scss',
  shadow: true,
})
export class SignTransactionsPanel {
  private eventBus: IEventBus = new EventBus();
  private unsubscribeFunctions: (() => void)[] = [];

  @Method() async closeWithAnimation() {
    this.isOpen = false;
    const animationDelay = await ANIMATION_DELAY_PROMISE;
    return animationDelay;
  }

  @State() isOpen: boolean = false;
  @State() activeTab: 'overview' | 'advanced' = 'overview';

  @Method() async getEventBus() {
    return this.eventBus;
  }

  componentWillLoad() {
    state.onCancel = () => {
      this.handleClose();
    };

    state.onNext = () => {
      this.eventBus.publish(SignEventsEnum.NEXT);
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
    const unsubDataUpdate = this.eventBus.subscribe(SignEventsEnum.DATA_UPDATE, this.dataUpdate);
    const unsubBack = this.eventBus.subscribe(SignEventsEnum.BACK, this.handleBack);
    this.unsubscribeFunctions.push(unsubDataUpdate, unsubBack);
  }

  disconnectedCallback() {
    resetState();
    this.isOpen = false;
    this.unsubscribeFunctions.forEach(unsub => unsub());
    this.unsubscribeFunctions = [];
  }

  private handleClose = () => {
    this.isOpen = false;
    resetState();
    this.eventBus.publish(SignEventsEnum.CLOSE);
  };

  private dataUpdate = (payload: ISignTransactionsPanelData) => {
    this.isOpen = true;
    for (const key in payload) {
      if (Object.prototype.hasOwnProperty.call(state, key)) {
        state[key] = payload[key];
      }
    }

    state.isWaitingForSignature = false;
  };

  private setActiveTab(tab: 'overview' | 'advanced') {
    this.activeTab = tab;
  }

  private handleBack = () => {
    if (state.commonData.currentIndex > 0) {
      state.commonData.currentIndex -= 1;
    }
  };

  get overviewProps(): IOverviewProps {
    const { tokenTransaction, sftTransaction, nftTransaction } = state;
    const txData = sftTransaction || nftTransaction || tokenTransaction;

    return {
      identifier: txData?.identifier,
      usdValue: tokenTransaction?.usdValue,
      amount: txData?.amount || '0',
      tokenIconUrl: txData?.imageURL,
      interactor: state.commonData?.receiver,
      interactorIconUrl: state.commonData?.receiverIcon,
      action: state.commonData?.scCall,
      networkFee: state.commonData?.feeInFiatLimit,
      isApp: Boolean(state.commonData?.scCall),
    };
  }

  render() {
    const { commonData, onNext, onBack } = state;
    const { currentIndex, transactionsCount, origin, data, highlight } = commonData;

    return (
      <mvx-side-panel
        isOpen={this.isOpen}
        onClose={this.handleClose}
        panelTitle="Confirm Transaction"
        hasBackButton={false}
      >
        <div class="sign-transactions-panel">
          {transactionsCount > 1 && (
            <div class="transaction-navigation">
              <div class="transaction-switcher">
                <div class="navigation-icon" onClick={onBack}>
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
                <div class="navigation-icon" onClick={onNext}>
                  <mvx-fa-icon icon={faChevronRight} class="icon-angle-right" />
                </div>
              </div>
            </div>
          )}

          <div class="origin-container">
            <span class="request-from">Request from</span>
            <div class="origin-details">
              <div class="origin-logo-container">
                <img class="origin-logo" src={`${origin}/favicon.ico`} alt="favicon" />
              </div>
              <span class="origin-name">{origin}</span>
            </div>
          </div>

          <div class="sign-transaction-content">
            <div class="tab-selector">
              <div
                class={`tab-item ${this.activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => this.setActiveTab('overview')}
              >
                <span class="tab-text">Overview</span>
              </div>
              <div
                class={`tab-item ${this.activeTab === 'advanced' ? 'active' : ''}`}
                onClick={() => this.setActiveTab('advanced')}
              >
                <span class="tab-text">Advanced</span>
              </div>
            </div>

            {this.activeTab === 'overview' ? (
              <mvx-sign-transactions-overview style={{ width: '100%' }} {...this.overviewProps} />
            ) : (
              <mvx-sign-transactions-advanced style={{ width: '100%' }} data={data} highlight={highlight} />
            )}
          </div>

          <mvx-sign-transactions-footer />
        </div>
      </mvx-side-panel>
    );
  }
}
