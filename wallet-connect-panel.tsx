import { Component, Element, forceUpdate, h, Method, Prop, State, Watch } from '@stencil/core';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';
import type { IEventBus } from 'utils/EventBus';
import { SidePanelSideEnum } from '../../visual/side-panel/side-panel.types';

import type { IWalletConnectPanelData } from './wallet-connect-panel.types';
import { WalletConnectEventsEnum } from './wallet-connect-panel.types';
import { WalletConnectBase } from './WalletConnectBase';

@Component({
  tag: 'wallet-connect-panel',
  styleUrl: 'wallet-connect-panel.css',
  shadow: true,
})
export class WalletConnectPanel {
  @Element() hostElement: HTMLElement;

  @Prop() data: IWalletConnectPanelData = {
    wcURI: '',
  };

  @State() qrCodeSvg: string = '';
  @State() isPanelOpen: boolean = false;

  private walletConnectBase: WalletConnectBase;

  componentWillLoad() {
    this.walletConnectBase = new WalletConnectBase(this.data);
    this.isPanelOpen = true;
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
    return (
      <side-panel isOpen={this.isPanelOpen} side={SidePanelSideEnum.RIGHT} panelClassName="wallet-connect-panel" onClose={() => this.close({ isUserClick: true })}>
        <div class="wallet-connect-content">
          <div class="wallet-connect-header">
            <h2 data-testid={DataTestIdsEnum.walletConnetModalTitle}>xPortal Mobile Wallet</h2>
            <h4 data-testid={DataTestIdsEnum.walletConnetModalSubtitle}>Scan this QR code with your app</h4>
          </div>
          <div class="wallet-connect-body">
            <wallet-connect-body qrCodeSvg={this.qrCodeSvg} description="Scan this QR code with your app" />
          </div>
        </div>
      </side-panel>
    );
  }

  close(props = { isUserClick: true }) {
    this.isPanelOpen = false;

    if (props.isUserClick) {
      this.walletConnectBase.eventBus.publish(WalletConnectEventsEnum.CLOSE);
    }
  }

  componentDidLoad() {
    this.walletConnectBase.subscribeEventBus({
      closeFn: () => this.close({ isUserClick: false }),
      forceUpdateFn: () => {
        // this is needed for the UI to be reactive
        this.data = this.walletConnectBase.data;
        forceUpdate(this);
      },
    });
  }

  disconnectedCallback() {
    this.walletConnectBase.unsubscribeEventBus({
      closeFn: () => this.close({ isUserClick: false }),
      forceUpdateFn: () => {
        // this is needed for the UI to be reactive
        this.data = this.walletConnectBase.data;
        forceUpdate(this);
      },
    });
  }
}
