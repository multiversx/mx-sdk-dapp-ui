import { Component, Prop, h } from '@stencil/core';
import { getIconHtmlFromIconDefinition } from 'utils/icons/getIconHtmlFromIconDefinition';
import classNames from 'classnames';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ITransactionIconInfo } from '../../transactions-table.type';
import { Watch } from '../../../../../dist/types/stencil-public-runtime';

@Component({
  tag: 'transaction-icon',
  styleUrl: 'transaction-icon.css',
  shadow: true,
})
export class TransactionIcon {
  @Prop() data: string;
  private iconInfo: ITransactionIconInfo;

  @Watch('data')
  dataChangeHandler(newValue: string) {
    if (!newValue) {
      return;
    }

    try {
      this.iconInfo = JSON.parse(newValue);
    } catch (error) {
      console.error('Failed to parse icon info');
    }
  }

  componentDidLoad() {
    // Parse initial data
    if (this.data) {
      this.dataChangeHandler(this.data);
    }
  }

  render() {
    if (!this.iconInfo) {
      return null;
    }

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
