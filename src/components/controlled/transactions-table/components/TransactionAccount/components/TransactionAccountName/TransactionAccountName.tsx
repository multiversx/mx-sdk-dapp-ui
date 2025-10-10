import { h } from '@stencil/core';
import classNames from 'classnames';

// prettier-ignore
const styles = {
    transactionAccountName: 'transaction-account-name mvx:w-max mvx:truncate'
} satisfies Record<string, string>;

interface TransactionAccountNamePropsType {
    address: string;
    class?: string;
    dataTestId?: string;
    description: string;
    name?: string;
}

export function TransactionAccountName({ address, dataTestId, description, name, class: className }: TransactionAccountNamePropsType) {
    if (name) {
        return (
            <div
                class={{ [className]: Boolean(className), [styles.transactionAccountName]: true }}
                data-testid={dataTestId}
                title={description}
            >
                {name}
            </div>
        );
    }

    return (
        <mvx-trim
            text={address}
            class={classNames(className, styles.transactionAccountName)}
            dataTestId={dataTestId}
        />
    );

}
