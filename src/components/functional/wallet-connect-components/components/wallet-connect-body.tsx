import { Component, h, Prop, State } from '@stencil/core';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import { processImgSrc } from '../../../../utils/processImgSrc';

const XPORTAL_APP_GALLERY_LINK = 'https://appgallery.huawei.com/app/C104325151';
const XPORTAL_APP_STORE_LINK = 'https://apps.apple.com/us/app/xportal/id1519405832';
const XPORTAL_PLAY_STORE_LINK = 'https://play.google.com/store/apps/details?id=com.elrond.maiar.wallet&hl=ro&pli=1';

const xPortalDownloadOptions = [
  { image: 'wallet-connect-body-app-store.svg', link: XPORTAL_APP_STORE_LINK },
  { image: 'wallet-connect-body-play-store.png', link: XPORTAL_PLAY_STORE_LINK },
  { image: 'wallet-connect-body-app-gallery.png', link: XPORTAL_APP_GALLERY_LINK },
];

@Component({
  tag: 'mvx-wallet-connect-body',
  styleUrl: 'wallet-connect-body.scss',
  shadow: true,
})
export class WalletConnectBody {
  @Prop() qrCodeSvg: string = '';
  @State() flipToggle: boolean = false;

  handleFlipToggle(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.flipToggle = !this.flipToggle;
  }

  render() {
    return (
      <div class={{ 'wallet-connect-body': true, 'flipped': Boolean(this.flipToggle) }}>
        <div class="wallet-connect-body-scan">
          <div class="wallet-connect-body-scan-qr">
            <mvx-xportal-qr-code-preloader data-testid={DataTestIdsEnum.walletConnectLoading} />

            <div
              class={{ 'wallet-connect-body-scan-qr-embed': true, 'visible': Boolean(this.qrCodeSvg) }}
              data-testid={DataTestIdsEnum.walletConnectQrCode}
              innerHTML={this.qrCodeSvg}
            />
          </div>

          <div class="wallet-connect-body-scan-description" data-testid={DataTestIdsEnum.walletConnetModalTitle}>
            Scan this QR code with your app
          </div>

          <div class="wallet-connect-body-scan-download">
            <div class="wallet-connect-body-scan-download-wrapper">
              <div class="wallet-connect-body-scan-download-title">
                Get the xPortal <br /> mobile app
              </div>

              <div class="wallet-connect-body-scan-download-button" onClick={this.handleFlipToggle.bind(this)}>
                Download now
              </div>
            </div>

            <img src={processImgSrc('wallet-connect-body-download.png')} class="wallet-connect-body-scan-download-image" />
          </div>
        </div>

        <div class="wallet-connect-body-download">
          <div class="wallet-connect-body-download-wrapper">
            <mvx-xportal-download-qr-icon class="wallet-connect-body-download-qr" />
            <div class="wallet-connect-body-download-description">
              Scan this QR code on your phone <br /> to get the xPortal app
            </div>

            <div class="wallet-connect-body-download-return" onClick={this.handleFlipToggle.bind(this)}>
              Connect xPortal
            </div>
          </div>

          <div class="wallet-connect-body-download-options">
            {xPortalDownloadOptions.map(xPortalDownloadOption => (
              <a class="wallet-connect-body-download-option" href={xPortalDownloadOption.link} target="_blank" rel="noreferrer">
                <img src={processImgSrc(xPortalDownloadOption.image)} class="wallet-connect-body-download-option-image" />
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
