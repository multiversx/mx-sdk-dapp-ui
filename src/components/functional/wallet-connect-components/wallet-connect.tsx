import { Component, Element, forceUpdate, h, Method, Prop, State, Watch } from '@stencil/core';
import type { IEventBus } from 'utils/EventBus';

import type { IWalletConnectPanelData } from './wallet-connect-panel.types';
import { WalletConnectBase } from './WalletConnectBase';

@Component({
  tag: 'wallet-connect',
  shadow: true,
})
export class WalletConnect {
  @Element() hostElement: HTMLElement;

  @Prop() data: IWalletConnectPanelData = {
    wcURI: '',
  };

  @State() qrCodeSvg: string = '';

  private walletConnectBase: WalletConnectBase;

  componentWillLoad() {
    this.walletConnectBase = new WalletConnectBase(this.data);
  }

  @Method() async getEventBus(): Promise<IEventBus> {
    return this.walletConnectBase.getEventBus();
  }

  @Watch('data')
  async onDataChange(data: IWalletConnectPanelData) {
    if (data.wcURI) {
      this.qrCodeSvg = await this.walletConnectBase.generateSVG(data.wcURI);
    }
  }

  render() {
    return <wallet-connect-body qrCodeSvg={this.qrCodeSvg} description="Scan this QR using xPortal" />;
  }

  private removeComponent() {
    if (this.hostElement?.parentNode) {
      this.hostElement.parentNode.removeChild(this.hostElement);
    }
  }

  componentDidLoad() {
    this.walletConnectBase.subscribeEventBus({
      closeFn: () => this.removeComponent(),
      forceUpdateFn: () => {
        // this is needed for the UI to be reactive
        this.data = this.walletConnectBase.data;
        forceUpdate(this);
      },
    });
  }

  disconnectedCallback() {
    this.walletConnectBase.unsubscribeEventBus({
      closeFn: () => this.removeComponent(),
      forceUpdateFn: () => {
        // this is needed for the UI to be reactive
        this.data = this.walletConnectBase.data;
        forceUpdate(this);
      },
    });
  }
}
