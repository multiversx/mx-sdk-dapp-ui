import type { JSX } from '@stencil/core';
import { h } from '@stencil/core';
import type { ITransactionListItem } from 'components/functional/notifications-feed/components/TransactionListItem/transactionListItem.types';
import { TransactionStatusEnum } from 'constants/transactionStatus.enum';

import { TransactionToastContent } from './components/transaction-toast-content/transaction-toast-content';
import type { IToastDataState, ITransactionProgressState } from './transaction-toast.type';

interface TransactionToastPropsType {
  toastId?: string;
  fullWidth?: boolean;
  processedTransactionsStatus?: string | JSX.Element;
  transactions?: ITransactionListItem[];
  toastDataState: IToastDataState;
  transactionProgressState?: ITransactionProgressState;
  onDeleteToast?: () => void;
  onForceUpdate?: () => void;
}

export function TransactionToast({
  toastId = '',
  fullWidth,
  processedTransactionsStatus = '',
  transactions = [],
  toastDataState,
  transactionProgressState,
  onDeleteToast,
  onForceUpdate,
}: TransactionToastPropsType) {
  const isStatusPending = transactions.every(tx => tx.status === TransactionStatusEnum.pending);

  return (
    <div class="transaction-toast">
      <mvx-transaction-toast-progress
        key={toastId}
        toastId={toastId}
        startTime={transactionProgressState?.startTime}
        endTime={transactionProgressState?.endTime}
        isStatusPending={isStatusPending}
      >
        <TransactionToastContent
          fullWidth={fullWidth}
          toastDataState={toastDataState}
          transactions={transactions}
          processedTransactionsStatus={processedTransactionsStatus}
          toastId={toastId}
          onDeleteToast={onDeleteToast}
          onForceUpdate={onForceUpdate}
        />
      </mvx-transaction-toast-progress>
    </div>
  );
}
