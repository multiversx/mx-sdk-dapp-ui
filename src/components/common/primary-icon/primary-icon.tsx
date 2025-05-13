import { Component, h, Prop } from '@stencil/core';
import type { ITransactionListItem } from 'components/visual/transaction-list-item/transaction-list-item.types';

@Component({
  tag: 'mvx-primary-icon',
})
export class PrimaryIcon {
  @Prop() transaction: ITransactionListItem;
  @Prop() defaultIcon: JSX.Element;

  render() {
    if (this.transaction?.asset === null) {
      return this.defaultIcon;
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

    return this.defaultIcon;
  }
}
