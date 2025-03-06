import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export enum TransactionServerStatusesEnum {
  pending = 'pending',
  fail = 'fail',
  invalid = 'invalid',
  success = 'success',
  executed = 'executed',
  notExecuted = 'not executed',
  rewardReverted = 'reward-reverted',
}

export enum TransactionBatchStatusesEnum {
  signed = 'signed',
  cancelled = 'cancelled',
  success = 'success',
  sent = 'sent',
  fail = 'fail',
  timedOut = 'timedOut',
  invalid = 'invalid',
}

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
