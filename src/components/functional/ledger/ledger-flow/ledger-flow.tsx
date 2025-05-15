import { Component, Element, forceUpdate, Fragment, h, Method, Prop, State } from '@stencil/core';
import { providerLabels } from 'constants/providerFactory.constants';
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
        <Fragment>
          <mvx-side-panel-header
            panelTitle={providerLabels.ledger}
            hasRightButton={false}
            onLeftIconClick={() => this.ledgerConnectBase.eventBus.publish(LedgerConnectEventsEnum.CLOSE)}
          ></mvx-side-panel-header>
          <mvx-ledger-addresses
            selectedIndex={this.selectedIndex}
            accountScreenData={this.data.accountScreenData}
            onAccessWallet={() => this.ledgerConnectBase.accessWallet()}
            onSelectAccount={(event: CustomEvent) => this.selectAccount(event.detail)}
            onPageChange={(event: CustomEvent) => this.ledgerConnectBase.goToPage(event.detail)}
          />
        </Fragment>
      );
    }

    if (this.data.confirmScreenData) {
      return (
        <Fragment>
          <mvx-side-panel-header
            panelTitle={providerLabels.ledger}
            hasRightButton={false}
            onLeftIconClick={() => this.ledgerConnectBase.eventBus.publish(LedgerConnectEventsEnum.CLOSE)}
          ></mvx-side-panel-header>
          <mvx-ledger-confirm confirmScreenData={this.data.confirmScreenData} />
        </Fragment>
      );
    }

    return (
      <Fragment>
        <mvx-side-panel-header
          panelTitle={providerLabels.ledger}
          hasRightButton={false}
          onLeftIconClick={() => this.ledgerConnectBase.eventBus.publish(LedgerConnectEventsEnum.CLOSE)}
        ></mvx-side-panel-header>
        <mvx-ledger-intro connectScreenData={this.data.connectScreenData} onConnect={this.handleIntroConnect.bind(this)} />
      </Fragment>
    );
  }
}
