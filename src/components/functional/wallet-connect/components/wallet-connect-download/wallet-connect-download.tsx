import { Component, h } from '@stencil/core';

import { processImgSrc } from '../../../../../utils/processImgSrc';

const XPORTAL_APP_GALLERY_LINK = 'https://appgallery.huawei.com/app/C104325151';
const XPORTAL_APP_STORE_LINK = 'https://apps.apple.com/us/app/xportal/id1519405832';
const XPORTAL_PLAY_STORE_LINK = 'https://play.google.com/store/apps/details?id=com.elrond.maiar.wallet&hl=ro&pli=1';

const xPortalDownloadOptions = [
  { image: 'wallet-connect-app-store.svg', link: XPORTAL_APP_STORE_LINK },
  { image: 'wallet-connect-play-store.png', link: XPORTAL_PLAY_STORE_LINK },
  { image: 'wallet-connect-app-gallery.png', link: XPORTAL_APP_GALLERY_LINK },
];

@Component({
  tag: 'mvx-wallet-connect-download',
  styleUrl: 'wallet-connect-download.scss',
  shadow: true,
})
export class WalletConnect {
  render() {
    return (
      <div class="wallet-connect-download">
        <div class="wallet-connect-download-wrapper">
          <mvx-xportal-download-qr-icon class="wallet-connect-download-qr" />
          <div class="wallet-connect-download-description">
            Scan this QR code on your phone <br /> to get the xPortal app
          </div>
        </div>

        <div class="wallet-connect-download-options">
          {xPortalDownloadOptions.map(xPortalDownloadOption => (
            <a
              class="wallet-connect-download-option"
              href={xPortalDownloadOption.link}
              target="_blank"
              rel="noreferrer"
            >
              <img src={processImgSrc(xPortalDownloadOption.image)} class="wallet-connect-download-option-image" />
            </a>
          ))}
        </div>
      </div>
    );
  }
}
