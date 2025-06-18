import { Component, h, Prop } from '@stencil/core';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import type { IConfirmScreenData } from '../../ledger-connect.types';

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
      <div data-testid={DataTestIdsEnum.ledgerConfirmAddress} class="ledger-confirm">
        <div class="ledger-confirm-items">
          {ledgerConfirmationItems.map(ledgerConfirmationItem => (
            <div class="ledger-confirm-item">
              <div class="ledger-confirm-item-label">{ledgerConfirmationItem.label}</div>

              <div class="ledger-confirm-item-value">
                <div
                  class={{
                    'ledger-confirm-item-value-text': true,
                    'highlighted': Boolean(ledgerConfirmationItem.highlighted),
                  }}
                >
                  {ledgerConfirmationItem.value}
                </div>

                <div class="ledger-confirm-item-value-actions">
                  <mvx-copy-button
                    text={ledgerConfirmationItem.value}
                    class="ledger-confirm-item-value-copy"
                    iconClass="ledger-confirm-item-value-copy-icon"
                  />

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

        <div class="ledger-confirm-footer">
          <mvx-triangular-warning-icon class="ledger-confirm-footer-icon" />
          <div class="ledger-confirm-footer-description">
            If the address does not mach close this page and contact support.
          </div>

          <a
            target="_blank"
            rel="noreferrer"
            href="https://help.multiversx.com/en/"
            class="ledger-confirm-footer-button"
          >
            Contact Support
          </a>
        </div>
      </div>
    );
  }
}
