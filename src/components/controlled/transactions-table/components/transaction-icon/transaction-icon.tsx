import { Component, h, Prop } from '@stencil/core';
import classNames from 'classnames';

import type { TransactionIconInfoType } from '../../transactions-table.type';
import { Icon } from 'common/Icon';
import { IconNameEnum } from 'common/Icon/icon.types';

// prettier-ignore
const styles = {
  transactionIconError: 'transaction-icon-error mvx:text-error',
  transactionIconPending: 'transaction-icon-pending mvx:text-pending'
} satisfies Record<string, string>;

@Component({
  tag: 'mvx-transaction-icon',
})
export class TransactionIcon {
  @Prop() class?: string;
  @Prop() iconInfo: TransactionIconInfoType;

  render() {
    if (!this.iconInfo) {
      return null;
    }

    return (
      <Icon
        class={classNames(
          {
            [styles.transactionIconError]: this.iconInfo.icon === 'faTimes',
            [styles.transactionIconPending]: this.iconInfo.icon === 'faHourglass',
          },
          this.class,
        )}
        name={this.iconInfo.icon as IconNameEnum}
      />
    );
  }
}
