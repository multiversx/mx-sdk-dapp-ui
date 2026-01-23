import { h } from '@stencil/core';
import classNames from 'classnames';
import { Trim } from 'common/Trim/Trim';

// prettier-ignore
const styles = {
    transactionAccountName: 'transaction-account-name mvx:w-max mvx:truncate'
} satisfies Record<string, string>;

interface TransactionAccountNamePropsType {
  address: string;
  class?: string;
  'data-testid'?: string;
  description: string;
  name?: string;
}

export function TransactionAccountName({
  address,
  'data-testid': dataTestId,
  description,
  name,
  class: className,
}: TransactionAccountNamePropsType) {
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
    <Trim text={address} class={classNames(className, styles.transactionAccountName)} data-testid={dataTestId} />
  );
}
