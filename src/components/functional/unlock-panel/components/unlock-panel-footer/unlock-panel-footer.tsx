import { Component, h } from '@stencil/core';
import classNames from 'classnames';
import { processImgSrc } from 'utils/processImgSrc';

const unlockPanelClasses: Record<string, string> = {
  footerIcon: 'mvx:w-4! mvx:h-auto!',
};

@Component({
  tag: 'mvx-unlock-panel-footer',
  styleUrl: 'unlock-panel-footer.scss',
  shadow: true,
})
export class UnlockPanel {
  render() {
    return (
      <div class="unlock-panel-footer">
        <img src={processImgSrc('unlock-panel-wallet.png')} class="unlock-panel-footer-image" />

        <div class="unlock-panel-footer-wrapper">
          <div class="unlock-panel-footer-title">Don't have a wallet?</div>
          <div class="unlock-panel-footer-subtitle">
            Take full control of <br /> your assets.
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
