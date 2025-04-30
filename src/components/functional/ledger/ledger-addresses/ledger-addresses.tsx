import type { EventEmitter } from '@stencil/core';
import { Component, Event, h, Prop } from '@stencil/core';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import type { IAccountScreenData } from '../ledger.types';

const TOTAL_ADDRESSES_COUNT = 5000;

@Component({
  tag: 'mvx-ledger-addresses',
  styleUrl: 'ledger-addresses.scss',
  shadow: true,
})
export class LedgerAddresses {
  @Prop() accountScreenData: IAccountScreenData;
  @Prop() selectedIndex: number;

  @Event() accessWallet: EventEmitter;
  @Event({ bubbles: false, composed: false }) selectAccount: EventEmitter;
  @Event() pageChange: EventEmitter<number>;

  handleAccessWallet(event: MouseEvent) {
    event.preventDefault();
    this.accessWallet.emit();
  }

  handleSelectAccount(accountDerivationIndex: number) {
    return () => {
      this.selectAccount.emit(accountDerivationIndex);
    };
  }

  private handlePageChange(event: CustomEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.pageChange.emit(event.detail);
  }

  render() {
    const isPageChanging = this.accountScreenData.isLoading;
    const isAddressesLoadingInitially = this.accountScreenData.accounts.length === 0;
    const totalPages = Math.ceil(TOTAL_ADDRESSES_COUNT / this.accountScreenData.addressesPerPage);

    if (isAddressesLoadingInitially) {
      return <mvx-ledger-intro isAwaiting={true} />;
    }

    return (
      <div class="ledger-addresses">
        <div class="ledger-addresses-label">Choose the wallet you want to access</div>

        {isPageChanging ? (
          <div class="ledger-addresses-preloader">
            {Array.from({ length: this.accountScreenData.addressesPerPage }, () => (
              <mvx-preloader class="ledger-addresses-preloader-item">
                <mvx-preloader class="ledger-addresses-preloader-item-checkbox" />
                <mvx-preloader class="ledger-addresses-preloader-item-index" />
                <mvx-preloader class="ledger-addresses-preloader-item-address" />
                <mvx-preloader class="ledger-addresses-preloader-item-balance" />
              </mvx-preloader>
            ))}
          </div>
        ) : (
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
                <div class="ledger-addresses-list-item-balance">{accountDerivation.usdValue}</div>
              </div>
            ))}
          </div>
        )}

        <mvx-pagination
          totalPages={totalPages}
          isDisabled={isPageChanging}
          class="ledger-address-pagination"
          onPageChange={(event: CustomEvent) => this.handlePageChange(event)}
          currentPage={this.accountScreenData.startIndex / this.accountScreenData.addressesPerPage + 1}
        />

        <button class={{ 'ledger-addresses-button': true, 'disabled': isPageChanging }} data-testid={DataTestIdsEnum.confirmBtn} onClick={this.handleAccessWallet.bind(this)}>
          {isPageChanging ? 'Accessing Wallet...' : 'Access Wallet'}
        </button>
      </div>
    );
  }
}
