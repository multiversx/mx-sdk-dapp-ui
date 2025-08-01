import { Component, h, Prop } from '@stencil/core';
import classNames from 'classnames';

import type { TransactionIconInfoType } from '../../transactions-table.type';

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
      <mvx-fa-icon
        class={classNames(
          {
            'mvx:text-error': this.iconInfo.icon === 'faTimes',
            'mvx:text-pending': this.iconInfo.icon === 'faHourglass',
          },
          this.class,
          'transaction-icon',
        )}
        icon={this.iconInfo.icon}
        description={this.iconInfo.tooltip}
      />
    );
  }
}
