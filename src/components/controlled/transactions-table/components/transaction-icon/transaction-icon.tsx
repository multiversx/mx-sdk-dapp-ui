import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Component, h, Prop } from '@stencil/core';
import classNames from 'classnames';

import type { ITransactionIconInfo } from '../../transactions-table.type';

@Component({
  tag: 'mvx-transaction-icon',
})
export class TransactionIcon {
  @Prop() class?: string;
  @Prop() iconInfo: ITransactionIconInfo;

  render() {
    if (!this.iconInfo) {
      return null;
    }

    return (
      <fa-icon
        class={classNames(
          {
            'fa-sm': this.iconInfo.icon === faTimes,
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
