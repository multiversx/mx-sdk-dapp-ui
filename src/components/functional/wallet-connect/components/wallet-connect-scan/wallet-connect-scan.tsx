import type { EventEmitter } from '@stencil/core';
import { Component, Event, h, Prop } from '@stencil/core';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import { processImgSrc } from '../../../../../utils/processImgSrc';

@Component({
  tag: 'mvx-wallet-connect-scan',
  styleUrl: 'wallet-connect-scan.scss',
  shadow: true,
})
export class WalletConnectScan {
  @Event() downloadClick: EventEmitter;
  @Prop() qrCodeSvg: string = '';

  handleDownloadClick(event: MouseEvent) {
    event.preventDefault();
    this.downloadClick.emit(event);
  }

  render() {
    return (
      <div class="wallet-connect-scan">
        <div class="wallet-connect-scan-qr">
          <mvx-xportal-qr-code-preloader data-testid={DataTestIdsEnum.walletConnectLoading} />

          <div
            class={{ 'wallet-connect-scan-qr-embed': true, 'visible': Boolean(this.qrCodeSvg) }}
            data-testid={DataTestIdsEnum.walletConnectQrCode}
            innerHTML={this.qrCodeSvg}
          />
        </div>

        <div class="wallet-connect-scan-description" data-testid={DataTestIdsEnum.walletConnetModalTitle}>
          Scan this QR code with your app
        </div>

        <div class="wallet-connect-scan-download">
          <div class="wallet-connect-scan-download-wrapper">
            <div class="wallet-connect-scan-download-title">
              Get the xPortal <br /> mobile app
            </div>

            <div class="wallet-connect-scan-download-button" onClick={this.handleDownloadClick.bind(this)}>
              Download now
            </div>
          </div>

          <img src={processImgSrc('wallet-connect-download.png')} class="wallet-connect-scan-download-image" />
        </div>
      </div>
    );
  }
}
