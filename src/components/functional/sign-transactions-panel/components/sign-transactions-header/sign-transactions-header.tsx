import { Component, h, State } from '@stencil/core';
import { Icon } from 'common/Icon';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import state from '../../signTransactionsPanelStore';

// prettier-ignore
const styles = {
  signTransactionsHeader: 'sign-transactions-header mvx:flex mvx:flex-1 mvx:flex-col mvx:gap-5 mvx:py-5',
  signTransactionsHeaderPager: 'sign-transactions-header-pager mvx:flex mvx:relative mvx:rounded-2xl mvx:h-9 mvx:items-center mvx:px-5 mvx:justify-center mvx:mx-auto mvx:gap-5 mvx:bg-secondary',
  signTransactionsHeaderPagerIcon: 'sign-transactions-header-pager-icon mvx:w-auto mvx:ease-in-out mvx:duration-200 mvx:w-5 mvx:relative mvx:z-1 mvx:cursor-pointer mvx:flex mvx:items-center mvx:justify-center mvx:transition-all mvx:h-5 mvx:text-secondary-text mvx:hover:text-primary',
  signTransactionsHeaderPagerIconDisabled: 'sign-transactions-header-pager-icon-disabled mvx:pointer-events-none mvx:opacity-50',
  signTransactionsHeaderPagerText: 'sign-transactions-header-pager-text mvx:relative mvx:z-1 mvx:flex mvx:text-base mvx:leading-none mvx:select-none mvx:items-center mvx:gap-2',
  signTransactionsHeaderPagerTextLabel: 'sign-transactions-header-pager-text-label mvx:text-secondary-text',
  signTransactionsHeaderPagerTextValue: 'sign-transactions-header-pager-text-value mvx:text-primary mvx:font-medium mvx:flex mvx:items-center mvx:justify-center mvx:w-2.5',
  signTransactionsHeaderPagerTextValueLarge: 'sign-transactions-header-pager-text-value-large mvx:w-5',
  signTransactionsHeaderOrigin: 'sign-transactions-header-origin mvx:select-none mvx:gap-3 mvx:leading-none mvx:text-base mvx:py-6 mvx:flex mvx:flex-col mvx:mx-auto mvx:text-center mvx:justify-center mvx:items-center',
  signTransactionsHeaderOriginCentered: 'sign-transactions-header-origin-centered mvx:m-auto',
  signTransactionsHeaderOriginLabel: 'sign-transactions-header-origin-label mvx:text-secondary-text',
  signTransactionsHeaderOriginImage: 'sign-transactions-header-origin-image mvx:flex mvx:items-center mvx:rounded-3xl mvx:justify-center mvx:w-18 mvx:h-18 mvx:bg-neutral-950 mvx:border mvx:border-neutral-900',
  signTransactionsHeaderOriginName:'sign-transactions-header-origin-name mvx:text-primary'
} satisfies Record<string, string>;

@Component({
  tag: 'mvx-sign-transactions-header',
  styleUrl: 'sign-transactions-header.scss',
  shadow: true,
})
export class SignTransactionsHeader {
  @State() showFavicon: boolean = true;

  render() {
    const { onBack, onNext } = state;
    const { currentIndex, transactionsCount, origin } = state.commonData;

    return (
      <div class={styles.signTransactionsHeader} data-testid={DataTestIdsEnum.signTransactionsHeader}>
        {transactionsCount > 1 && (
          <div
            class={styles.signTransactionsHeaderPager}
            data-testid={DataTestIdsEnum.signTransactionsHeaderPager}
            onClick={(event: MouseEvent) => event.stopPropagation()}
          >
            <Icon
              onClick={onBack}
              name="angle-left"
              data-testid={DataTestIdsEnum.signTransactionsHeaderPagerPrevBtn}
              class={{
                [styles.signTransactionsHeaderPagerIcon]: true,
                [styles.signTransactionsHeaderPagerIconDisabled]: currentIndex === 0,
              }}
            />

            <div
              class={styles.signTransactionsHeaderPagerText}
              data-testid={DataTestIdsEnum.signTransactionsHeaderPagerText}
            >
              <div class={styles.signTransactionsHeaderPagerTextLabel}>Transaction</div>
              <div
                class={{
                  [styles.signTransactionsHeaderPagerTextValue]: true,
                  [styles.signTransactionsHeaderPagerTextValueLarge]: transactionsCount >= 10,
                }}
              >
                {currentIndex + 1}
              </div>

              <div class={styles.signTransactionsHeaderPagerTextLabel}>of</div>
              <div
                class={{
                  [styles.signTransactionsHeaderPagerTextValue]: true,
                  [styles.signTransactionsHeaderPagerTextValueLarge]: transactionsCount >= 10,
                }}
              >
                {transactionsCount}
              </div>
            </div>

            <Icon
              onClick={onNext}
              name="angle-right"
              data-testid={DataTestIdsEnum.signTransactionsHeaderPagerNextBtn}
              class={{
                [styles.signTransactionsHeaderPagerIcon]: true,
                [styles.signTransactionsHeaderPagerIconDisabled]: currentIndex + 1 === transactionsCount,
              }}
            />
          </div>
        )}

        <div
          data-testid={DataTestIdsEnum.signTransactionsHeaderOrigin}
          class={{
            [styles.signTransactionsHeaderOrigin]: true,
            [styles.signTransactionsHeaderOriginCentered]: transactionsCount <= 1,
          }}
        >
          <div class={styles.signTransactionsHeaderOriginLabel}>Request from</div>

          {this.showFavicon && (
            <div class={styles.signTransactionsHeaderOriginImage}>
              <img
                src={`${origin}/favicon.ico`}
                alt="favicon"
                onError={() => {
                  this.showFavicon = false;
                }}
              />
            </div>
          )}

          <span
            class={styles.signTransactionsHeaderOriginName}
            data-testid={DataTestIdsEnum.signTransactionsHeaderOriginName}
          >
            {origin}
          </span>
        </div>
      </div>
    );
  }
}
