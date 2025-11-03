import { h } from '@stencil/core';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

// prettier-ignore
const styles = {
    intAmount: 'int-amount mvx:text-inherit',
} satisfies Record<string, string>;

interface InvalidFormatAmountPropsType {
    class?: string;
    dataTestId?: string;
}

export function InvalidFormatAmount({ dataTestId, class: className }: InvalidFormatAmountPropsType) {
    return (
        <span data-testid={dataTestId ?? DataTestIdsEnum.formatAmountComponent} class={className}>
            <span class={styles.intAmount} data-testid={DataTestIdsEnum.formatAmountInt}>
                ...
            </span>
        </span>
    );
}