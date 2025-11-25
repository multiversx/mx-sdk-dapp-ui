import { h } from '@stencil/core';
import { Icon } from 'common/Icon';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';
import styles from './sign-transactions-header.styles';

interface SignTransactionsHeaderPropsType {
  onBack: () => void;
  onNext: () => void;
  currentIndex: number;
  transactionsCount: number;
  origin: string;
  showFavicon: boolean;
}

const NUMBER_OF_TRANSACTIONS = 10;

export function SignTransactionsHeader({ onBack, onNext, currentIndex, transactionsCount, origin, showFavicon }: SignTransactionsHeaderPropsType) {
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
                [styles.signTransactionsHeaderPagerTextValueLarge]: transactionsCount >= NUMBER_OF_TRANSACTIONS,
              }}
            >
              {currentIndex + 1}
            </div>

            <div class={styles.signTransactionsHeaderPagerTextLabel}>of</div>
            <div
              class={{
                [styles.signTransactionsHeaderPagerTextValue]: true,
                [styles.signTransactionsHeaderPagerTextValueLarge]: transactionsCount >= NUMBER_OF_TRANSACTIONS,
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

        {showFavicon && (
          <div class={styles.signTransactionsHeaderOriginImage}>
            <img
              src={`${origin}/favicon.ico`}
              alt="favicon"
              onError={() => {
                showFavicon = false;
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

