import { Component, Element, forceUpdate, h, Method, Prop, State, Watch } from '@stencil/core';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';
import QRCode from 'qrcode';
import type { IEventBus } from 'utils/EventBus';
import { EventBus } from 'utils/EventBus';

import type { IWalletConnectModalData} from './wallet-connect-modal.types';
import { WalletConnectEventsEnum } from './wallet-connect-modal.types';

@Component({
  tag: 'wallet-connect-modal',
  styleUrl: 'wallet-connect-modal.css',
  shadow: true,
})
export class WalletConnectModal {
  @Element() hostElement: HTMLElement;
  private eventBus: IEventBus = new EventBus();

  @Prop() data: IWalletConnectModalData = {
    wcURI: '',
  };

  @State() qrCodeSvg: string = ''; // State to hold the generated SVG

  @Method() async getEventBus() {
    return this.eventBus;
  }

  async generateSVG() {
    try {
      const svg = await QRCode.toString(this.data.wcURI, {
        type: 'svg',
      });
      this.qrCodeSvg = svg;
      return svg;
    } catch (error) {
      console.error('Error generating QR Code:', error);
      return '';
    }
  }

  @Watch('data')
  onDataChange(data: IWalletConnectModalData) {
    if (data.wcURI) {
      this.generateSVG();
    }
  }

  render() {
    return (
      <generic-modal
        modalTitle={<div data-testid={DataTestIdsEnum.walletConnetModalTitle}>xPortal Mobile Wallet</div>}
        modalSubtitle={<div data-testid={DataTestIdsEnum.walletConnetModalSubtitle}>Scan this QR code with your app</div>}
        onClose={() => this.close()}
        body={
          <div class="modal-body">
            {this.qrCodeSvg ? (
              <div class="qr-code-container" data-testid={DataTestIdsEnum.walletConnectQrCode} innerHTML={this.qrCodeSvg}></div>
            ) : (
              <generic-spinner data-testid={DataTestIdsEnum.walletConnectLoading}></generic-spinner>
            )}
          </div>
        }
      ></generic-modal>
    );
  }

  close(props = { isUserClick: true }) {
    if (props.isUserClick) {
      this.eventBus.publish(WalletConnectEventsEnum.CLOSE);
    }

    if (this.hostElement && this.hostElement.parentNode) {
      this.hostElement.parentNode.removeChild(this.hostElement);
    }
  }

  private dataUpdate(payload: any) {
    if (payload.shouldClose) {
      return this.close({ isUserClick: false });
    }
    this.data = { ...payload };
    forceUpdate(this);
  }

  componentDidLoad() {
    this.eventBus.subscribe(WalletConnectEventsEnum.DATA_UPDATE, this.dataUpdate.bind(this));
  }

  disconnectedCallback() {
    this.eventBus.unsubscribe(WalletConnectEventsEnum.DATA_UPDATE, this.dataUpdate.bind(this));
  }
}
