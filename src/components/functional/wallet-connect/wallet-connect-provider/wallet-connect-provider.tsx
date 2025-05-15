import { Component, Element, forceUpdate, Fragment, h, Method, Prop, State, Watch } from '@stencil/core';
import { SidePanelHeaderSlotEnum } from 'components/visual/side-panel/components/side-panel-header/side-panel-header.types';
import { providerLabels } from 'constants/providerFactory.constants';
import type { IEventBus } from 'utils/EventBus';

import { type IWalletConnectPanelData, WalletConnectEventsEnum } from '../wallet-connect.types';
import { WalletConnectBase } from '../WalletConnectBase';

@Component({
  tag: 'mvx-wallet-connect-provider',
  styleUrl: 'wallet-connect-provider.scss',
  shadow: true,
})
export class WalletConnectProvider {
  @Element() hostElement: HTMLElement;
  @Prop() data: IWalletConnectPanelData = { wcURI: '' };
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
      <Fragment>
        <mvx-side-panel-header
          panelTitle={providerLabels.walletConnect}
          hasRightButton={false}
          onLeftIconClick={() => this.walletConnectBase.eventBus.publish(WalletConnectEventsEnum.CLOSE)}
        >
          <mvx-close-icon slot={SidePanelHeaderSlotEnum.leftIcon} />
        </mvx-side-panel-header>
        <mvx-wallet-connect-flow qrCodeSvg={this.qrCodeSvg} />
      </Fragment>
    );
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
        this.data = this.walletConnectBase.data;
        forceUpdate(this);
      },
    };
  }
  componentDidLoad() {
    this.walletConnectBase.subscribeEventBus(this.getEventSubscription());
  }

  disconnectedCallback() {
    this.walletConnectBase.eventBus.publish(WalletConnectEventsEnum.UI_DISCONNECTED);
    this.walletConnectBase.unsubscribeEventBus(this.getEventSubscription());
  }
}
