import { h } from '@stencil/core';
import { CopyButton } from 'common/CopyButton/CopyButton';
import { ExplorerLink } from 'common/ExplorerLink/ExplorerLink';
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

interface TransactionDetailsBodyPropsType {
  transactionClass?: string;
  status?: `${TransactionStatusEnum}`;
  hash: string;
  link: string;
  index: string;
}

export function TransactionDetailsBody({
  transactionClass = 'transaction-details-list-item',
  status,
  hash,
  link,
  index,
}: TransactionDetailsBodyPropsType) {
  const statusIcon = status ? iconData[status] : null;

  return (
    <div class={transactionClass} key={hash} data-testid={DataTestIdsEnum.transactionDetailsToastBody}>
      {statusIcon && (
        <div
          class={{
            'transaction-details-list-item-icon': true,
            'transaction-details-list-item-icon-success': status === TransactionStatusEnum.success,
            'transaction-details-list-item-icon-pending': status === TransactionStatusEnum.pending,
            'transaction-details-list-item-icon-fail': getIsTransactionFailed(status),
          }}
        >
          <Icon name={statusIcon} />
        </div>
      )}
      <div class="transaction-details-list-item-hash-index">{index}</div>
      <div class="transaction-details-list-item-hash-value">
        <Trim text={hash} />
      </div>

      <CopyButton
        text={hash}
        class="transaction-details-list-item-copy"
        iconClass="transaction-details-list-item-copy-icon"
      />

      <div class="transaction-details-list-item-explorer-link-icon">
        <ExplorerLink link={link} class={transactionToastDetailsBodyClasses.explorerLinkIcon} />
      </div>
    </div>
  );
}
