import { Component, Fragment, h, Prop } from '@stencil/core';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

@Component({
  tag: 'wallet-connect-body',
  styleUrl: 'wallet-connect-body.scss',
  shadow: true,
})
export class WalletConnectModal {
  @Prop() qrCodeSvg: string = '';
  @Prop() description: string = '';

  render() {
    return (
      <div class="modal-body">
        {this.qrCodeSvg ? (
          <Fragment>
            <div class="qr-code-container" data-testid={DataTestIdsEnum.walletConnectQrCode} innerHTML={this.qrCodeSvg}></div>
            <div>{this.description}</div>
          </Fragment>
        ) : (
          <generic-spinner data-testid={DataTestIdsEnum.walletConnectLoading} />
        )}
      </div>
    );
  }
}
