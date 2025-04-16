import { Component, Element, forceUpdate, h, Method, Prop, State, Watch } from '@stencil/core';
import type { IEventBus } from 'utils/EventBus';

import type { IWalletConnectPanelData } from './wallet-connect-panel.types';
import { WalletConnectEventsEnum } from './wallet-connect-panel.types';
import { WalletConnectBase } from './WalletConnectBase';

@Component({
  tag: 'mvx-wallet-connect-panel',
  styleUrl: 'wallet-connect-panel.scss',
  shadow: true,
})
export class WalletConnectPanel {
  @Element() hostElement: HTMLElement;

  @Prop() data: IWalletConnectPanelData = {
    wcURI: '',
  };

  @State() qrCodeSvg: string = '';
  @State() isOpen: boolean = false;

  private walletConnectBase: WalletConnectBase = new WalletConnectBase(this.data);

  componentDidLoad() {
    this.walletConnectBase.subscribeEventBus(this.getEventBusSubscription());
    this.walletConnectBase.eventBus.subscribe(WalletConnectEventsEnum.OPEN_WALLET_CONNECT_PANEL, this.handleOpen.bind(this));
    this.walletConnectBase.eventBus.subscribe(WalletConnectEventsEnum.CLOSE_WALLET_CONNECT_PANEL, this.onClose.bind(this, { isUserClick: false }));
  }

  disconnectedCallback() {
    this.walletConnectBase.unsubscribeEventBus(this.getEventBusSubscription());
    this.walletConnectBase.eventBus.unsubscribe(WalletConnectEventsEnum.OPEN_WALLET_CONNECT_PANEL, this.handleOpen.bind(this));
    this.walletConnectBase.eventBus.unsubscribe(WalletConnectEventsEnum.CLOSE_WALLET_CONNECT_PANEL, this.onClose.bind(this, { isUserClick: false }));
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
      this.walletConnectBase.eventBus.publish(WalletConnectEventsEnum.CLOSE_WALLET_CONNECT_PANEL);
    }
  }

  @Method() async getEventBus(): Promise<IEventBus> {
    return this.walletConnectBase.getEventBus();
  }

  private getEventBusSubscription() {
    return {
      closeFn: () => this.onClose({ isUserClick: false }),
      forceUpdateFn: () => {
        this.data = this.walletConnectBase.data;
        forceUpdate(this);
      },
    };
  }

  @Watch('data')
  async onDataChange(data: IWalletConnectPanelData) {
    if (data.wcURI) {
      this.qrCodeSvg = await this.walletConnectBase.generateSVG(data.wcURI);
    }
  }

  render() {
    return (
      <mvx-side-panel isOpen={this.isOpen} panelTitle="xPortal App" panelClassName="wallet-connect-panel" onClose={this.handleClose.bind(this)}>
        <mvx-wallet-connect-body qrCodeSvg={this.qrCodeSvg} />
      </mvx-side-panel>
    );
  }
}
