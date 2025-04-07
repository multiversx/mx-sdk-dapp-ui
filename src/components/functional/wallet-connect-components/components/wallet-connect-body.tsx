import { Component, h, Prop } from '@stencil/core';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

@Component({
  tag: 'mvx-wallet-connect-body',
  styleUrl: 'wallet-connect-body.scss',
})
export class WalletConnectModal {
  @Prop() qrCodeSvg: string = '';

  render() {
    return (
      <div class="wallet-connect-body">
        <div class="wallet-connect-body-scan">
          {this.qrCodeSvg ? (
            <div class="qr-code-container" data-testid={DataTestIdsEnum.walletConnectQrCode} innerHTML={this.qrCodeSvg}></div>
          ) : (
            <mvx-generic-spinner data-testid={DataTestIdsEnum.walletConnectLoading} />
          )}
        </div>

        <div class="wallet-connect-body-download">
          {this.qrCodeSvg ? (
            <div class="qr-code-container" data-testid={DataTestIdsEnum.walletConnectQrCode} innerHTML={this.qrCodeSvg}></div>
          ) : (
            <mvx-generic-spinner data-testid={DataTestIdsEnum.walletConnectLoading} />
          )}
        </div>
      </div>
    );
  }
}
