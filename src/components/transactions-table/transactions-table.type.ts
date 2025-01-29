import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface ITransactionsTableRow {
  age: ITransactionAge;
  method: ITransactionMethod;
  iconInfo: ITransactionIconInfo;
  link: string;
  receiver: ITransactionAccount;
  sender: ITransactionAccount;
  txHash: string;
}

export interface ITransactionAge {
  timeAgo: string;
  tooltip: string;
}

export interface ITransactionIconInfo {
  icon?: IconDefinition;
  tooltip: string;
}

export interface ITransactionMethod {
  name: string;
  actionDescription?: string;
}

export interface ITransactionAccount {
  address: string;
  name: string;
  description: string;
  isContract: boolean;
  isTokenLocked: boolean;
  link: string;
  showLink: boolean;
}
