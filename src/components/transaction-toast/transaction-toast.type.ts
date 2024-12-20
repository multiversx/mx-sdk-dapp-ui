import { IconName } from '@fortawesome/free-solid-svg-icons';
import { JSX } from '@stencil/core';

export interface IToastDataState {
  id: string;
  icon: IconName | string | JSX.Element;
  hasCloseButton: boolean;
  title: string;
  iconClassName: string;
}

export interface ITransactionProgressState {
  progressClass?: string;
  currentRemaining: number;
}

export interface ITransaction {
  hash: string;
  status: string;
}
