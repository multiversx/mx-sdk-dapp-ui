import { Component, Element, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import { Icon } from 'common/Icon';
import type { IEventBus, IWalletConnectPanelData } from 'components';
import { SidePanelHeader } from 'components/visual/SidePanel/components/SidePanelHeader/SidePanelHeader';
import { providerLabels } from 'constants/providerFactory.constants';
import QRCode from 'qrcode';
import { ConnectionMonitor } from 'utils/ConnectionMonitor';
import { EventBus } from 'utils/EventBus';

import { WalletConnectEventsEnum } from './wallet-connect.types';

// prettier-ignore
const styles = {
  walletConnectHost: 'wallet-connect-host mvx:flex mvx:flex-col mvx:flex-1 mvx:overflow-hidden',
  walletConnect: 'wallet-connect mvx:flex mvx:flex-col mvx:transition-all mvx:duration-400 mvx:flex-1 mvx:py-6 mvx:ease-in-out mvx:overflow-auto mvx:transform-3d mvx:scrollbar-hide'
} satisfies Record<string, string>;

@Component({
  tag: 'mvx-wallet-connect',
  styleUrl: 'wallet-connect.scss',
  shadow: true,
})
export class WalletConnect {
  private readonly eventBus: IEventBus = new EventBus();
  private readonly connectionMonitor = new ConnectionMonitor();

  @State() showScanPage: boolean = true;
  @State() walletConnectDeepLink: string = '';
  @Element() hostElement: HTMLElement;

  @Prop() data: IWalletConnectPanelData = { wcURI: '' };
  @Prop() qrCodeSvg: string = '';

  @Watch('data')
  async onDataChange(newData: IWalletConnectPanelData) {
    if (newData.wcURI) {
      this.qrCodeSvg = await this.generateSVG(newData.wcURI);
    }
  }

  @Method() async getEventBus(): Promise<IEventBus> {
    await this.connectionMonitor.waitForConnection();
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
    if (payload.walletConnectDeepLink) {
      this.walletConnectDeepLink = payload.walletConnectDeepLink;
    }

    if (payload.wcURI) {
      this.qrCodeSvg = await this.generateSVG(payload.wcURI);
    }
  }

  async componentDidLoad() {
    if (this.data.wcURI) {
      this.qrCodeSvg = await this.generateSVG(this.data.wcURI);
    }

    this.eventBus.subscribe(WalletConnectEventsEnum.DATA_UPDATE, this.dataUpdate.bind(this));
    this.connectionMonitor.connect();
  }

  disconnectedCallback() {
    this.eventBus.publish(WalletConnectEventsEnum.UI_DISCONNECTED);
    this.eventBus.unsubscribe(WalletConnectEventsEnum.DATA_UPDATE, this.dataUpdate.bind(this));
  }

  handlePageToggle(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.showScanPage = !this.showScanPage;
  }

  render() {
    return (
      <Host class={styles.walletConnectHost}>
        <SidePanelHeader
          hasRightButton={true}
          hasLeftButton={!this.showScanPage}
          panelTitle={providerLabels.walletConnect}
          onLeftButtonClick={this.handlePageToggle.bind(this)}
          onRightButtonClick={() => this.eventBus.publish(WalletConnectEventsEnum.CLOSE)}
          leftIcon={!this.showScanPage ? <Icon name="back-arrow" /> : undefined}
          rightIcon={<Icon name="close" />}
        />

        <div class={styles.walletConnect}>
          {this.showScanPage ? (
            <mvx-wallet-connect-scan
              qrCodeSvg={this.qrCodeSvg}
              onDownloadClick={this.handlePageToggle.bind(this)}
              walletConnectDeepLink={this.walletConnectDeepLink}
            />
          ) : (
            <mvx-wallet-connect-download />
          )}
        </div>
      </Host>
    );
  }
}
