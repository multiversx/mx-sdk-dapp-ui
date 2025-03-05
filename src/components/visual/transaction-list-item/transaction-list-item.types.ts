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
  iconUrl?: string;
  directionLabel?: string;
  initiator?: string;
}

export interface ITransactionListItem {
  mainIconUrl?: string;
  title: string;
  amount: string;
  details?: ITransactionListItemDetails;
  rightIcons?: string[];
}
