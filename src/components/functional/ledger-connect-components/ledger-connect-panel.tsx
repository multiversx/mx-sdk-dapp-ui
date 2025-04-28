import { Component, forceUpdate, h, Method, Prop, State } from '@stencil/core';
import type { IEventBus } from 'utils/EventBus';

import type { ILedgerConnectPanelData } from '../ledger/ledger-flow/ledger-flow.types';
import { LedgerConnectEventsEnum } from '../ledger/ledger-flow/ledger-flow.types';
import { LedgerConnectBase } from '../ledger/LedgerConnectBase';

@Component({
  tag: 'mvx-ledger-connect-panel',
  styleUrl: 'ledger-connect-panel.css',
})
export class LedgerConnectPanel {
  @Prop() data: ILedgerConnectPanelData = {
    accountScreenData: null,
    confirmScreenData: null,
    connectScreenData: {},
  };

  @State() isOpen: boolean = false;
  @State() private selectedIndex = 0;

  private ledgerConnectBase: LedgerConnectBase;

  componentWillLoad() {
    this.ledgerConnectBase = new LedgerConnectBase(this.data);
  }

  componentDidLoad() {
    this.ledgerConnectBase.subscribeEventBus(this.getEventBusSubscription());
    this.ledgerConnectBase.eventBus.subscribe(LedgerConnectEventsEnum.OPEN_LEDGER_CONNECT_PANEL, this.handleOpen.bind(this));
    this.ledgerConnectBase.eventBus.subscribe(LedgerConnectEventsEnum.CLOSE_LEDGER_CONNECT_PANEL, this.onClose.bind(this, { isUserClick: false }));
  }

  disconnectedCallback() {
    this.ledgerConnectBase.unsubscribeEventBus(this.getEventBusSubscription());
    this.ledgerConnectBase.eventBus.unsubscribe(LedgerConnectEventsEnum.OPEN_LEDGER_CONNECT_PANEL, this.handleOpen.bind(this));
    this.ledgerConnectBase.eventBus.unsubscribe(LedgerConnectEventsEnum.CLOSE_LEDGER_CONNECT_PANEL, this.onClose.bind(this, { isUserClick: false }));
  }

  private selectAccount(index: number) {
    this.ledgerConnectBase.selectAccount(index);
    this.selectedIndex = this.ledgerConnectBase.selectedIndex;
  }

  handleConnect() {
    this.ledgerConnectBase.eventBus.publish(LedgerConnectEventsEnum.CONNECT_DEVICE);
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

    if (props.isUserClick) {
      this.ledgerConnectBase.eventBus.publish(LedgerConnectEventsEnum.CLOSE_LEDGER_CONNECT_PANEL);
    }
  }

  @Method() async getEventBus(): Promise<IEventBus> {
    return this.ledgerConnectBase.getEventBus();
  }

  private getEventBusSubscription() {
    return {
      closeFn: () => this.onClose({ isUserClick: false }),
      forceUpdateFn: () => {
        this.data = this.ledgerConnectBase.data;
        forceUpdate(this);
      },
    };
  }

  private renderInnerComponent() {
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
      return <mvx-ledger-confirm-screen confirmScreenData={this.data.confirmScreenData} />;
    }

    return <mvx-ledger-intro connectScreenData={this.data.connectScreenData} onConnect={this.handleConnect.bind(this)} />;
  }

  render() {
    return (
      <mvx-side-panel isOpen={this.isOpen} panelClassName="ledger-connect-panel" panelTitle="Ledger" onClose={this.handleClose.bind(this)}>
        {this.renderInnerComponent()}
      </mvx-side-panel>
    );
  }
}
