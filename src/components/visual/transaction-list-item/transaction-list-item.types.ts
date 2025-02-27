import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface ITransactionListItem {
  hash: string;
  title: string;
  status: string;
  amount?: string;
  label?: string; // Token/asset symbol
  icon?: IconDefinition;
  timestamp?: number;
  to?: string;
  from?: string;
  assets?: string | string[]; // Array of image URLs (SVG or PNG) for the token assets involved in the transaction
}
