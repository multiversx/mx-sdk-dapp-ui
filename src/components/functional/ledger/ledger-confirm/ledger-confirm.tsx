import { Component, h, Prop } from '@stencil/core';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import type { IConfirmScreenData } from '../ledger-flow/ledger-flow.types';

interface LedgerConfirmationItem {
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
    const ledgerConfirmationItems: LedgerConfirmationItem[] = [
      { label: this.confirmScreenData.confirmAddressText, value: this.confirmScreenData.selectedAddress, explorerLink: '' },
      { label: this.confirmScreenData.authText, value: this.confirmScreenData.data, highlighted: true },
    ];

    return (
      <div data-testid={DataTestIdsEnum.ledgerConfirmAddress} class="ledger-confirm">
        <div class="ledger-confirm-items">
          {ledgerConfirmationItems.map(ledgerConfirmationItem => (
            <div class="ledger-confirm-item">
              <div class="ledger-confirm-item-label">{ledgerConfirmationItem.label}</div>
              <div class="ledger-confirm-item-value">
                <div class="ledger-confirm-item-value-text">{ledgerConfirmationItem.value}</div>
                {ledgerConfirmationItem.explorerLink && <mvx-explorer-link link={ledgerConfirmationItem.explorerLink} class="ledger-confirm-item-value-explorer" />}
              </div>
            </div>
          ))}
        </div>

        <div class="address-footer">
          <div>Select Approve on your device to confirm.</div>
          <div>
            Or, if it does not match, close this page and{' '}
            <a href="https://help.multiversx.com/en/" target="_blank" rel="noreferrer">
              contact support
            </a>
            .
          </div>
        </div>
      </div>
    );
  }
}
