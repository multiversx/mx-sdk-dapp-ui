import { Component, Element, forceUpdate, h, Method, Prop, State, Watch } from '@stencil/core';
import type { IEventBus } from 'utils/EventBus';
import { EventBus } from 'utils/EventBus';

import { SidePanelSideEnum } from '../../visual/side-panel/side-panel.types';
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
  @State() isPanelOpen: boolean = false;

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
