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
  initiator: string;
  initiatorAsset?: string;
  directionLabel?: string;
  amount?: string;
  hash: string;
  status: string;
  link: string;
  timestamp: number;
}
