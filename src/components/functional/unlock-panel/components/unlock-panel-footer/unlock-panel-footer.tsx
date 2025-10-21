import { h } from '@stencil/core';
import { Icon } from 'common/Icon';

import unlockPanelWalletImg from '../../../../../assets/unlock-panel-wallet.webp';

// prettier-ignore
const styles = {
  unlockButton: 'unlock-panel-footer-icon mvx:text-primary mvx:w-4 mvx:h-auto mvx:hidden mvx:xs:flex mvx:ml-auto mvx:mt-auto',
} satisfies Record<string, string>;

export function UnlockPanelFooter({ walletAddress }: { walletAddress: string }) {


  const handleWalletClick = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    window.open(walletAddress, '_blank');
  };


  const processedWalletAddress = String(walletAddress).replace('https://', '');

  return (
    <div class="unlock-panel-footer" onClick={handleWalletClick}>
      <img src={unlockPanelWalletImg} class="unlock-panel-footer-image" />

      <div class="unlock-panel-footer-wrapper">
        <div class="unlock-panel-footer-title">Don't have a wallet?</div>

        <div class="unlock-panel-footer-subtitle desktop">
          Take full control of <br /> your assets.
        </div>

        <div class="unlock-panel-footer-subtitle mobile">
          <span>See which one to get on </span>

          <a
            target="_blank"
            rel="noopener noreferrer"
            class="unlock-panel-footer-subtitle-link"
            href={walletAddress}
          >
            {processedWalletAddress}
          </a>
        </div>

        <Icon name="arrow-up-right" class={styles.unlockButton} />
      </div>
    </div>
  );

}
