import type { JSX } from '@stencil/core';
import { h } from '@stencil/core';
import { WalletConnectAppGalleryIcon } from 'assets/icons/wallet-connect-app-gallery-icon/wallet-connect-app-gallery-icon';
import { WalletConnectAppStoreIcon } from 'assets/icons/wallet-connect-app-store-icon/wallet-connect-app-store-icon';
import { WalletConnectGooglePlayIcon } from 'assets/icons/wallet-connect-google-play-icon/wallet-connect-google-play-icon';
import { XPortalDownloadQrIcon } from 'assets/icons/xportal-download-qr-icon/xportal-download-qr-icon';

const XPORTAL_APP_GALLERY_LINK = 'https://appgallery.huawei.com/app/C104325151';
const XPORTAL_APP_STORE_LINK = 'https://apps.apple.com/us/app/xportal/id1519405832';
const XPORTAL_PLAY_STORE_LINK = 'https://play.google.com/store/apps/details?id=com.elrond.maiar.wallet&hl=ro&pli=1';

interface XPortalDownloadOptionType {
  image: JSX.Element;
  link: string;
}

const xPortalDownloadOptions: XPortalDownloadOptionType[] = [
  { image: <WalletConnectAppStoreIcon />, link: XPORTAL_APP_STORE_LINK },
  { image: <WalletConnectGooglePlayIcon />, link: XPORTAL_PLAY_STORE_LINK },
  { image: <WalletConnectAppGalleryIcon />, link: XPORTAL_APP_GALLERY_LINK },
];

interface WalletConnectDownloadPropsType {
  class?: string;
}

export function WalletConnectDownload({ class: className }: WalletConnectDownloadPropsType = {}) {
  return (
    <div class={{ 'wallet-connect-download': true, [className]: Boolean(className) }}>
      <div class="wallet-connect-download-wrapper">
        <XPortalDownloadQrIcon class="wallet-connect-download-qr" />

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
