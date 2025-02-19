import { Component, Element, forceUpdate, h, Method, Prop, State } from '@stencil/core';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';
import type { IEventBus } from 'utils/EventBus';
import { EventBus } from 'utils/EventBus';

import { getLedgerAddressByIndex } from './helpers/getLedgerAddressByIndex';
import type { ILedgerConnectModalData } from './ledger-connect.types';
import { LedgerConnectEventsEnum } from './ledger-connect.types';

@Component({
  tag: 'ledger-connect-modal',
  shadow: true,
})
export class LedgerConnectModal {
  @Element() hostElement: HTMLElement;
  private eventBus: IEventBus = new EventBus();

  @Prop() data: ILedgerConnectModalData = {
    accountScreenData: null,
    confirmScreenData: null,
    connectScreenData: {},
  };

  @Method() async getEventBus() {
    return this.eventBus;
  }

  @State() private selectedIndex = 0;
  @State() private selectedAddress = '';

  render() {
    const { accountScreenData, confirmScreenData, connectScreenData } = this.data;

    if (accountScreenData) {
      return (
        <generic-modal
          modalTitle={<div data-testid={`${DataTestIdsEnum.addressTableContainer}Title`}>Access your wallet</div>}
          modalSubtitle={<div data-testid={`${DataTestIdsEnum.addressTableContainer}SubTitle`}>Choose the wallet you want to access</div>}
          body={
            <ledger-account-screen
              accountScreenData={accountScreenData}
              selectedIndex={this.selectedIndex}
              onSelectAccount={(event: CustomEvent) => this.selectAccount(event.detail)}
              onAccessWallet={() => this.accessWallet()}
              onPrevPage={() => this.prevPage()}
              onNextPage={() => this.nextPage()}
            />
          }
          onClose={() => this.close()}
        />
      );
    }

    if (confirmScreenData) {
      return (
        <generic-modal
          onClose={() => this.close()}
          modalTitle="Confirm"
          modalSubtitle="Confirm Ledger Address"
          body={<ledger-confirm-screen confirmScreenData={confirmScreenData} />}
        />
      );
    }

    return (
      <generic-modal
        onClose={() => this.close()}
        modalTitle="Connect Ledger"
        modalSubtitle="Unlock your device & open the MultiversX App"
        body={<ledger-connect-screen connectScreenData={connectScreenData} onConnect={() => this.eventBus.publish(LedgerConnectEventsEnum.CONNECT_DEVICE)} />}
      />
    );
  }

  private accessWallet() {
    this.eventBus.publish(LedgerConnectEventsEnum.ACCESS_WALLET, {
      addressIndex: this.selectedIndex,
      selectedAddress: this.selectedAddress || getLedgerAddressByIndex({ accounts: this.data.accountScreenData?.accounts, selectedIndex: this.selectedIndex }),
    });
  }

  private selectAccount(index: number) {
    this.selectedIndex = index;
    this.selectedAddress = getLedgerAddressByIndex({ accounts: this.data.accountScreenData?.accounts, selectedIndex: this.selectedIndex });
  }

  async nextPage() {
    this.eventBus.publish(LedgerConnectEventsEnum.NEXT_PAGE);
  }

  async prevPage() {
    this.eventBus.publish(LedgerConnectEventsEnum.PREV_PAGE);
  }

  close(props = { isUserClick: true }) {
    if (props.isUserClick) {
      this.eventBus.publish(LedgerConnectEventsEnum.CLOSE);
    }

    if (this.hostElement?.parentNode) {
      this.hostElement.parentNode.removeChild(this.hostElement);
    }
  }

  private dataUpdate(payload: ILedgerConnectModalData) {
    if (payload.shouldClose) {
      return this.close({ isUserClick: false });
    }
    this.data = { ...payload };
    forceUpdate(this);
  }

  componentDidLoad() {
    this.eventBus.subscribe(LedgerConnectEventsEnum.DATA_UPDATE, this.dataUpdate.bind(this));
  }

  disconnectedCallback() {
    this.eventBus.unsubscribe(LedgerConnectEventsEnum.DATA_UPDATE, this.dataUpdate.bind(this));
  }
}
