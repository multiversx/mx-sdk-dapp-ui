import type { JSX } from '@stencil/core';
import { h } from '@stencil/core';
import { CircleInfoIcon } from 'assets/icons/circle-info-icon/circle-info-icon';
import { DefaultTransactionIconSmall } from 'assets/icons/default-transaction-icon-small/default-transaction-icon-small';
import classNames from 'classnames';
import { ExplorerLink } from 'common/ExplorerLink/ExplorerLink';
import { FormatAmount } from 'common/FormatAmount/FormatAmount';
import { Icon } from 'common/Icon';
import { MvxTooltip } from 'components/visual/tooltip/tooltip';
import { IconSizeEnumType, TransactionAssetIcon } from 'common/TransactionAssetIcon/TransactionAssetIcon';
import { Trim } from 'common/Trim/Trim';
import type { ITransactionListItem } from 'components/functional/notifications-feed/components/TransactionListItem/transactionListItem.types';
import { getAmountParts } from 'components/functional/toasts-list/helpers';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';
import { TransactionStatusEnum } from 'constants/transactionStatus.enum';
import { getIsTransactionFailed } from 'utils/getTransactionStatus';

import type { IToastDataState } from '../../transaction-toast.type';
import { TransactionToastDetails } from '../transaction-toast-details/transaction-toast-details';

// prettier-ignore
const styles = {
  transactionToastClose: 'transaction-toast-close mvx:flex mvx:flex-col mvx:justify-center mvx:shrink-0 mvx:cursor-pointer mvx:text-primary'
} satisfies Record<string, string>;

interface TransactionToastContentPropsType {
  transactions: ITransactionListItem[];
  toastDataState: IToastDataState;
  processedTransactionsStatus?: string | JSX.Element;
  fullWidth?: boolean;
  toastId?: string;
  onDeleteToast?: () => void;
  onForceUpdate?: () => void;
}

export function TransactionToastContent({
  transactions,
  toastDataState,
  processedTransactionsStatus,
  fullWidth,
  toastId,
  onDeleteToast,
  onForceUpdate,
}: TransactionToastContentPropsType) {
  const { title, hasCloseButton } = toastDataState;
  const [transaction] = transactions;
  const showAmount = transactions.length === 1 && transaction?.amount;
  const showExplorerLinkButton = transaction?.link && transactions.length === 1;
  const amount = transaction && getAmountParts(transaction.amount);
  const showTooltip = showAmount && amount.label.length > 10;

  return (
    <div
      class={{
        'transaction-toast-content-wrapper': true,
        'full-width': fullWidth,
      }}
      data-testid={DataTestIdsEnum.transactionToastContent}
    >
      <div class="transaction-toast-content">
        {toastDataState.icon ? (
          <Icon
            name={toastDataState.icon}
            class={classNames('transaction-toast-icon', {
              'transaction-toast-icon-failed': toastDataState.iconClassName === 'danger',
              'transaction-toast-icon-pending': toastDataState.iconClassName === 'warning',
              'transaction-toast-icon-success': toastDataState.iconClassName === 'success',
            })}
          />
        ) : (
          <div
            class={classNames('transaction-toast-icon', {
              'transaction-toast-icon-failed': getIsTransactionFailed(transaction.status),
              'transaction-toast-icon-pending': transaction.status === TransactionStatusEnum.pending,
              'transaction-toast-icon-success': transaction.status === TransactionStatusEnum.success,
            })}
          >
            <TransactionAssetIcon transaction={transaction} iconSize={IconSizeEnumType.small} />
          </div>
        )}
        <div class="transaction-toast-details">
          <div class="transaction-toast-details-header">
            <div class="transaction-toast-header-left">
              <h4
                class={{
                  'transaction-toast-title': true,
                  'transaction-toast-title-short': Boolean(showAmount),
                  'truncate-toast-title': showTooltip,
                }}
              >
                {title}
              </h4>

              {showTooltip && (
                <MvxTooltip
                  position="bottom"
                  trigger={<CircleInfoIcon />}
                  tooltipKey={`${toastId}-amount`}
                  onTriggerRender={() => onForceUpdate?.()}
                >
                  {amount.label}
                </MvxTooltip>
              )}
            </div>
            {showAmount && (
              <FormatAmount
                class={classNames('transaction-toast-amount', {
                  'amount-negative': transaction.amount.startsWith('-'),
                  'amount-positive': !transaction.amount.startsWith('-'),
                  'transaction-toast-failed': getIsTransactionFailed(transaction.status),
                })}
                isValid
                label={amount.label}
                valueDecimal={amount.amountDecimal}
                valueInteger={amount.amountInteger}
                labelClass="transaction-amount-label"
                decimalClass="transaction-amount-decimal"
              />
            )}
          </div>
          {transaction && (
            <div class="transaction-toast-details-info">
              {transaction.directionLabel && (
                <span class="transaction-toast-details-info-text">{transaction.directionLabel}</span>
              )}
              <div class="transaction-toast-details-info-icon">
                {transaction.interactorAsset ? (
                  <img src={transaction.interactorAsset} alt="Service icon" loading="lazy" />
                ) : (
                  <DefaultTransactionIconSmall />
                )}
              </div>
              <Trim text={transaction.interactor} class="transaction-toast-details-info-text" />
            </div>
          )}
        </div>

        {hasCloseButton && <Icon name="close" class={styles.transactionToastClose} onClick={onDeleteToast} />}

        {!hasCloseButton && showExplorerLinkButton && (
          <ExplorerLink link={transaction.link} class="transaction-toast-action-button" />
        )}
      </div>

      {!showExplorerLinkButton && (
        <TransactionToastDetails
          transactions={transactions}
          processedTransactionsStatus={processedTransactionsStatus}
          toastId={toastId}
          onForceUpdate={onForceUpdate}
        />
      )}
    </div>
  );
}
