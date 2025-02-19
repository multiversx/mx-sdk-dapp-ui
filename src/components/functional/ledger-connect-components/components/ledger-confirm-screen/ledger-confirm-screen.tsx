import { Component, h, Prop } from '@stencil/core';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import type { IConfirmScreenData } from '../../ledger-connect.types';

@Component({
  tag: 'ledger-confirm-screen',
  styleUrl: 'ledger-confirm-screen.scss',
  shadow: true,
})
export class LedgerConnectConfirmBody {
  @Prop() confirmScreenData: IConfirmScreenData;

  render() {
    return (
      <div data-testid={DataTestIdsEnum.ledgerConfirmAddress} class="address-section">
        <div class="address-section">
          <div class="address-description">{this.confirmScreenData.confirmAddressText}</div>
          <div class="address-header">{this.confirmScreenData.selectedAddress}</div>
        </div>
        <div class="address-section">
          <div class="address-description">{this.confirmScreenData?.authText}</div>
          <div class="address-data">{this.confirmScreenData?.data}</div>
          <div class="address-description">{this.confirmScreenData?.areShownText}</div>
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
