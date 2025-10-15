import { h } from '@stencil/core';

import type { TransactionIconInfoType } from '../../transactions-table.type';
import { Icon } from 'common/Icon';
import { IconNameEnum } from 'common/Icon/icon.types';

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
                [styles.transactionIconError]: iconInfo.icon === IconNameEnum.close,
                [styles.transactionIconPending]: iconInfo.icon === IconNameEnum.hourglass,
                [className]: Boolean(className),
            }}
            name={iconInfo.icon}
        />
    );

}
