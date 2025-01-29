import { Component, Prop, h } from '@stencil/core';
import classNames from 'classnames';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ITransactionIconInfo } from '../../transactions-table.type';

@Component({
  tag: 'transaction-icon',
  styleUrl: 'transaction-icon.css',
  shadow: true,
})
export class TransactionIcon {
  @Prop() class?: string = 'transaction-icon';
  @Prop() iconInfo: ITransactionIconInfo;

  render() {
    if (!this.iconInfo) {
      return null;
    }

    return (
      <fontawesome-icon
        class={classNames(
          {
            'fa-sm': this.iconInfo.icon === faTimes,
          },
          this.class,
        )}
        icon={this.iconInfo.icon}
        description={this.iconInfo.tooltip}
      />
    );
  }
}
