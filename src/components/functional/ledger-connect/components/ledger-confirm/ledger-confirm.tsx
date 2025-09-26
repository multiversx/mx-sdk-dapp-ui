import { Component, h, Prop } from '@stencil/core';
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

@Component({
  tag: 'mvx-ledger-confirm',
  styleUrl: 'ledger-confirm.scss',
  shadow: true,
})
export class LedgerConfirm {
  @Prop() confirmScreenData: IConfirmScreenData;

  handleSupportButtonClick(event: MouseEvent) {
    event.preventDefault();
    window.open('https://help.multiversx.com/en/');
  }

  render() {
    const ledgerConfirmationItems: LedgerConfirmationItemType[] = [
      {
        label: this.confirmScreenData.confirmAddressText,
        value: this.confirmScreenData.selectedAddress,
        explorerLink: this.confirmScreenData.explorerLink,
      },
      {
        label: this.confirmScreenData.authText,
        value: this.confirmScreenData.data,
        highlighted: true,
      },
    ];

    return (
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

                <div class="ledger-confirm-item-value-actions">
                  <mvx-copy-button text={ledgerConfirmationItem.value} />

                  {ledgerConfirmationItem.explorerLink && (
                    <mvx-explorer-link link={ledgerConfirmationItem.explorerLink} />
                  )}
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

            <span
              class={styles.ledgerConfirmFooterDescriptionSupport}
              onClick={this.handleSupportButtonClick.bind(this)}
            >
              contact support.
            </span>
          </div>
        </div>
      </div>
    );
  }
}
