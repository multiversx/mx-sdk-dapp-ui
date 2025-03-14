import { Component, Element, forceUpdate, h, Method, Prop, State, Watch } from '@stencil/core';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';
import type { IEventBus } from 'utils/EventBus';

import type { IWalletConnectPanelData } from './wallet-connect-panel.types';
import { WalletConnectEventsEnum } from './wallet-connect-panel.types';
import { WalletConnectBase } from './WalletConnectBase';

@Component({
  tag: 'wallet-connect-panel',
  shadow: true,
})
export class WalletConnectPanel {
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
    return (
      <generic-modal
        modalTitle={<div data-testid={DataTestIdsEnum.walletConnetModalTitle}>xPortal Mobile Wallet</div>}
        modalSubtitle={<div data-testid={DataTestIdsEnum.walletConnetModalSubtitle}>Scan this QR code with your app</div>}
        onClose={() => this.close()}
        body={<wallet-connect-body qrCodeSvg={this.qrCodeSvg} />}
      />
    );
  }

  close(props = { isUserClick: true }) {
    if (props.isUserClick) {
      this.walletConnectBase.eventBus.publish(WalletConnectEventsEnum.CLOSE);
    }

    if (this.hostElement && this.hostElement.parentNode) {
      this.hostElement.parentNode.removeChild(this.hostElement);
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
