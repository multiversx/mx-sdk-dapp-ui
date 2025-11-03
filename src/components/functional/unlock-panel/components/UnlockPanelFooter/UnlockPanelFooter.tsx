import { h } from '@stencil/core';
import { Icon } from 'common/Icon';
import styles from './unlockPanelFooter.styles'

import unlockPanelWalletImg from '../../../../../assets/unlock-panel-wallet.webp';

export function UnlockPanelFooter({ walletAddress }: { walletAddress: string }) {
  const handleWalletClick = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    window.open(walletAddress, '_blank');
  };

  const processedWalletAddress = String(walletAddress).replace('https://', '');

  return (
    <div class={styles.unlockPanelFooter} onClick={handleWalletClick}>
      <img src={unlockPanelWalletImg} class={styles.unlockPanelFooterImage} />

      <div class={styles.unlockPanelFooterWrapper}>
        <div class={styles.unlockPanelFooterTitle}>Don't have a wallet?</div>

        <div class={{ [styles.unlockPanelFooterSubtitle]: true, [styles.unlockPanelFooterSubtitleDesktop]: true }}>
          Take full control of <br /> your assets.
        </div>

        <div class={{ [styles.unlockPanelFooterSubtitle]: true, [styles.unlockPanelFooterSubtitleMobile]: true }}>
          <span>See which one to get on </span>

          <a
            target="_blank"
            rel="noopener noreferrer"
            class={styles.unlockPanelFooterSubtitleLink}
            href={walletAddress}
          >
            {processedWalletAddress}
          </a>
        </div>

        <Icon name="arrow-up-right" class={styles.unlockButton} />
      </div>
    </div >
  );

}
