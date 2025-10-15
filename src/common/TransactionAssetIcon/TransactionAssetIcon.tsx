import { h } from '@stencil/core';
import { Icon } from 'common/Icon';
import type { ITransactionListItem } from 'components/visual/transaction-list-item/transaction-list-item.types';

export enum IconSizeEnumType {
  small = 'small',
  large = 'large',
}

interface ITransactionAssetIconProps {
  transaction: ITransactionListItem;
  iconSize: IconSizeEnumType;
}

export function TransactionAssetIcon({ transaction, iconSize }: ITransactionAssetIconProps) {
  if (transaction?.asset === null) {
    return iconSize === IconSizeEnumType.small ? (
      <mvx-default-transaction-icon-small />
    ) : (
      <mvx-default-transaction-icon-large />
    );
  }

  if (transaction.asset.imageUrl) {
    return (
      <img
        src={transaction.asset.imageUrl}
        alt="Transaction icon"
        loading="lazy"
        class="mvx:max-w-full mvx:max-h-full"
      />
    );
  }

  if (transaction.asset.icon) {
    return <Icon name={transaction.asset.icon} />;
  }

  if (transaction.asset.text) {
    return <span>{transaction.asset.text}</span>;
  }

  return iconSize === IconSizeEnumType.small ? (
    <mvx-default-transaction-icon-small />
  ) : (
    <mvx-default-transaction-icon-large />
  );
}
