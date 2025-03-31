import { Component, h, Prop } from '@stencil/core';
import classNames from 'classnames';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import type { IMvxTransactionsTableRow } from '../../mvx-transactions-table.type';

@Component({
  tag: 'mvx-transaction-hash',
})
export class MvxTransactionHash {
  @Prop() class?: string;
  @Prop() transaction: IMvxTransactionsTableRow;

  render() {
    if (!this.transaction) {
      return null;
    }

    return (
      <div class={classNames(this.class, 'transaction-hash')}>
        <mvx-transaction-icon iconInfo={this.transaction.iconInfo}></mvx-transaction-icon>
        <explorer-link dataTestId={DataTestIdsEnum.transactionLink} link={this.transaction.link} text={this.transaction.txHash}></explorer-link>
      </div>
    );
  }
}
