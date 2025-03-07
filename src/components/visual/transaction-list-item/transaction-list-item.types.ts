import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
export interface ITransactionListItemDetails {
  initiator: string;
  initiatorAsset?: string;
  directionLabel?: string;
}

export interface ITransactionListItemAsset {
  imageUrl?: string;
  text?: string;
  icon?: IconDefinition;
}

export interface ITransactionListItemAction {
  name: string;
  description?: string;
}

export interface ITransactionListItem {
  asset: ITransactionListItemAsset | null;
  action: ITransactionListItemAction;
  amount?: string;
  details?: ITransactionListItemDetails;
}
