import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';

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

export interface ITransactionListItem {
  hash: string;
  title: string;
  status?: TransactionServerStatusesEnum | TransactionBatchStatusesEnum;
  inTransit?: boolean;
  amount?: string;
  label?: string; // Token/asset symbol
  icon?: IconDefinition;
  timestamp?: number;
  to?: string;
  from?: string;
  assets?: string | string[]; // Array of image URLs (SVG or PNG) for the token assets involved in the transaction
  // New properties
  nonce: number;
  value: string;
  receiver: string;
  sender: string;
  receiverUsername?: string;
  senderUsername?: string;
  guardian?: string;
  relayer?: string;
  gasPrice: number;
  gasLimit: number;
  data?: string;
  chainID: string;
  version: number;
  options?: number;
  signature?: string;
  guardianSignature?: string;
  relayerSignature?: string;
  invalidTransaction?: boolean;
  results?: any[];
  previousStatus?: TransactionServerStatusesEnum | TransactionBatchStatusesEnum;
  hasStatusChanged?: boolean;
}
