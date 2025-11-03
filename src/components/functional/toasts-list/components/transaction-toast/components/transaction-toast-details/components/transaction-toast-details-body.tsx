import { Component, h, Prop } from '@stencil/core';
import { Icon } from 'common/Icon/Icon';
import { IconNamesEnum } from 'common/Icon/icon.types';
import { Trim } from 'common/Trim/Trim';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';
import { TransactionStatusEnum } from 'constants/transactionStatus.enum';
import { getIsTransactionFailed } from 'utils/getTransactionStatus';

const iconData: Record<string, IconNamesEnum> = {
  pending: IconNamesEnum.hourglass,
  success: IconNamesEnum.check,
  fail: IconNamesEnum.close,
  invalid: IconNamesEnum.close,
};

const transactionToastDetailsBodyClasses: Record<string, string> = {
  explorerLinkIcon: 'mvx:fill-primary!',
};

@Component({
  tag: 'mvx-transaction-toast-details-body',
  styleUrl: 'transaction-toast-details-body.scss',
})
export class TransactionDetailsBody {
  @Prop() transactionClass?: string = 'transaction-details-list-item';
  @Prop() status?: `${TransactionStatusEnum}`;
  @Prop() hash: string;
  @Prop() link: string;
  @Prop() index: string;

  render() {
    const statusIcon = this.status ? iconData[this.status] : null;

    return (
      <div class={this.transactionClass} key={this.hash} data-testid={DataTestIdsEnum.transactionDetailsToastBody}>
        {statusIcon && (
          <div
            class={{
              'transaction-details-list-item-icon': true,
              'transaction-details-list-item-icon-success': this.status === TransactionStatusEnum.success,
              'transaction-details-list-item-icon-pending': this.status === TransactionStatusEnum.pending,
              'transaction-details-list-item-icon-fail': getIsTransactionFailed(this.status),
            }}
          >
            <Icon name={statusIcon} />
          </div>
        )}
        <div class="transaction-details-list-item-hash-index">{this.index}</div>
        <div class="transaction-details-list-item-hash-value">
          <Trim text={this.hash} />
        </div>

        <mvx-copy-button
          text={this.hash}
          class="transaction-details-list-item-copy"
          iconClass="transaction-details-list-item-copy-icon"
        />

        <div class="transaction-details-list-item-explorer-link-icon">
          <mvx-explorer-link link={this.link} class={transactionToastDetailsBodyClasses.explorerLinkIcon} />
        </div>
      </div>
    );
  }
}
