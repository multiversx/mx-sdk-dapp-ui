import { h } from '@stencil/core';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import type { TransactionRowType } from '../../transactions-table.type';

// prettier-ignore
const styles = {
    transactionShards: 'transaction-shards mvx:items-center mvx:flex mvx:gap-2 mvx:w-max mvx:fill-label',
    transactionShardsArrowIcon: 'transaction-shards-arrow-icon mvx:w-4 mvx:h-4',
    explorerLink: 'explorer-link mvx:text-primary!'
} satisfies Record<string, string>;

interface TransactionShardsPropsType {
    class?: string;
    transaction: TransactionRowType;
}

export function TransactionShards({ transaction, class: className }: TransactionShardsPropsType) {
    return (
        <div class={{ [className]: Boolean(className), [styles.transactionShards]: true }}>
            <mvx-explorer-link
                link={transaction.sender.shardLink}
                class={styles.explorerLink}
                data-testid={DataTestIdsEnum.shardFromLink}
            >
                <span data-testid={DataTestIdsEnum.senderShard}>{transaction.sender.shard}</span>
            </mvx-explorer-link>

            <mvx-arrow-right-icon class={styles.transactionShardsArrowIcon} />

            <mvx-explorer-link
                link={transaction.receiver.shardLink}
                data-testid={DataTestIdsEnum.shardToLink}
                class={styles.explorerLink}
            >
                <span data-testid={DataTestIdsEnum.receiverShard}>{transaction.receiver.shard}</span>
            </mvx-explorer-link>
        </div>
    );
}

