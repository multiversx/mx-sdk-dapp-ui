import { IconName } from '@fortawesome/free-solid-svg-icons';

export interface IToastDataState {
  id: string;
  icon: IconName | string | JSX.Element;
  hasCloseButton: boolean;
  title: string;
  iconClassName: string;
}

export interface ITransactionProgressState {
  progressClass?: string;
  currentRemaining: number;
}

export interface ITransaction {
  hash: string;
  status: string;
}

export interface ITransactionToast {
  toastId: string;
  wrapperClass: string;
  processedTransactionsStatus: string | JSX.Element;
  transactions: ITransaction[];
  toastDataState: IToastDataState;
  transactionProgressState?: ITransactionProgressState;
}
