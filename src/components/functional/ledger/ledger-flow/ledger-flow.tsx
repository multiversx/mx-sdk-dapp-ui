import { Component, Element, forceUpdate, h, Method, Prop, State } from '@stencil/core';
import type { IEventBus } from 'utils/EventBus';

import type { ILedgerConnectPanelData } from '../ledger.types';
import { LedgerConnectEventsEnum } from '../ledger.types';
import { LedgerConnectBase } from '../LedgerConnectBase';

@Component({
  tag: 'mvx-ledger-flow',
  styleUrl: 'ledger-flow.scss',
  shadow: true,
})
export class LedgerFlow {
  private ledgerConnectBase: LedgerConnectBase;

  @Element() hostElement: HTMLElement;
  @State() private selectedIndex = 0;

  @Prop() data: ILedgerConnectPanelData = {
    accountScreenData: null,
    confirmScreenData: null,
    connectScreenData: {},
  };

  @Method() async getEventBus(): Promise<IEventBus> {
    return this.ledgerConnectBase.getEventBus();
  }

  private selectAccount(index: number) {
    this.ledgerConnectBase.selectAccount(index);
    this.selectedIndex = this.ledgerConnectBase.selectedIndex;
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

  componentWillLoad() {
    this.ledgerConnectBase = new LedgerConnectBase(this.data);
  }

  componentDidLoad() {
    this.ledgerConnectBase.subscribeEventBus(this.getEventSubscription());
  }

  disconnectedCallback() {
    this.ledgerConnectBase.eventBus.publish(LedgerConnectEventsEnum.UI_DISCONNECTED);
    this.ledgerConnectBase.unsubscribeEventBus(this.getEventSubscription());
  }

  handleIntroConnect(event: MouseEvent) {
    event.preventDefault();
    this.ledgerConnectBase.eventBus.publish(LedgerConnectEventsEnum.CONNECT_DEVICE);
  }

  render() {
    if (this.data.accountScreenData) {
      return (
        <mvx-ledger-addresses
          selectedIndex={this.selectedIndex}
          accountScreenData={this.data.accountScreenData}
          onAccessWallet={() => this.ledgerConnectBase.accessWallet()}
          onSelectAccount={(event: CustomEvent) => this.selectAccount(event.detail)}
          onPageChange={(event: CustomEvent) => this.ledgerConnectBase.goToPage(event.detail)}
        />
      );
    }

    if (this.data.confirmScreenData) {
      return <mvx-ledger-confirm confirmScreenData={this.data.confirmScreenData} />;
    }

    return <mvx-ledger-intro connectScreenData={this.data.connectScreenData} onConnect={this.handleIntroConnect.bind(this)} />;
  }
}
