import { Component, forceUpdate, h, Method, Prop, State } from '@stencil/core';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';
import type { IEventBus } from 'utils/EventBus';

import { SidePanelSideEnum } from '../../visual/side-panel/side-panel.types';
import type { ILedgerConnectModalData } from './ledger-connect.types';
import { LedgerConnectEventsEnum } from './ledger-connect.types';
import { LedgerConnectBase } from './LedgerConnectBase';

@Component({
  tag: 'ledger-connect-panel',
  styleUrl: 'ledger-connect-panel.css',
  shadow: true,
})
export class LedgerConnectPanel {
  @Prop() data: ILedgerConnectModalData = {
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
    this.ledgerConnectBase.eventBus.subscribe(LedgerConnectEventsEnum.CLOSE_LEDGER_CONNECT, this.onClose.bind(this, { isUserClick: false }));
  }

  disconnectedCallback() {
    this.ledgerConnectBase.unsubscribeEventBus(this.getEventBusSubscription());
    this.ledgerConnectBase.eventBus.unsubscribe(LedgerConnectEventsEnum.OPEN_LEDGER_CONNECT_PANEL, this.handleOpen.bind(this));
    this.ledgerConnectBase.eventBus.unsubscribe(LedgerConnectEventsEnum.CLOSE_LEDGER_CONNECT, this.onClose.bind(this, { isUserClick: false }));
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
      this.ledgerConnectBase.eventBus.publish(LedgerConnectEventsEnum.CLOSE_LEDGER_CONNECT);
    }
  }

  private accessWallet() {
    this.ledgerConnectBase.accessWallet();
  }

  private selectAccount(index: number) {
    this.ledgerConnectBase.selectAccount(index);
    // this is needed for the UI to be reactive
    this.selectedIndex = this.ledgerConnectBase.selectedIndex;
  }

  async nextPage() {
    this.ledgerConnectBase.nextPage();
  }

  async prevPage() {
    this.ledgerConnectBase.prevPage();
  }

  @Method() async getEventBus(): Promise<IEventBus> {
    return this.ledgerConnectBase.getEventBus();
  }

  private getEventBusSubscription() {
    return {
      closeFn: () => this.onClose({ isUserClick: false }),
      forceUpdateFn: () => {
        // this is needed for the UI to be reactive
        this.data = this.ledgerConnectBase.data;
        forceUpdate(this);
      },
    };
  }

  private getHeaderContent(accountScreenData: any, confirmScreenData: any) {
    if (accountScreenData) {
      return (
        <div class="ledger-connect-header">
          <h2 data-testid={`${DataTestIdsEnum.addressTableContainer}Title`}>Access your wallet</h2>
          <h4 data-testid={`${DataTestIdsEnum.addressTableContainer}SubTitle`}>Choose the wallet you want to access</h4>
        </div>
      );
    }

    if (confirmScreenData) {
      return (
        <div class="ledger-connect-header">
          <h2>Confirm</h2>
          <h4>Confirm Ledger Address</h4>
        </div>
      );
    }

    return (
      <div class="ledger-connect-header">
        <h2>Connect Ledger</h2>
        <h4>Unlock your device & open the MultiversX App</h4>
      </div>
    );
  }

  private getBodyContent(accountScreenData: any, confirmScreenData: any, connectScreenData: any) {
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

    return <ledger-connect-screen connectScreenData={connectScreenData} onConnect={this.handleConnect.bind(this)} />;
  }

  render() {
    const { accountScreenData, confirmScreenData, connectScreenData } = this.data;
    const bodyContent = this.getBodyContent(accountScreenData, confirmScreenData, connectScreenData);

    return (
      <side-panel isOpen={this.isOpen} side={SidePanelSideEnum.RIGHT} panelClassName="ledger-connect-panel" onClose={this.handleClose.bind(this)}>
        <div class="ledger-connect-content">
          {this.getHeaderContent(accountScreenData, confirmScreenData)}
          <div class="ledger-connect-body">{bodyContent}</div>
        </div>
      </side-panel>
    );
  }
}
