import { h } from '@stencil/core';
import { Icon } from 'common/Icon';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import type { TransactionAccountType } from '../../transactions-table.type';
import { TransactionAccountName } from './components';
import { ExplorerLink } from 'common/ExplorerLink/ExplorerLink';

// prettier-ignore
const styles = {
    transactionAccount: 'transaction-account mvx:flex mvx:items-center mvx:gap-2',
    transactionAccountExplorerLink: 'transaction-account-explorer-link mvx:text-primary!'
} satisfies Record<string, string>;

interface TransactionAccountPropsType {
    account: TransactionAccountType;
    class?: string;
    dataTestId?: string;
    scope: 'receiver' | 'sender';
    showLockedAccounts: boolean;
}

export function TransactionAccount({ account, dataTestId, scope, showLockedAccounts = false, class: className }: TransactionAccountPropsType) {
    const explorerLinkDataTestId =
        scope === 'receiver' ? DataTestIdsEnum.receiverLink : DataTestIdsEnum.senderLink;

    return (
        <div
            data-testid={dataTestId}
            class={{ [styles.transactionAccount]: true, [className]: Boolean(className) }}
        >
            {showLockedAccounts && account.isTokenLocked && <Icon name="lock" />}
            {account.isContract && <Icon name="contract" />}

            {account.showLink ? (
                <ExplorerLink
                    link={account.link}
                    data-testid={explorerLinkDataTestId}
                    class={styles.transactionAccountExplorerLink}
                >
                    <span>{account.address}</span>
                </ExplorerLink>
            ) : (
                <TransactionAccountName
                    name={account.name}
                    description={account.description}
                    address={account.address}
                />
            )}
        </div>
    );
}

