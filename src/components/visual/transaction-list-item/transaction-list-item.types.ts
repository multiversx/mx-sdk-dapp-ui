import type { IconNamesEnum } from 'common/Icon/icon.types';
import type { TransactionStatusEnum } from 'constants/transactionStatus.enum';

export interface ITransactionListItemAsset {
  imageUrl?: string;
  text?: string;
  icon?: `${IconNamesEnum}`;
}

export interface ITransactionListItemAction {
  name: string;
  description?: string;
}

export interface ITransactionListItem {
  asset: ITransactionListItemAsset | null;
  action: ITransactionListItemAction;
  interactor: string;
  interactorAsset?: string;
  directionLabel?: string;
  amount?: string;
  hash: string;
  status: `${TransactionStatusEnum}`;
  link: string;
  timestamp: number;
}
