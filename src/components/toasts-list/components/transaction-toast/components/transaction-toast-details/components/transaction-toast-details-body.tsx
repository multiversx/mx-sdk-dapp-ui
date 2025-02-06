import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faCheck, faCircleNotch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Component, h, Prop } from '@stencil/core';
import classNames from 'classnames';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';
import { getIconHtmlFromIconDefinition } from 'utils/icons/getIconHtmlFromIconDefinition';

const iconData: Record<string, IconDefinition> = {
  pending: faCircleNotch,
  success: faCheck,
  fail: faTimes,
  invalid: faTimes,
};

@Component({
  tag: 'transaction-toast-details-body',
  styleUrl: 'transaction-toast-details-body.css',
  shadow: true,
})
export class TransactionDetailsBody {
  @Prop() transactionClass?: string = 'transaction-container';
  @Prop() status?: string;
  @Prop() hash: string;
  @Prop() link: string;

  render() {
    const statusIcon = this.status ? iconData[this.status] : null;
    const iconHtml = statusIcon ? getIconHtmlFromIconDefinition(statusIcon) : null;

    return (
      <div class={this.transactionClass} key={this.hash} data-testid={DataTestIdsEnum.transactionDetailsToastBody}>
        {iconHtml && (
          <div
            innerHTML={iconHtml}
            class={classNames('icon', {
              'fa-spin': this.status === 'pending',
            })}
          ></div>
        )}
        <trim-text text={this.hash} />
        <div class="actions">
          <copy-button text={this.hash} />
          <explorer-link link={this.link} />
        </div>
      </div>
    );
  }
}
