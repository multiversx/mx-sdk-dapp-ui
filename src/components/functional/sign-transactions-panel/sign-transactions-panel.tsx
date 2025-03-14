import { Component, Element, forceUpdate, h, Method, Prop, State, Watch } from '@stencil/core';
import type { IEventBus } from 'utils/EventBus';
import { EventBus } from 'utils/EventBus';

import { SidePanelSideEnum } from '../../visual/side-panel/side-panel.types';
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
  @Element() hostElement: HTMLElement;
  private eventBus: IEventBus = new EventBus();
  @State() isPanelOpen: boolean = false;

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

  @Method() async getEventBus() {
    return this.eventBus;
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

  componentWillLoad() {
    this.isPanelOpen = true;

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
      this.eventBus.publish(SignEventsEnum.CLOSE);
    };
  }

  render() {
    const { commonData, isLoading } = state;
    const { tokenType, currentIndex, transactionsCount } = commonData;
    const SignScreen = signScreens[tokenType];

    return (
      <side-panel isOpen={this.isPanelOpen} side={SidePanelSideEnum.LEFT} panelClassName="sign-transactions-panel" onClose={this.close.bind(this, { isUserClick: true })}>
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

  close(props = { isUserClick: true }) {
    this.isPanelOpen = false;
    resetState();

    if (props.isUserClick) {
      this.eventBus.publish(SignEventsEnum.CLOSE);
    }
  }

  private dataUpdate(payload: ISignTransactionsPanelData) {
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
