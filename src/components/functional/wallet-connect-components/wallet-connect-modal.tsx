import { Component, Element, forceUpdate, h, Method, Prop, State, Watch } from '@stencil/core';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';
import type { IEventBus } from 'utils/EventBus';

import type { IWalletConnectModalData } from './wallet-connect-modal.types';
import { WalletConnectEventsEnum } from './wallet-connect-modal.types';
import { WalletConnectBase } from './WalletConnectBase';

@Component({
  tag: 'wallet-connect-modal',
  styleUrl: 'wallet-connect-modal.css',
  shadow: true,
})
export class WalletConnectModal {
  @Element() hostElement: HTMLElement;

  @Prop() data: IWalletConnectModalData = {
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
  async onDataChange(data: IWalletConnectModalData) {
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
        body={
          <div class="modal-body">
            {this.qrCodeSvg ? (
              <div class="qr-code-container" data-testid={DataTestIdsEnum.walletConnectQrCode} innerHTML={this.qrCodeSvg}></div>
            ) : (
              <generic-spinner data-testid={DataTestIdsEnum.walletConnectLoading} />
            )}
          </div>
        }
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
