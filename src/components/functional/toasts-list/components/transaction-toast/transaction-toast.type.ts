// match these interfaces with src/path-to-file.type.ts from sdk-dapp
import type { IconName } from '@fortawesome/free-solid-svg-icons';
import type { JSX } from '@stencil/core';
import type { ITransactionListItem } from 'components/visual/transaction-list-item/transaction-list-item.types';
export interface ITransactionProgressState {
  progressClass?: string;
  startTime: number;
  endTime: number;
  isCrossShard: boolean;
}

export interface IToastDataState {
  title: string;
  iconUrl?: string;
  iconClassName?: string;
  hasCloseButton?: boolean;
}

export interface ITransactionToast {
  toastId: string;
  wrapperClass: string;
  processedTransactionsStatus: string | JSX.Element;
  transactions: ITransactionListItem[];
  toastDataState: IToastDataState;
  transactionProgressState?: ITransactionProgressState | null;
}

interface ISharedCustomToast {
  toastId: string;
  type?: string;
  onClose?: () => void;
}

export interface ISimpleToast extends ISharedCustomToast {
  icon: IconName | string | JSX.Element;
  iconClassName?: string;
  title?: string;
  message?: string;
  /**
   * Use `subtitle` to display a row of information between `title` and `message`
   */
  subtitle?: string;
  instantiateToastElement?: never;
}

export interface IComponentToast extends ISharedCustomToast {
  /**
   * A function that creates a custom toast component.
   *
   * Use `instantiateToastElement` to display a custom agnostic component.
   *
   * @returns {HTMLElement | null} The custom toast component to be displayed, or `null` if no component is created.
   *
   * **⚠️ Warning**: Toasts with components will not be persisted on page reload because agnostic components are not serializable.
   */
  instantiateToastElement: (() => HTMLElement) | null;
  icon?: never;
  iconClassName?: never;
  title?: never;
  message?: never;
  subtitle?: never;
}
export type CustomToastType = ISimpleToast | IComponentToast;
