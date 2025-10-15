import { h } from '@stencil/core';

import type { TransactionIconInfoType } from '../../transactions-table.type';
import { Icon } from 'common/Icon';
import { getValidIcon } from './transactionIcon.helpers';

// prettier-ignore
const styles = {
    transactionIconError: 'transaction-icon-error mvx:text-error',
    transactionIconPending: 'transaction-icon-pending mvx:text-pending'
} satisfies Record<string, string>;

interface TransactionIconPropsType {
    iconInfo: TransactionIconInfoType;
    class?: string;
}

export function TransactionIcon({ iconInfo, class: className }: TransactionIconPropsType) {
    if (!iconInfo) {
        return null;
    }

    const iconName = getValidIcon(iconInfo.icon);

    return (
        <Icon
            class={{
                [styles.transactionIconError]: iconInfo.icon === 'close',
                [styles.transactionIconPending]: iconInfo.icon === 'hourglass',
                [className]: Boolean(className),
            }}
            name={iconName}
        />
    );

}
