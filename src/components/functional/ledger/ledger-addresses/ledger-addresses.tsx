import type { EventEmitter } from '@stencil/core';
import { Component, Event, h, Prop } from '@stencil/core';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import type { IAccountScreenData } from '../ledger-flow/ledger-flow.types';
import { TOTAL_ADDRESSES_COUNT } from './ledger-addresses.config';

@Component({
  tag: 'mvx-ledger-addresses',
  styleUrl: 'ledger-addresses.scss',
  shadow: true,
})
export class LedgerAddresses {
  @Prop() accountScreenData: IAccountScreenData;
  @Prop() selectedIndex: number;

  @Event() accessWallet: EventEmitter;
  @Event() selectAccount: EventEmitter;
  @Event() pageChange: EventEmitter<number>;

  handleAccessWallet(event: MouseEvent) {
    event.preventDefault();
    this.accessWallet.emit();
  }

  handleSelectAccount(accountDerivationIndex: number) {
    return (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      this.selectAccount.emit(accountDerivationIndex);
    };
  }

  render() {
    const isAddressesLoading = this.accountScreenData.isLoading || this.accountScreenData.accounts.length === 0;
    const totalPages = Math.ceil(TOTAL_ADDRESSES_COUNT / this.accountScreenData.addressesPerPage);

    console.log({ selectedIndex: this.selectedIndex });

    if (isAddressesLoading) {
      return <mvx-ledger-intro isAwaiting={true} />;
    }

    return (
      <div class="ledger-addresses">
        <div class="ledger-addresses-label">Choose the wallet you want to access</div>

        <div class="ledger-addresses-list">
          {this.accountScreenData.accounts.map((accountDerivation, accountDerivationIndex) => (
            <div
              class={{ 'ledger-addresses-list-item': true, 'checked': accountDerivation.index === this.selectedIndex }}
              onClick={this.handleSelectAccount(accountDerivation.index)}
            >
              <div class={{ 'ledger-addresses-list-item-checkbox': true, 'checked': accountDerivation.index === this.selectedIndex }} />
              <div class={{ 'ledger-addresses-list-item-index': true, 'checked': accountDerivation.index === this.selectedIndex }}>
                #{accountDerivationIndex + 1 + this.accountScreenData.startIndex}
              </div>

              <mvx-trim-text text={accountDerivation.address} class="ledger-addresses-list-item-address" />
              <div class="ledger-addresses-list-item-balance">$241,442,49.49</div>
            </div>
          ))}
        </div>

        <mvx-pagination
          totalPages={totalPages}
          class="ledger-address-pagination"
          currentPage={this.accountScreenData.startIndex + 1}
          onPageChange={(event: CustomEvent) => this.pageChange.emit(event.detail)}
        />

        <button class="ledger-addresses-button" data-testid={DataTestIdsEnum.confirmBtn} onClick={this.handleAccessWallet.bind(this)}>
          Access Wallet
        </button>
      </div>
    );
  }
}
