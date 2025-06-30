import { Component, h, Prop } from '@stencil/core';
import classNames from 'classnames';

import unlockPanelWalletImg from '../../../../../assets/unlock-panel-wallet.webp';

const unlockPanelClasses: Record<string, string> = {
  footerIcon: 'mvx:w-4! mvx:h-auto! mvx:hidden mvx:xs:flex mvx:ml-auto mvx:mt-auto',
};

@Component({
  tag: 'mvx-unlock-panel-footer',
  styleUrl: 'unlock-panel-footer.scss',
  shadow: true,
})
export class UnlockPanel {
  @Prop() walletAddress: string;

  handleWalletClick = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    window.open(this.walletAddress, '_blank');
  };

  render() {
    const processedWalletAddress = String(this.walletAddress).replace('https://', '');

    return (
      <div class="unlock-panel-footer" onClick={this.handleWalletClick}>
        <img src={unlockPanelWalletImg} class="unlock-panel-footer-image" />

        <div class="unlock-panel-footer-wrapper">
          <div class="unlock-panel-footer-title">Don't have a wallet?</div>

          <div class="unlock-panel-footer-subtitle desktop">
            Take full control of <br /> your assets.
          </div>

          <div class="unlock-panel-footer-subtitle mobile">
            <span>See which one to get on </span>

            <a target="_blank" rel="noreferrer" class="unlock-panel-footer-subtitle-link" href={this.walletAddress}>
              {processedWalletAddress}
            </a>
          </div>

          <mvx-arrow-up-right-icon
            class={classNames('unlock-panel-footer-icon', {
              [unlockPanelClasses.footerIcon]: true,
            })}
          />
        </div>
      </div>
    );
  }
}
