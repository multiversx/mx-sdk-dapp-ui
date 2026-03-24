import type { JSX } from '@stencil/core';
import { h } from '@stencil/core';
import classNames from 'classnames';
import { Icon } from 'common/Icon';
import type { ITransactionListItem } from 'components/functional/notifications-feed/components/TransactionListItem/transactionListItem.types';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import { TransactionDetailsBody } from './components/transaction-toast-details-body';

const expandedStateMap = new Map<string, boolean>();
const showAllMap = new Map<string, boolean>();
const transactionsOrderMap = new Map<string, Map<string, number>>();

interface TransactionToastDetailsPropsType {
  processedTransactionsStatus?: string | JSX.Element;
  transactions?: ITransactionListItem[];
  transactionClass?: string;
  maxShownTransactions?: number;
  toastId?: string;
  onForceUpdate?: () => void;
}

export function TransactionToastDetails({
  processedTransactionsStatus,
  transactions,
  transactionClass,
  maxShownTransactions = 5,
  toastId = '',
  onForceUpdate,
}: TransactionToastDetailsPropsType) {
  if (transactions == null) {
    return null;
  }

  if (!transactionsOrderMap.has(toastId)) {
    transactionsOrderMap.set(toastId, new Map<string, number>());
  }
  const initialTransactionsOrder = transactionsOrderMap.get(toastId);

  const isExpanded = expandedStateMap.get(toastId) ?? false;
  const showAllTransactions = showAllMap.get(toastId) ?? false;

  const toggleExpand = () => {
    const current = expandedStateMap.get(toastId) ?? false;
    expandedStateMap.set(toastId, !current);
    if (current) {
      showAllMap.set(toastId, false);
    }
    onForceUpdate?.();
  };

  const showMoreTransactions = () => {
    showAllMap.set(toastId, true);
    onForceUpdate?.();
  };

  const getOrderedTransactions = (txs: ITransactionListItem[]) => {
    txs.forEach((transaction, index) => {
      if (!initialTransactionsOrder.has(transaction.hash)) {
        initialTransactionsOrder.set(transaction.hash, index + 1);
      }
    });

    return [...txs].sort((a, b) => initialTransactionsOrder.get(a.hash) - initialTransactionsOrder.get(b.hash));
  };

  const hasMoreTransactionsToShow = transactions.length > maxShownTransactions;
  const hiddenTransactionsCount = transactions.length - maxShownTransactions;
  const orderedTransactions = getOrderedTransactions(transactions);
  const visibleTransactions = showAllTransactions
    ? orderedTransactions
    : orderedTransactions.slice(0, maxShownTransactions);

  return (
    <div class="transaction-details-container">
      <div class="transaction-details-status" onClick={toggleExpand}>
        <Icon
          name="angle-down"
          class={classNames('transaction-details-status-icon', {
            rotated: isExpanded,
          })}
        />

        <span data-testid={DataTestIdsEnum.transactionDetailsStatus} class="transaction-details-status-text">
          {processedTransactionsStatus}
        </span>
      </div>

      <div
        class={{
          'transaction-details-list': true,
          'expanded': isExpanded,
        }}
      >
        {visibleTransactions.map(({ hash, status, link }) => (
          <TransactionDetailsBody
            transactionClass={transactionClass}
            hash={hash}
            status={status}
            link={link}
            index={`#${initialTransactionsOrder.get(hash)}`}
          />
        ))}

        {hasMoreTransactionsToShow && !showAllTransactions && (
          <div class="view-all-container">
            <button type="button" class="show-more-button" onClick={showMoreTransactions}>
              View {hiddenTransactionsCount} more
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
