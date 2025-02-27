import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface ITransactionHistory {
  hash: string;
  title: string;
  status: string;
  amount?: string;
  currency?: string;
  icon?: IconDefinition;
  timestamp?: number;
  to?: string;
  from?: string;
  badge?: string | string[];
}

export enum NotificationFeedEventsEnum {
  CLOSE = 'notification-feed-close',
  CLEAR = 'notification-feed-clear',
  TRANSACTIONS_HISTORY_UPDATE = 'transactions-history-update',
}
