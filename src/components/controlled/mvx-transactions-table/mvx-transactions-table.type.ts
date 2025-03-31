import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface IMvxTransactionsTableRow {
  age: IMvxTransactionAge;
  direction?: string;
  method: IMvxTransactionMethod;
  iconInfo: IMvxTransactionIconInfo;
  link: string;
  receiver: IMvxTransactionAccount;
  sender: IMvxTransactionAccount;
  txHash: string;
  value: IMvxTransactionValue;
}

export interface IMvxTransactionAge {
  timeAgo: string;
  tooltip: string;
}

export interface IMvxTransactionIconInfo {
  icon?: IconDefinition;
  tooltip: string;
}

export interface IMvxTransactionMethod {
  name: string;
  actionDescription?: string;
}

export interface IMvxTransactionAccount {
  address: string;
  description: string;
  isContract: boolean;
  isTokenLocked: boolean;
  link: string;
  name: string;
  shard?: string;
  shardLink?: string;
  showLink: boolean;
}

export interface IMvxTransactionValue {
  badge?: string;
  collection?: string;
  egldLabel: string;
  link?: string;
  linkText?: string;
  name?: string;
  showFormattedAmount?: boolean;
  svgUrl?: string;
  ticker?: string;
  titleText?: string;
  valueDecimal: string;
  valueInteger: string;
}
