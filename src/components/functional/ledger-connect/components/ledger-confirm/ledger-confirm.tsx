import { h } from '@stencil/core';
import { CopyButton } from 'common/CopyButton/CopyButton';
import { ExplorerLink } from 'common/ExplorerLink/ExplorerLink';
import { Icon } from 'common/Icon';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import type { IConfirmScreenData } from '../../ledger-connect.types';
import styles from './ledger-confirm.styles';

interface LedgerConfirmationItemType {
  label: string;
  value: string;
  highlighted?: boolean;
  explorerLink?: string;
}

interface LedgerConfirmPropsType {
  confirmScreenData: IConfirmScreenData;
}

export function LedgerConfirm({ confirmScreenData }: LedgerConfirmPropsType) {
  const handleSupportButtonClick = (event: MouseEvent) => {
    event.preventDefault();
    window.open('https://help.multiversx.com/en/');
  };

  const ledgerConfirmationItems: LedgerConfirmationItemType[] = [
    {
      label: confirmScreenData.confirmAddressText,
      value: confirmScreenData.selectedAddress,
      explorerLink: confirmScreenData.explorerLink,
    },
    {
      label: confirmScreenData.authText,
      value: confirmScreenData.data,
      highlighted: true,
    },
  ];

  return (
    <div class={styles.ledgerConfirmHost}>
      <div data-testid={DataTestIdsEnum.ledgerConfirmAddress} class={styles.ledgerConfirm}>
        <div class={styles.ledgerConfirmItems}>
          {ledgerConfirmationItems.map(ledgerConfirmationItem => (
            <div class={styles.ledgerConfirmItem}>
              <div class={styles.ledgerConfirmItemLabel}>{ledgerConfirmationItem.label}</div>

              <div class={styles.ledgerConfirmItemValue}>
                <div
                  class={{
                    [styles.ledgerConfirmItemValueText]: true,
                    [styles.ledgerConfirmItemValueTextHighlighted]: Boolean(ledgerConfirmationItem.highlighted),
                  }}
                >
                  {ledgerConfirmationItem.value}
                </div>

                <div class={styles.ledgerConfirmItemValueActions}>
                  <CopyButton text={ledgerConfirmationItem.value} />

                  {ledgerConfirmationItem.explorerLink && <ExplorerLink link={ledgerConfirmationItem.explorerLink} />}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div class="ledger-confirm-action">
          Select <strong>Approve</strong> on your device to confirm.
        </div>

        <div class={styles.ledgerConfirmFooter}>
          <Icon name="triangular-warning" class={styles.ledgerConfirmFooterIcon} />

          <div class={styles.ledgerConfirmFooterDescription}>
            <span>If the address above does not match the one on your device, close this page and </span>

            <span class={styles.ledgerConfirmFooterDescriptionSupport} onClick={handleSupportButtonClick}>
              contact support.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
