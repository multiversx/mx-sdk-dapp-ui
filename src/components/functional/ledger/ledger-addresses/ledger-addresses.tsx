import type { EventEmitter } from '@stencil/core';
import { Component, Event, h, Prop } from '@stencil/core';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import type { IAccountScreenData } from '../ledger.types';

const TOTAL_ADDRESSES_COUNT = 5000;
const ledgerAddressesClasses: Record<string, string> = {
  tooltip: 'mvx:absolute mvx:top-0 mvx:h-12 mvx:left-0 mvx:right-0',
};

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
    return (event: MouseEvent) => {
      event.preventDefault();
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
    const isSelectedWalletOnPage = this.accountScreenData.accounts.some(accountDerivation => accountDerivation.index === this.selectedIndex);
    const isAccessWalletDisabled = !isSelectedWalletOnPage && !isPageChanging;

    if (isAddressesLoadingInitially) {
      return <mvx-ledger-intro isAwaiting={true} />;
    }

    return (
      <div class="ledger-addresses">
        <div class="ledger-addresses-label">Choose the wallet you want to access</div>

        <div class="ledger-addresses-wrapper">
          <div class={{ 'ledger-addresses-preloader': true, 'visible': isPageChanging }}>
            {Array.from({ length: this.accountScreenData.addressesPerPage }, () => (
              <mvx-preloader class="ledger-addresses-preloader-item">
                <mvx-preloader class="ledger-addresses-preloader-item-checkbox" />
                <mvx-preloader class="ledger-addresses-preloader-item-index" />
                <mvx-preloader class="ledger-addresses-preloader-item-address" />
                <mvx-preloader class="ledger-addresses-preloader-item-balance" />
              </mvx-preloader>
            ))}
          </div>

          <div class={{ 'ledger-addresses-list': true, 'visible': !isPageChanging }}>
            {this.accountScreenData.accounts.map(accountDerivation => (
              <div
                class={{ 'ledger-addresses-list-item': true, 'checked': accountDerivation.index === this.selectedIndex }}
                onClick={this.handleSelectAccount(accountDerivation.index)}
              >
                <div class={{ 'ledger-addresses-list-item-checkbox': true, 'checked': accountDerivation.index === this.selectedIndex }} />
                <div class={{ 'ledger-addresses-list-item-index': true, 'checked': accountDerivation.index === this.selectedIndex }}>#{accountDerivation.index + 1}</div>

                <mvx-trim-text text={accountDerivation.address} class="ledger-addresses-list-item-address" />
                <div class="ledger-addresses-list-item-balance">{accountDerivation.usdValue}</div>
              </div>
            ))}
          </div>
        </div>

        <mvx-pagination
          totalPages={totalPages}
          isDisabled={isPageChanging}
          onPageChange={(event: CustomEvent) => this.handlePageChange(event)}
          currentPage={this.accountScreenData.startIndex / this.accountScreenData.addressesPerPage + 1}
        />

        <div class="ledger-addresses-button-wrapper">
          {isAccessWalletDisabled && (
            <div class="ledger-addresses-button-tooltip-wrapper">
              <mvx-tooltip trigger={<div class={{ 'ledger-addresses-button-tooltip': true, [ledgerAddressesClasses.tooltip]: true }} />}>
                You have to select a wallet from the list that you want to access.
              </mvx-tooltip>
            </div>
          )}

          <button
            data-testid={DataTestIdsEnum.confirmBtn}
            onClick={this.handleAccessWallet.bind(this)}
            class={{ 'ledger-addresses-button': true, 'loading': isPageChanging, 'disabled': isAccessWalletDisabled }}
          >
            <span class="ledger-addresses-button-label">{isPageChanging ? 'Loading Wallets...' : 'Access Wallet'}</span>
            {isPageChanging && <mvx-spinner-icon />}
          </button>
        </div>
      </div>
    );
  }
}
