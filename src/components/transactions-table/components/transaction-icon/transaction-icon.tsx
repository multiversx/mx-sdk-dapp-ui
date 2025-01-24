import { Component, Prop, h } from '@stencil/core';
import { getIconHtmlFromIconDefinition } from 'utils/icons/getIconHtmlFromIconDefinition';
import classNames from 'classnames';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ITransactionIconInfo } from '../../transactions-table.type';

@Component({
  tag: 'transaction-icon',
  styleUrl: 'transaction-icon.css',
  shadow: true,
})
export class TransactionIcon {
  @Prop() iconInfo: ITransactionIconInfo;

  render() {
    const iconHtml = getIconHtmlFromIconDefinition(this.iconInfo.icon);

    return (
      <div
        class={classNames({
          'fa-sm': this.iconInfo.icon === faTimes,
        })}
        innerHTML={iconHtml}
        title={this.iconInfo.tooltip}
      ></div>
    );
  }
}
