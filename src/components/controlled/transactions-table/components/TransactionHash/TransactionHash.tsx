import { h } from '@stencil/core';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import type { TransactionRowType } from '../../transactions-table.type';
import { TransactionIcon } from '../TransactionIcon';
import { Trim } from 'common/Trim/Trim';
import { ExplorerLink } from 'common/ExplorerLink/ExplorerLink';

// prettier-ignore
const styles = {
    transactionHash: 'transaction-hash mvx:flex mvx:gap-1 mvx:items-center mvx:justify-center',
    transactionHashExplorerLink: 'transaction-hash-explorer-link mvx:text-primary!',
    transactionHashIcon: 'transaction-hash-icon mvx:flex mvx:items-center mvx:justify-center',
} satisfies Record<string, string>;

interface TransactionHashPropsType {
  class?: string;
  transaction: TransactionRowType;
}

export function TransactionHash({ transaction, class: className }: TransactionHashPropsType) {
  if (!transaction) {
    return null;
  }

  return (
    <div
      class={{
        [styles.transactionHash]: true,
        [className]: Boolean(className),
      }}
    >
      <TransactionIcon iconInfo={transaction.iconInfo} class={styles.transactionHashIcon} />

      <ExplorerLink
        dataTestId={DataTestIdsEnum.transactionLink}
        link={transaction.link}
        class={styles.transactionHashExplorerLink}
      >
        <Trim text={transaction.txHash} />
      </ExplorerLink>
    </div>
  );
}
