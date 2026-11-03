import { h } from '@stencil/core';
import classNames from 'classnames';
import { Icon } from 'common/Icon';
import { Trim } from 'common/Trim/Trim';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import { handleAmountResize } from '../../helpers';
import type { EgldValueType } from '../../sign-transactions-panel.types';
import styles from './signTransactionsOverview.styles';

interface SignTransactionsOverviewPropsType {
  identifier: string;
  usdValue: string;
  amount: string;
  tokenIconUrl: string;
  interactor: string;
  interactorIconUrl: string;
  interactorWarning?: string;
  action: string;
  networkFee?: string;
  egldValue?: EgldValueType;
  egldLabel?: string;
  sender?: string;
  relayer?: string;
  isApp: boolean;
}

export function SignTransactionsOverview({
  identifier,
  usdValue,
  amount,
  tokenIconUrl,
  interactor,
  interactorIconUrl,
  interactorWarning,
  action,
  networkFee,
  egldValue,
  egldLabel,
  sender,
  relayer,
  isApp = false,
}: SignTransactionsOverviewPropsType) {
  const setAmountValueRef = (el?: HTMLElement) => {
    if (!el) {
      return;
    }

    requestAnimationFrame(() => handleAmountResize(el));
  };

  return (
    <div class={styles.signTransactionsOverviewContainer} data-testid={DataTestIdsEnum.signTransactionsOverview}>
      <div class={styles.signTransactionsOverviewContent}>
        <div
          class={classNames(styles.signTransactionsDetailRow, styles.signTransactionsAmountRow)}
          data-testid={DataTestIdsEnum.signTransactionsOverviewAmountRow}
        >
          <div class={styles.signTransactionsDetailLabel}>{isApp ? 'Amount' : 'Send'}</div>
          <div class={styles.signTransactionsAmountDisplay}>
            <div class={styles.signTransactionsAmountValueContainer}>
              <div
                class={styles.signTransactionsAmountValue}
                data-testid={DataTestIdsEnum.signTransactionsOverviewAmountValue}
                ref={setAmountValueRef}
              >
                <span>{amount}</span>
                <span class={styles.signTransactionsIdentifier}>{identifier}</span>
              </div>
              {identifier !== 'USD' && (
                <div
                  class={styles.signTransactionsUsdValue}
                  data-testid={DataTestIdsEnum.signTransactionsOverviewUsdValue}
                >
                  {usdValue}
                </div>
              )}
              {egldValue && (
                <div
                  class={styles.signTransactionsEgldValue}
                  data-testid={DataTestIdsEnum.signTransactionsOverviewEgldValue}
                >
                  <span>
                    + {egldValue.amount} {egldLabel}
                  </span>
                  <span class={styles.signTransactionsUsdValue}>{egldValue.usdValue}</span>
                </div>
              )}
            </div>
            {tokenIconUrl && (
              <div class={styles.signTransactionsTokenIcon}>
                <img referrerPolicy="no-referrer" src={tokenIconUrl} alt={identifier} />
              </div>
            )}
          </div>
        </div>

        <div class={styles.signTransactionsDirection} style={{ top: 'calc(50% - 12px)' }}>
          <div class={styles.signTransactionsDirectionIcon}>
            <Icon
              name={isApp ? 'angle-up' : 'angle-down'}
              class={{
                [styles.signTransactionsDirectionIconArrow]: true,
                [styles.signTransactionsDirectionIconArrowDown]: !isApp,
              }}
            />

            <span class={styles.signTransactionsDirectionIconDot} />
            <span class={styles.signTransactionsDirectionIconDot} />
          </div>
        </div>

        <div
          class={classNames(styles.signTransactionsDetailRow, styles.signTransactionsInteractorRow)}
          data-testid={DataTestIdsEnum.signTransactionsOverviewInteractorRow}
        >
          <div class={styles.signTransactionsDetailLabel}>{isApp ? 'App' : 'To'}</div>
          <div class={styles.signTransactionsInteractorInfo}>
            {interactorIconUrl && (
              <div class={styles.signTransactionsInteractorIcon}>
                <img referrerPolicy="no-referrer" src={interactorIconUrl} alt={interactor} />
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
          <div
            class={classNames(styles.signTransactionsDetailRow, styles.signTransactionsActionRow)}
            data-testid={DataTestIdsEnum.signTransactionsOverviewActionRow}
          >
            <div class={styles.signTransactionsDetailLabel}>Action</div>
            <div
              class={styles.signTransactionsActionValue}
              data-testid={DataTestIdsEnum.signTransactionsOverviewActionValue}
            >
              {action}
            </div>
          </div>
        )}
      </div>

      {interactorWarning && (
        <div
          class={styles.signTransactionsInteractorWarning}
          data-testid={DataTestIdsEnum.signTransactionsOverviewInteractorWarning}
        >
          <Icon name="triangular-warning" class={styles.signTransactionsInteractorWarningIcon} />
          <span>{interactorWarning}</span>
        </div>
      )}

      <div class={styles.signTransactionsFeeContainer}>
        <div class={styles.signTransactionsFeeRow}>
          <div class={styles.signTransactionsFeeLabelContainer}>
            <span class={styles.signTransactionsFeeLabel}>Network Fee</span>
            <div class={styles.signTransactionsInfoIcon}></div>
          </div>
          <div class={styles.signTransactionsFeeValue} data-testid={DataTestIdsEnum.signTransactionsOverviewNetworkFee}>
            {networkFee ?? '-'}
          </div>
        </div>

        {relayer && (
          <div class={styles.signTransactionsFeeRow} data-testid={DataTestIdsEnum.signTransactionsOverviewRelayer}>
            <span class={styles.signTransactionsFeeLabel}>Fee paid by</span>
            <Trim class={styles.signTransactionsAccountValue} text={relayer} />
          </div>
        )}

        {sender && (
          <div class={styles.signTransactionsFeeRow} data-testid={DataTestIdsEnum.signTransactionsOverviewSender}>
            <span class={styles.signTransactionsFeeLabel}>From</span>
            <Trim class={styles.signTransactionsAccountValue} text={sender} />
          </div>
        )}
      </div>
    </div>
  );
}
