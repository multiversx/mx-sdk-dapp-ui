import { h } from '@stencil/core';
import { Icon } from 'common/Icon';
import { IconNamesEnum } from 'common/Icon/icon.types';

import type { TransactionIconInfoType } from '../../transactions-table.type';

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

    return (
        <Icon
            class={{
                [styles.transactionIconError]: iconInfo.icon === IconNamesEnum.close,
                [styles.transactionIconPending]: iconInfo.icon === IconNamesEnum.hourglass,
                [className]: Boolean(className),
            }}
            name={iconInfo.icon}
        />
    );

}
