import { h } from '@stencil/core';
import { DefaultTransactionIconLarge } from 'assets/icons/default-transaction-icon-large/default-transaction-icon-large';
import { DefaultTransactionIconSmall } from 'assets/icons/default-transaction-icon-small/default-transaction-icon-small';
import classNames from 'classnames';
import { Icon } from 'common/Icon';
import type { ITransactionListItem } from 'components/functional/notifications-feed/components/TransactionListItem/transactionListItem.types';

export enum IconSizeEnumType {
  small = 'small',
  large = 'large',
}

interface ITransactionAssetIconProps {
  transaction: ITransactionListItem;
  iconSize: IconSizeEnumType;
  iconClass?: string;
  imgClass?: string;
  textClass?: string;
}

export function TransactionAssetIcon({
  transaction,
  iconSize,
  iconClass,
  imgClass,
  textClass,
}: ITransactionAssetIconProps) {
  if (transaction?.asset === null) {
    return iconSize === IconSizeEnumType.small ? <DefaultTransactionIconSmall /> : <DefaultTransactionIconLarge />;
  }

  if (transaction.asset.imageUrl) {
    return (
      <img
        src={transaction.asset.imageUrl}
        alt="Transaction icon"
        loading="lazy"
        class={classNames('mvx:max-w-full mvx:max-h-full', imgClass)}
      />
    );
  }

  if (transaction.asset.icon) {
    return <Icon name={transaction.asset.icon} class={iconClass} />;
  }

  if (transaction.asset.text) {
    return <span class={textClass}>{transaction.asset.text}</span>;
  }

  return iconSize === IconSizeEnumType.small ? <DefaultTransactionIconSmall /> : <DefaultTransactionIconLarge />;
}
