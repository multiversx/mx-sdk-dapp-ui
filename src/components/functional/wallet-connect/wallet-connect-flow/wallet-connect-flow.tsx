import { Component, h, Prop, State } from '@stencil/core';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import { processImgSrc } from '../../../../utils/processImgSrc';

const XPORTAL_APP_GALLERY_LINK = 'https://appgallery.huawei.com/app/C104325151';
const XPORTAL_APP_STORE_LINK = 'https://apps.apple.com/us/app/xportal/id1519405832';
const XPORTAL_PLAY_STORE_LINK = 'https://play.google.com/store/apps/details?id=com.elrond.maiar.wallet&hl=ro&pli=1';

const xPortalDownloadOptions = [
  { image: 'wallet-connect-flow-app-store.svg', link: XPORTAL_APP_STORE_LINK },
  { image: 'wallet-connect-flow-play-store.png', link: XPORTAL_PLAY_STORE_LINK },
  { image: 'wallet-connect-flow-app-gallery.png', link: XPORTAL_APP_GALLERY_LINK },
];

@Component({
  tag: 'mvx-wallet-connect-flow',
  styleUrl: 'wallet-connect-flow.scss',
  shadow: true,
})
export class WalletConnectFlow {
  @Prop() qrCodeSvg: string = '';
  @State() flipToggle: boolean = false;

  handleFlipToggle(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.flipToggle = !this.flipToggle;
  }

  render() {
    return (
      <div class={{ 'wallet-connect-flow': true, 'flipped': Boolean(this.flipToggle) }}>
        <div class="wallet-connect-flow-scan">
          <div class="wallet-connect-flow-scan-qr">
            <mvx-xportal-qr-code-preloader data-testid={DataTestIdsEnum.walletConnectLoading} />

            <div
              class={{ 'wallet-connect-flow-scan-qr-embed': true, 'visible': Boolean(this.qrCodeSvg) }}
              data-testid={DataTestIdsEnum.walletConnectQrCode}
              innerHTML={this.qrCodeSvg}
            />
          </div>

          <div class="wallet-connect-flow-scan-description" data-testid={DataTestIdsEnum.walletConnetModalTitle}>
            Scan this QR code with your app
          </div>

          <div class="wallet-connect-flow-scan-download">
            <div class="wallet-connect-flow-scan-download-wrapper">
              <div class="wallet-connect-flow-scan-download-title">
                Get the xPortal <br /> mobile app
              </div>

              <div class="wallet-connect-flow-scan-download-button" onClick={this.handleFlipToggle.bind(this)}>
                Download now
              </div>
            </div>

            <img src={processImgSrc('wallet-connect-flow-download.png')} class="wallet-connect-flow-scan-download-image" />
          </div>
        </div>

        <div class="wallet-connect-flow-download">
          <div class="wallet-connect-flow-download-wrapper">
            <mvx-xportal-download-qr-icon class="wallet-connect-flow-download-qr" />
            <div class="wallet-connect-flow-download-description">
              Scan this QR code on your phone <br /> to get the xPortal app
            </div>

            <div class="wallet-connect-flow-download-return" onClick={this.handleFlipToggle.bind(this)}>
              Connect xPortal
            </div>
          </div>

          <div class="wallet-connect-flow-download-options">
            {xPortalDownloadOptions.map(xPortalDownloadOption => (
              <a class="wallet-connect-flow-download-option" href={xPortalDownloadOption.link} target="_blank" rel="noreferrer">
                <img src={processImgSrc(xPortalDownloadOption.image)} class="wallet-connect-flow-download-option-image" />
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
