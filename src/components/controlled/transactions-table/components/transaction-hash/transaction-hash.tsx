import { Component, h, Prop } from '@stencil/core';
import classNames from 'classnames';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import type { TransactionRowType } from '../../transactions-table.type';

@Component({
  tag: 'mvx-transaction-hash',
  styleUrl: 'transaction-hash.css',
})
export class TransactionHash {
  @Prop() class?: string;
  @Prop() transaction: TransactionRowType;

  render() {
    if (!this.transaction) {
      return null;
    }

    return (
      <div class={classNames(this.class, 'transaction-hash')}>
        <mvx-transaction-icon iconInfo={this.transaction.iconInfo}></mvx-transaction-icon>
        <mvx-explorer-link
          dataTestId={DataTestIdsEnum.transactionLink}
          link={this.transaction.link}
          text={this.transaction.txHash}
        ></mvx-explorer-link>
      </div>
    );
  }
}
