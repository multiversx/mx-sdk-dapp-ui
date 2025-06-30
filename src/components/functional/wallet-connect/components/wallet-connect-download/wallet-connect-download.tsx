import type { JSX } from '@stencil/core';
import { Component, h, Prop } from '@stencil/core';

const XPORTAL_APP_GALLERY_LINK = 'https://appgallery.huawei.com/app/C104325151';
const XPORTAL_APP_STORE_LINK = 'https://apps.apple.com/us/app/xportal/id1519405832';
const XPORTAL_PLAY_STORE_LINK = 'https://play.google.com/store/apps/details?id=com.elrond.maiar.wallet&hl=ro&pli=1';

interface XPortalDownloadOptionType {
  image: JSX.Element;
  link: string;
}

const xPortalDownloadOptions: XPortalDownloadOptionType[] = [
  { image: <mvx-wallet-connect-app-store-icon />, link: XPORTAL_APP_STORE_LINK },
  { image: <mvx-wallet-connect-google-play-icon />, link: XPORTAL_PLAY_STORE_LINK },
  { image: <mvx-wallet-connect-app-gallery-icon />, link: XPORTAL_APP_GALLERY_LINK },
];

@Component({
  tag: 'mvx-wallet-connect-download',
  styleUrl: 'wallet-connect-download.scss',
  shadow: true,
})
export class WalletConnect {
  @Prop() class?: string;

  render() {
    return (
      <div class={{ 'wallet-connect-download': true, [this.class]: Boolean(this.class) }}>
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
              {xPortalDownloadOption.image}
            </a>
          ))}
        </div>
      </div>
    );
  }
}
