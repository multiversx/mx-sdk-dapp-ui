import { Component, h } from '@stencil/core';
import classNames from 'classnames';

import state from '../../signTransactionsPanelStore';

const signTransactionsHeaderClasses: Record<string, string> = {
  pagerIcon: 'mvx:w-auto! mvx:h-5!',
};

@Component({
  tag: 'mvx-sign-transactions-header',
  styleUrl: 'sign-transactions-header.scss',
  shadow: true,
})
export class SignTransactionsHeader {
  render() {
    const { onBack, onNext } = state;
    const { currentIndex, transactionsCount, origin } = state.commonData;

    return (
      <div class="sign-transactions-header">
        {transactionsCount > 1 && (
          <div class="sign-transactions-header-pager" onClick={(event: MouseEvent) => event.stopPropagation()}>
            <mvx-single-angle-left-icon
              onClick={onBack}
              class={classNames('sign-transactions-header-pager-icon', {
                [signTransactionsHeaderClasses.pagerIcon]: true,
                disabled: currentIndex === 0,
              })}
            />
            <div class="sign-transactions-header-pager-text">
              <div class="sign-transactions-header-pager-text-label">Transaction</div>
              <div class={{ 'sign-transactions-header-pager-text-value': true, 'large': transactionsCount >= 10 }}>
                {currentIndex + 1}
              </div>

              <div class="sign-transactions-header-pager-text-label">of</div>
              <div class={{ 'sign-transactions-header-pager-text-value': true, 'large': transactionsCount >= 10 }}>
                {transactionsCount}
              </div>
            </div>

            <mvx-single-angle-right-icon
              onClick={onNext}
              class={classNames('sign-transactions-header-pager-icon', {
                disabled: currentIndex + 1 === transactionsCount,
                [signTransactionsHeaderClasses.pagerIcon]: true,
              })}
            />
          </div>
        )}

        <div class={{ 'sign-transactions-header-origin': true, 'centered': transactionsCount <= 1 }}>
          <div class="sign-transactions-header-origin-label">Request from</div>

          <div class="sign-transactions-header-origin-image">
            <img class="sign-transactions-header-origin-image-icon" src={`${origin}/favicon.ico`} alt="favicon" />
          </div>

          <span class="sign-transactions-header-origin-name">{origin}</span>
        </div>
      </div>
    );
  }
}
