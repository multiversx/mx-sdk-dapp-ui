import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faCheck, faHourglass, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Component, h, Prop } from '@stencil/core';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';
import { getIconHtmlFromIconDefinition } from 'utils/icons/getIconHtmlFromIconDefinition';

const iconData: Record<string, IconDefinition> = {
  pending: faHourglass,
  success: faCheck,
  fail: faTimes,
  invalid: faTimes,
};

@Component({
  tag: 'transaction-toast-details-body',
  styleUrl: 'transaction-toast-details-body.css',
  shadow: false,
})
export class TransactionDetailsBody {
  @Prop() transactionClass?: string = 'transaction-details-list-item';
  @Prop() status?: string;
  @Prop() hash: string;
  @Prop() link: string;
  @Prop() index: string;

  render() {
    const statusIcon = this.status ? iconData[this.status] : null;
    const iconHtml = statusIcon ? getIconHtmlFromIconDefinition(statusIcon) : null;

    return (
      <div class={this.transactionClass} key={this.hash} data-testid={DataTestIdsEnum.transactionDetailsToastBody}>
        {iconHtml && (
          <div
            innerHTML={iconHtml}
            class={{
              'transaction-details-list-item-icon': true,
              'transaction-details-list-item-icon-success': this.status === 'success',
              'transaction-details-list-item-icon-pending': this.status === 'pending',
              'transaction-details-list-item-icon-fail': ['fail', 'invalid'].includes(this.status),
            }}
          ></div>
        )}
        <div class="transaction-details-list-item-hash-index">{this.index}</div>
        <div class="transaction-details-list-item-hash-value">
          <trim-text text={this.hash} />
        </div>
        <explorer-link iconClass="transaction-details-list-item-explorer-link-icon" link={this.link} />
        <copy-button iconClass="transaction-details-list-item-copy-button-icon" text={this.hash} />
      </div>
    );
  }
}
