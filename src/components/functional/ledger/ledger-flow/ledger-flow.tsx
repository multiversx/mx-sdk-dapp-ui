import { Component, Element, forceUpdate, h, Method, Prop, State } from '@stencil/core';
import type { IEventBus } from 'utils/EventBus';

import { LedgerConnectBase } from '../LedgerConnectBase';
import type { ILedgerConnectPanelData } from './ledger-flow.types';
import { LedgerConnectEventsEnum } from './ledger-flow.types';

@Component({
  tag: 'mvx-ledger-flow',
  styleUrl: 'ledger-flow.scss',
  shadow: true,
})
export class LedgerFlow {
  @Element() hostElement: HTMLElement;
  @State() private selectedIndex = 0;

  @Prop() data: ILedgerConnectPanelData = {
    accountScreenData: null,
    confirmScreenData: null,
    connectScreenData: {},
  };

  private ledgerConnectBase: LedgerConnectBase;

  @Method() async getEventBus(): Promise<IEventBus> {
    return this.ledgerConnectBase.getEventBus();
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

  componentWillLoad() {
    this.ledgerConnectBase = new LedgerConnectBase(this.data);
  }

  componentDidLoad() {
    this.ledgerConnectBase.subscribeEventBus(this.getEventSubscription());
  }

  disconnectedCallback() {
    this.ledgerConnectBase.unsubscribeEventBus(this.getEventSubscription());
  }

  handleIntroConnect(event: MouseEvent) {
    event.preventDefault();
    this.ledgerConnectBase.eventBus.publish(LedgerConnectEventsEnum.CONNECT_DEVICE);
  }

  handlePageChange(newPage: number) {
    if (newPage - 1 === this.data.accountScreenData.startIndex + 1) {
      this.nextPage();
      return;
    }

    if (newPage - 1 === this.data.accountScreenData.startIndex - 1) {
      this.prevPage();
      return;
    }

    // onGoToSpecificPage(newPage - 1);
  }

  render() {
    const { accountScreenData, confirmScreenData, connectScreenData } = this.data;

    if (accountScreenData) {
      return (
        <mvx-ledger-addresses
          accountScreenData={accountScreenData}
          onAccessWallet={this.accessWallet}
          selectedIndex={this.selectedIndex}
          onPageChange={(event: CustomEvent) => this.handlePageChange(event.detail)}
          onSelectAccount={(event: CustomEvent) => this.selectAccount(event.detail)}
        />
      );
    }

    if (confirmScreenData) {
      return <mvx-ledger-confirm-screen confirmScreenData={confirmScreenData} />;
    }

    return <mvx-ledger-intro connectScreenData={connectScreenData} onConnect={this.handleIntroConnect.bind(this)} />;
  }
}
