import { Component, Element, Fragment, h, Method, Prop, State, Watch } from '@stencil/core';
import { providerLabels } from 'constants/providerFactory.constants';
import { EventBus, type IEventBus } from 'utils/EventBus';

import { getLedgerAddressByIndex } from './helpers/getLedgerAddressByIndex';
import type { ILedgerConnectPanelData } from './ledger-connect.types';
import { LedgerConnectEventsEnum } from './ledger-connect.types';

@Component({
  tag: 'mvx-ledger-connect',
  styleUrl: 'ledger-connect.scss',
  shadow: true,
})
export class LedgerConnect {
  private eventBus: IEventBus = new EventBus();

  @Element() hostElement: HTMLElement;
  @Prop() data: ILedgerConnectPanelData = {
    accountScreenData: null,
    confirmScreenData: null,
    connectScreenData: {},
  };

  @State() private selectedIndex = 0;
  @State() private selectedAddress = '';
  @State() ledgerDataState: ILedgerConnectPanelData = this.data;

  @Watch('data')
  handleDataChange(newValue: ILedgerConnectPanelData) {
    this.ledgerDataState = { ...newValue };
  }

  @Method() async getEventBus(): Promise<IEventBus> {
    return this.eventBus;
  }

  componentDidLoad() {
    this.eventBus.subscribe(LedgerConnectEventsEnum.DATA_UPDATE, this.dataUpdate.bind(this));
  }

  disconnectedCallback() {
    this.eventBus.publish(LedgerConnectEventsEnum.UI_DISCONNECTED);
    this.eventBus.unsubscribe(LedgerConnectEventsEnum.DATA_UPDATE, this.dataUpdate.bind(this));
  }

  private selectAccount(index: number) {
    this.selectedIndex = index;
    this.selectedAddress = getLedgerAddressByIndex({
      accounts: this.ledgerDataState.accountScreenData?.accounts,
      selectedIndex: this.selectedIndex,
    });
  }

  private dataUpdate(payload: ILedgerConnectPanelData) {
    this.ledgerDataState = { ...payload };
  }

  private accessWallet() {
    this.eventBus.publish(LedgerConnectEventsEnum.ACCESS_WALLET, {
      addressIndex: this.selectedIndex,
      selectedAddress:
        this.selectedAddress ||
        getLedgerAddressByIndex({
          accounts: this.ledgerDataState.accountScreenData?.accounts,
          selectedIndex: this.selectedIndex,
        }),
    });
  }

  private handleIntroConnect(event: MouseEvent) {
    event.preventDefault();
    this.eventBus.publish(LedgerConnectEventsEnum.CONNECT_DEVICE);
  }

  private handleClose() {
    this.eventBus.publish(LedgerConnectEventsEnum.CLOSE);
  }

  render() {
    if (this.ledgerDataState.accountScreenData) {
      return (
        <Fragment>
          <mvx-side-panel-header
            panelTitle={providerLabels.ledger}
            hasLeftButton={false}
            onRightButtonClick={this.handleClose.bind(this)}
          />

          <mvx-ledger-addresses
            selectedIndex={this.selectedIndex}
            accountScreenData={this.ledgerDataState.accountScreenData}
            onAccessWallet={() => this.accessWallet()}
            onSelectAccount={(event: CustomEvent) => this.selectAccount(event.detail)}
            onPageChange={(event: CustomEvent) =>
              this.eventBus.publish(LedgerConnectEventsEnum.GO_TO_PAGE, event.detail)
            }
          />
        </Fragment>
      );
    }

    if (this.ledgerDataState.confirmScreenData) {
      return (
        <Fragment>
          <mvx-side-panel-header
            panelTitle={providerLabels.ledger}
            hasLeftButton={false}
            onRightButtonClick={this.handleClose.bind(this)}
          />
          <mvx-ledger-confirm confirmScreenData={this.ledgerDataState.confirmScreenData} />
        </Fragment>
      );
    }

    return (
      <Fragment>
        <mvx-side-panel-header
          panelTitle={providerLabels.ledger}
          hasLeftButton={false}
          onRightButtonClick={this.handleClose.bind(this)}
        />

        <mvx-ledger-intro
          connectScreenData={this.ledgerDataState.connectScreenData}
          onConnect={this.handleIntroConnect.bind(this)}
        />
      </Fragment>
    );
  }
}
