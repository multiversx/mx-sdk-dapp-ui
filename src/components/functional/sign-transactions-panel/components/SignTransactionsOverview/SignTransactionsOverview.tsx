import { h } from '@stencil/core';
import classNames from 'classnames';
import { Icon } from 'common/Icon';
import { Trim } from 'common/Trim/Trim';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import { handleAmountResize } from '../../helpers';
import styles from './signTransactionsOverview.styles';

interface SignTransactionsOverviewPropsType {
  identifier: string;
  usdValue: string;
  amount: string;
  tokenIconUrl: string;
  interactor: string;
  interactorIconUrl: string;
  action: string;
  networkFee: string;
  isApp: boolean;
}

export function SignTransactionsOverview({ identifier, usdValue, amount, tokenIconUrl, interactor, interactorIconUrl, action, networkFee = '~$0.00078', isApp = false }: SignTransactionsOverviewPropsType) {
  const setAmountValueRef = (el?: HTMLElement) => {
    if (!el) {
      return;
    }

    requestAnimationFrame(() => handleAmountResize(el));
  };

  return (
    <div class={styles.signTransactionsOverviewContainer} data-testid={DataTestIdsEnum.signTransactionsOverview}>
      <div class={styles.signTransactionsOverviewContent}>
        <div class={classNames(styles.signTransactionsDetailRow, styles.signTransactionsAmountRow)} data-testid={DataTestIdsEnum.signTransactionsOverviewAmountRow}>
          <div class={styles.signTransactionsDetailLabel}>{isApp ? 'Amount' : 'Send'}</div>
          <div class={styles.signTransactionsAmountDisplay}>
            <div class={styles.signTransactionsAmountValueContainer}>
              <div
                class={styles.signTransactionsAmountValue}
                data-testid={DataTestIdsEnum.signTransactionsOverviewAmountValue}
                ref={setAmountValueRef}
              >
                <span>
                  {amount} {identifier}
                </span>
              </div>
              {identifier !== 'USD' && (
                <div class={styles.signTransactionsUsdValue} data-testid={DataTestIdsEnum.signTransactionsOverviewUsdValue}>
                  {usdValue}
                </div>
              )}
            </div>
            {tokenIconUrl && (
              <div class={styles.signTransactionsTokenIcon}>
                <img src={tokenIconUrl} alt={identifier} />
              </div>
            )}
          </div>
        </div>

        <div class={styles.signTransactionsDirection} style={{ top: 'calc(50% - 12px)' }}>
          <div class={styles.signTransactionsDirectionIcon}>
            <Icon
              name={isApp ? 'angle-up' : 'angle-down'}
              class={{ [styles.signTransactionsDirectionIconArrow]: true, [styles.signTransactionsDirectionIconArrowDown]: !isApp }}
            />

            <span class={styles.signTransactionsDirectionIconDot} />
            <span class={styles.signTransactionsDirectionIconDot} />
          </div>
        </div>

        <div class={classNames(styles.signTransactionsDetailRow, styles.signTransactionsInteractorRow)} data-testid={DataTestIdsEnum.signTransactionsOverviewInteractorRow}>
          <div class={styles.signTransactionsDetailLabel}>{isApp ? 'App' : 'To'}</div>
          <div class={styles.signTransactionsInteractorInfo}>
            {interactorIconUrl && (
              <div class={styles.signTransactionsInteractorIcon}>
                <img src={interactorIconUrl} alt={interactor} />
              </div>
            )}
            {interactor && (
              <Trim
                class={styles.signTransactionsInteractorName}
                data-testid={DataTestIdsEnum.signTransactionsOverviewInteractorName}
                text={interactor}
              />
            )}
          </div>
        </div>
        {isApp && (
          <div class={classNames(styles.signTransactionsDetailRow, styles.signTransactionsActionRow)} data-testid={DataTestIdsEnum.signTransactionsOverviewActionRow}>
            <div class={styles.signTransactionsDetailLabel}>Action</div>
            <div class={styles.signTransactionsActionValue} data-testid={DataTestIdsEnum.signTransactionsOverviewActionValue}>
              {action}
            </div>
          </div>
        )}
      </div>

      <div class={styles.signTransactionsFeeContainer}>
        <div class={styles.signTransactionsFeeRow}>
          <div class={styles.signTransactionsFeeLabelContainer}>
            <span class={styles.signTransactionsFeeLabel}>Network Fee</span>
            <div class={styles.signTransactionsInfoIcon}></div>
          </div>
          <div class={styles.signTransactionsFeeValue} data-testid={DataTestIdsEnum.signTransactionsOverviewNetworkFee}>
            {networkFee}
          </div>
        </div>
      </div>
    </div >
  );
}

