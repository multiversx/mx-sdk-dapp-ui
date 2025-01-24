import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface ITransactionsTableRow {
  age: ITransactionAge;
  method: ITransactionMethod;
  iconInfo: ITransactionIconInfo;
  link: string;
  txHash: string;
}

export interface ITransactionAge {
  age: string;
  tooltip: string;
}

export interface ITransactionIconInfo {
  icon?: IconDefinition;
  tooltip: string;
}

export interface ITransactionMethod {
  method: string;
  transactionActionDescription?: string;
}
