import { h } from '@stencil/core';
import { XPortalQrCodePreloader } from 'assets/icons/xportal-qr-code-preloader/xportal-qr-code-preloader';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import walletConnectDownloadImg from '../../../../../assets/wallet-connect-download.webp';

interface WalletConnectScanPropsType {
  walletConnectDeepLink?: string;
  qrCodeSvg?: string;
  class?: string;
  onDownloadClick?: (event: MouseEvent) => void;
}

export function WalletConnectScan({
  walletConnectDeepLink = '',
  qrCodeSvg = '',
  class: className,
  onDownloadClick,
}: WalletConnectScanPropsType) {
  const handleDownloadClick = (event: MouseEvent) => {
    event.preventDefault();
    onDownloadClick?.(event);
  };

  return (
    <div class={{ 'wallet-connect-scan': true, [className]: Boolean(className) }}>
      <div class="wallet-connect-scan-qr">
        <XPortalQrCodePreloader data-testid={DataTestIdsEnum.walletConnectLoading} />

        <div
          class={{ 'wallet-connect-scan-qr-embed': true, 'visible': Boolean(qrCodeSvg) }}
          data-testid={DataTestIdsEnum.walletConnectQrCode}
          innerHTML={qrCodeSvg}
        />
      </div>

      <div class="wallet-connect-scan-wrapper">
        <div class="wallet-connect-scan-description" data-testid={DataTestIdsEnum.walletConnetModalTitle}>
          Scan this QR code with your app
        </div>

        <a
          href={walletConnectDeepLink}
          class={{ 'wallet-connect-scan-connect': true, 'disabled': !qrCodeSvg }}
        >
          Connect xPortal
        </a>
      </div>

      <div class="wallet-connect-scan-download">
        <div class="wallet-connect-scan-download-wrapper">
          <div class="wallet-connect-scan-download-title">
            Get the xPortal <br /> mobile app
          </div>

          <div class="wallet-connect-scan-download-button" onClick={handleDownloadClick}>
            Download now
          </div>
        </div>

        <img src={walletConnectDownloadImg} class="wallet-connect-scan-download-image" />
      </div>
    </div>
  );
}
