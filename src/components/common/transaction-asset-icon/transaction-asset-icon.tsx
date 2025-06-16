import { Component, h, Prop } from '@stencil/core';
import type { ITransactionListItem } from 'components/visual/transaction-list-item/transaction-list-item.types';

export enum IconSizeEnumType {
  small = 'small',
  large = 'large',
}

@Component({
  tag: 'mvx-transaction-asset-icon',
  shadow: true,
})
export class TransactionAssetIcon {
  @Prop() transaction: ITransactionListItem;
  @Prop() iconSize: IconSizeEnumType;

  render() {
    if (this.transaction?.asset === null) {
      return this.iconSize === IconSizeEnumType.small ? (
        <mvx-default-transaction-icon-small />
      ) : (
        <mvx-default-transaction-icon-large />
      );
    }

    if (this.transaction.asset.imageUrl) {
      return <img src={this.transaction.asset.imageUrl} alt="Transaction icon" loading="lazy" />;
    }

    if (this.transaction.asset.icon) {
      return <mvx-fa-icon icon={this.transaction.asset.icon} />;
    }

    if (this.transaction.asset.text) {
      return <span>{this.transaction.asset.text}</span>;
    }

    return this.iconSize === IconSizeEnumType.small ? (
      <mvx-default-transaction-icon-small />
    ) : (
      <mvx-default-transaction-icon-large />
    );
  }
}
