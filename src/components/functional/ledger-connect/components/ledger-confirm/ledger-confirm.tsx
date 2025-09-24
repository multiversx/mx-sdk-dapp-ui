import { Component, h, Prop } from '@stencil/core';
import { Icon } from 'common/Icon';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import type { IConfirmScreenData } from '../../ledger-connect.types';

interface LedgerConfirmationItemType {
  label: string;
  value: string;
  highlighted?: boolean;
  explorerLink?: string;
}

// prettier-ignore
const styles = {
  ledgerConfirm: 'ledger-confirm mvx:flex mvx:flex-col mvx:flex-1 mvx:gap-3 mvx:overflow-auto mvx:py-6 mvx:text-primary',
  ledgerConfirmItems: 'ledger-confirm-items mvx:flex mvx:flex-col mvx:gap-5',
  ledgerConfirmItem: 'ledger-confirm-item mvx:flex mvx:flex-col mvx:gap-4',
  ledgerConfirmItemLabel: 'ledger-confirm-item-label mvx:text-base mvx:leading-none',
  ledgerConfirmItemValue: 'ledger-confirm-item-value mvx:min-h-16 mvx:p-3 mvx:rounded-xl mvx:flex mvx:gap-3 mvx:items-center mvx:justify-between mvx:bg-secondary',
  ledgerConfirmItemValueText: 'ledger-confirm-item-value-text mvx:relative mvx:break-all',
  ledgerConfirmItemValueTextHighlighted: 'ledger-confirm-item-value-text-highlighted mvx:text-accent',
  ledgerConfirmFooter: 'ledger-confirm-footer mvx:mt-auto mvx:p-3 mvx:rounded-xl mvx:flex mvx:items-center mvx:gap-2 mvx:relative mvx:xs:min-h-16 mvx:before:absolute mvx:before:inset-0 mvx:before:-z-1 mvx:before:opacity-30 mvx:before:rounded-xl mvx:before:bg-ledger-warning',
  ledgerConfirmFooterIcon: 'ledger-confirm-footer-icon mvx:flex-1 mvx:min-w-6 mvx:p-0.5 mvx:text-ledger-warning-message',
  ledgerConfirmFooterDescription: 'ledger-confirm-footer-description mvx:text-xs mvx:text-secondary-text',
  ledgerConfirmFooterDescriptionSupport: 'ledger-confirm-footer-description-support mvx:underline mvx:cursor-pointer mvx:text-ledger-warning-message',

} satisfies Record<string, string>;

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
