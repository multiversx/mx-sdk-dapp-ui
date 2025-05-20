import { Component, Element, Fragment, h, Method, Prop, State, Watch } from '@stencil/core';
import { SidePanelHeaderSlotEnum } from 'components/visual/side-panel/components/side-panel-header/side-panel-header.types';
import { providerLabels } from 'constants/providerFactory.constants';
import QRCode from 'qrcode';
import { EventBus, type IEventBus } from 'utils/EventBus';

import { type IWalletConnectPanelData, WalletConnectEventsEnum } from '../wallet-connect.types';

@Component({
  tag: 'mvx-wallet-connect-provider',
  styleUrl: 'wallet-connect-provider.scss',
  shadow: true,
})
export class WalletConnectProvider {
  @Element() hostElement: HTMLElement;
  @Prop() data: IWalletConnectPanelData = { wcURI: '' };
  @State() qrCodeSvg: string = '';

  private eventBus: IEventBus = new EventBus();

  @Watch('data')
  async onDataChange(newData: IWalletConnectPanelData) {
    if (newData.wcURI) {
      this.qrCodeSvg = await this.generateSVG(newData.wcURI);
    }
  }

  @Method() async getEventBus(): Promise<IEventBus> {
    return this.eventBus;
  }

  private async generateSVG(wcURI: string) {
    try {
      const svg = await QRCode.toString(wcURI, { type: 'svg' });
      return svg;
    } catch (error) {
      console.error('Error generating QR Code:', error);
      return '';
    }
  }

  private async dataUpdate(payload: IWalletConnectPanelData) {
    if (payload.wcURI) {
      this.qrCodeSvg = await this.generateSVG(payload.wcURI);
    }
  }

  async componentDidLoad() {
    if (this.data.wcURI) {
      this.qrCodeSvg = await this.generateSVG(this.data.wcURI);
    }
    this.eventBus.subscribe(WalletConnectEventsEnum.DATA_UPDATE, this.dataUpdate.bind(this));
  }

  disconnectedCallback() {
    this.eventBus.publish(WalletConnectEventsEnum.UI_DISCONNECTED);
    this.eventBus.unsubscribe(WalletConnectEventsEnum.DATA_UPDATE, this.dataUpdate.bind(this));
  }

  render() {
    return (
      <Fragment>
        <mvx-side-panel-header panelTitle={providerLabels.walletConnect} hasRightButton={false} onLeftButtonClick={() => this.eventBus.publish(WalletConnectEventsEnum.CLOSE)}>
          <mvx-close-icon slot={SidePanelHeaderSlotEnum.leftIcon} />
        </mvx-side-panel-header>
        <mvx-wallet-connect-flow qrCodeSvg={this.qrCodeSvg} />
      </Fragment>
    );
  }
}
