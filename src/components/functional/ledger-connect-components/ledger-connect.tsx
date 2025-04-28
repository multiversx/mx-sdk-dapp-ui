import { Component, Element, forceUpdate, h, Method, Prop, State } from '@stencil/core';
import type { IEventBus } from 'utils/EventBus';

import type { ILedgerConnectPanelData } from './ledger-connect.types';
import { LedgerConnectEventsEnum } from './ledger-connect.types';
import { LedgerConnectBase } from './LedgerConnectBase';

@Component({
  tag: 'mvx-ledger-connect',
})
export class LedgerConnect {
  @Element() hostElement: HTMLElement;

  @Prop() data: ILedgerConnectPanelData = {
    accountScreenData: null,
    confirmScreenData: null,
    connectScreenData: {},
  };

  @State() private selectedIndex = 0;

  private ledgerConnectBase: LedgerConnectBase;

  componentWillLoad() {
    this.ledgerConnectBase = new LedgerConnectBase(this.data);
  }

  @Method() async getEventBus(): Promise<IEventBus> {
    return this.ledgerConnectBase.getEventBus();
  }

  render() {
    const { accountScreenData, confirmScreenData, connectScreenData } = this.data;

    if (accountScreenData) {
      return (
        <mvx-ledger-account-screen
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
      return <mvx-ledger-confirm-screen confirmScreenData={confirmScreenData} />;
    }

    return <mvx-ledger-connect-screen connectScreenData={connectScreenData} onConnect={() => this.ledgerConnectBase.eventBus.publish(LedgerConnectEventsEnum.CONNECT_DEVICE)} />;
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

  private getEventSubscription() {
    return {
      closeFn: () => this.removeComponent(),
      forceUpdateFn: () => {
        this.data = this.ledgerConnectBase.data;
        forceUpdate(this);
      },
    };
  }

  componentDidLoad() {
    this.ledgerConnectBase.subscribeEventBus(this.getEventSubscription());
  }

  disconnectedCallback() {
    this.ledgerConnectBase.eventBus.publish(LedgerConnectEventsEnum.UI_DISCONECTED);
    this.ledgerConnectBase.unsubscribeEventBus(this.getEventSubscription());
  }
}
