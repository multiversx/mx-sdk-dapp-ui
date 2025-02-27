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

export enum NotificationsFeedEventsEnum {
  CLOSE_NOTIFICATIONS_FEED = 'CLOSE_NOTIFICATIONS_FEED',
  CLEAR_NOTIFICATIONS_FEED_HISTORY = 'CLEAR_NOTIFICATIONS_FEED_HISTORY',
  OPEN_NOTIFICATIONS_FEED = 'OPEN_NOTIFICATIONS_FEED',
  PROCESSING_TRANSACTIONS_UPDATE = 'PROCESSING_TRANSACTIONS_UPDATE',
  TRANSACTIONS_HISTORY_UPDATE = 'TRANSACTIONS_HISTORY_UPDATE',
}
