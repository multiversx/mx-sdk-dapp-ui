import { Component, Element, forceUpdate, h, Method, Prop, State } from '@stencil/core';

import type { ILedgerConnectModalData } from './ledger-connect.types';
import { LedgerConnectEventsEnum } from './ledger-connect.types';
import { LedgerConnectBase } from './legdger-connect-base';

@Component({
  tag: 'ledger-connect',
  shadow: true,
})
export class LedgerConnect {
  @Element() hostElement: HTMLElement;

  @Prop() data: ILedgerConnectModalData = {
    accountScreenData: null,
    confirmScreenData: null,
    connectScreenData: {},
  };

  private ledgerConnectBase: LedgerConnectBase;

  @State() private selectedIndex = 0;

  componentWillLoad() {
    this.ledgerConnectBase = new LedgerConnectBase(this.data);
  }

  @Method() async getEventBus() {
    return this.ledgerConnectBase.getEventBus();
  }

  render() {
    const { accountScreenData, confirmScreenData, connectScreenData } = this.data;

    if (accountScreenData) {
      return (
        <ledger-account-screen
          accountScreenData={accountScreenData}
          selectedIndex={this.selectedIndex}
          onSelectAccount={(event: CustomEvent) => this.selectAccount(event.detail)}
          onAccessWallet={() => this.accessWallet()}
          onPrevPage={() => this.prevPage()}
          onNextPage={() => this.nextPage()}
        />
      );
    }

    if (confirmScreenData) {
      return <ledger-confirm-screen confirmScreenData={confirmScreenData} />;
    }

    return <ledger-connect-screen connectScreenData={connectScreenData} onConnect={() => this.ledgerConnectBase.eventBus.publish(LedgerConnectEventsEnum.CONNECT_DEVICE)} />;
  }

  private accessWallet() {
    this.ledgerConnectBase.accessWallet();
  }

  private selectAccount(index: number) {
    this.ledgerConnectBase.selectAccount(index);
    this.selectedIndex = this.ledgerConnectBase.selectedIndex;
  }

  async nextPage() {
    this.ledgerConnectBase.nextPage();
  }

  async prevPage() {
    this.ledgerConnectBase.prevPage();
  }

  private removeComponent() {
    if (this.hostElement?.parentNode) {
      this.hostElement.parentNode.removeChild(this.hostElement);
    }
  }

  componentDidLoad() {
    this.ledgerConnectBase.subscribeEventBus({ closeFn: () => this.removeComponent(), forceUpdateFn: () => forceUpdate(this) });
  }

  disconnectedCallback() {
    this.ledgerConnectBase.unsubscribeEventBus({ closeFn: () => this.removeComponent(), forceUpdateFn: () => forceUpdate(this) });
  }
}
