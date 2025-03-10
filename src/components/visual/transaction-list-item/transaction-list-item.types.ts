export interface ITransactionListItemDetails {
  initiator: string;
  initiatorAsset?: string;
  directionLabel?: string;
}

export interface ITransactionListItemAsset {
  imageUrl?: string;
  text?: string;
  icon?: string;
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
