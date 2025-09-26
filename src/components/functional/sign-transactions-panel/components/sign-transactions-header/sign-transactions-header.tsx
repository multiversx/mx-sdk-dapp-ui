import { Component, h, State } from '@stencil/core';
import { Icon } from 'common/Icon';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import state from '../../signTransactionsPanelStore';
import styles from './sign-transactions-header.styles';

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
