import { h } from '@stencil/core';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

// prettier-ignore
const styles = {
    transactionAge: 'transaction-age mvx:w-max'
} satisfies Record<string, string>;

interface TransactionAgePropsType {
    age: string;
    class?: string;
    tooltip?: string;
}

export function TransactionAge({ age, tooltip, class: className }: TransactionAgePropsType) {
    const component = tooltip ? (
        <div
            title={tooltip}
            data-testid={DataTestIdsEnum.transactionAge}
            class={{ [styles.transactionAge]: true, [className]: Boolean(className) }}
        >
            {age}
        </div>
    ) : (
        <div
            data-testid={DataTestIdsEnum.transactionAge}
            class={{ [styles.transactionAge]: true, [className]: Boolean(className) }}
        >
            {age}
        </div>
    );

    return <div class={{ [className]: Boolean(className), [styles.transactionAge]: true }}>{component}</div>;
}
