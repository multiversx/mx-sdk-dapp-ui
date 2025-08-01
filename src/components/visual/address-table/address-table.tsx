import type { EventEmitter } from '@stencil/core';
import { Component, Event, h, Prop } from '@stencil/core';
import classNames from 'classnames';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';
import type { IAddressTableData, IndexedAccountType } from 'types/address-table.types';

const TOTAL_ADDRESSES_COUNT = 5000;

@Component({
  tag: 'mvx-address-table',
  styleUrl: 'address-table.scss',
  shadow: true,
})
export class AddressTable {
  @Prop() accountScreenData: IAddressTableData;
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

  private processLedgerAddressIndex(accountDerivation: IndexedAccountType) {
    return Number(accountDerivation.index + 1).toLocaleString();
  }

  render() {
    const isPageChanging = this.accountScreenData.isLoading;
    const isAddressesLoadingInitially = this.accountScreenData.accounts.length === 0;
    const totalPages = Math.ceil(TOTAL_ADDRESSES_COUNT / this.accountScreenData.addressesPerPage);
    const isSelectedWalletOnPage = this.accountScreenData.accounts.some(
      accountDerivation => accountDerivation.index === this.selectedIndex,
    );
    const isAccessWalletDisabled = !isSelectedWalletOnPage && !isPageChanging;
    const lastIndexOfPage = this.accountScreenData.startIndex + this.accountScreenData.addressesPerPage;
    const isSingleDigitIndex = lastIndexOfPage <= 10;
    const isIndexBelowOneHundred = !isSingleDigitIndex && lastIndexOfPage < 100;
    const isIndexInTheHundreds = !isIndexBelowOneHundred && !isSingleDigitIndex && lastIndexOfPage < 1000;
    const isIndexInTheThousands = lastIndexOfPage >= 1000;

    const addressClasses: Record<string, string> = {
      pagination: 'mvx:relative mvx:z-1',
      buttonTooltip: 'mvx:absolute mvx:top-0 mvx:h-12 mvx:left-0 mvx:right-0',
      preloaderItem:
        'mvx:h-16! mvx:border mvx:border-solid mvx:border-transparent mvx:rounded-lg! mvx:flex mvx:items-center mvx:w-full! mvx:p-4',
      preloaderItemCheckbox: 'mvx:h-4! mvx:mr-2 mvx:min-w-4! mvx:w-4! mvx:rounded-full! mvx:bg-preloader!',
      preloaderItemAddress: 'mvx:w-40! mvx:h-4! mvx:bg-preloader! mvx:rounded-lg! mvx:mr-auto',
      preloaderItemBalance: 'mvx:w-24! mvx:h-4! mvx:bg-preloader! mvx:rounded-lg! mvx:ml-2',
      preloaderItemIndex: classNames('mvx:mr-2 mvx:h-4! mvx:bg-preloader! mvx:rounded-lg!', {
        'mvx:w-9!': isSingleDigitIndex,
        'mvx:w-10!': isIndexBelowOneHundred,
        'mvx:w-13!': isIndexInTheHundreds,
        'mvx:w-17!': isIndexInTheThousands,
      }),
    };

    if (isAddressesLoadingInitially) {
      return <mvx-ledger-intro isAwaiting={true} />;
    }

    return (
      <div class="address-table">
        <div class="address-table-label-wrapper">
          <div class="address-table-label">Choose the wallet you want to access</div>
        </div>

        <div class="address-table-wrapper">
          <div class={{ 'address-table-preloader': true, 'visible': isPageChanging }}>
            {Array.from({ length: this.accountScreenData.addressesPerPage }, () => (
              <mvx-preloader class={classNames('address-table-preloader-item', addressClasses.preloaderItem)}>
                <mvx-preloader
                  class={classNames('address-table-preloader-item-checkbox', addressClasses.preloaderItemCheckbox)}
                />
                <mvx-preloader
                  class={classNames('address-table-preloader-item-index', addressClasses.preloaderItemIndex)}
                />
                <mvx-preloader
                  class={classNames('address-table-preloader-item-address', addressClasses.preloaderItemAddress)}
                />
                <mvx-preloader
                  class={classNames('address-table-preloader-item-balance', addressClasses.preloaderItemBalance)}
                />
              </mvx-preloader>
            ))}
          </div>

          <div class={{ 'address-table-list': true, 'visible': !isPageChanging }}>
            {this.accountScreenData.accounts.map(accountDerivation => (
              <div
                class={{
                  'address-table-list-item': true,
                  'checked': accountDerivation.index === this.selectedIndex,
                }}
                data-testid={`${DataTestIdsEnum.addressTableItem}-${accountDerivation.address}`}
                onClick={this.handleSelectAccount(accountDerivation.index)}
              >
                <div
                  class={{
                    'address-table-list-item-checkbox': true,
                    'checked': accountDerivation.index === this.selectedIndex,
                  }}
                />
                <div
                  class={{
                    'address-table-list-item-index': true,
                    'checked': accountDerivation.index === this.selectedIndex,
                    'narrow': isSingleDigitIndex,
                    'middle': isIndexBelowOneHundred,
                    'larger': isIndexInTheHundreds,
                    'largest': isIndexInTheThousands,
                  }}
                >
                  #{this.processLedgerAddressIndex(accountDerivation)}
                </div>

                <mvx-trim text={accountDerivation.address} class="address-table-list-item-address" />
                <div class="address-table-list-item-balance">{accountDerivation.usdValue}</div>
              </div>
            ))}
          </div>
        </div>

        <div class="address-table-pagination">
          <mvx-pagination
            totalPages={totalPages}
            isDisabled={isPageChanging}
            class={addressClasses.pagination}
            onPageChange={(event: CustomEvent) => this.handlePageChange(event)}
            currentPage={Math.floor(this.accountScreenData.startIndex / this.accountScreenData.addressesPerPage) + 1}
          />
        </div>

        <div class="address-table-button-wrapper">
          {isAccessWalletDisabled && (
            <div class="address-table-button-tooltip-wrapper">
              <mvx-tooltip
                trigger={<div class={{ 'address-table-button-tooltip': true, [addressClasses.buttonTooltip]: true }} />}
              >
                You have to select a wallet from the list that you want to access.
              </mvx-tooltip>
            </div>
          )}

          <button
            data-testid={DataTestIdsEnum.confirmBtn}
            onClick={this.handleAccessWallet.bind(this)}
            class={{ 'address-table-button': true, 'loading': isPageChanging, 'disabled': isAccessWalletDisabled }}
          >
            <span class="address-table-button-label">{isPageChanging ? 'Loading Wallets...' : 'Access Wallet'}</span>
            {isPageChanging && <mvx-spinner-icon />}
          </button>
        </div>
      </div>
    );
  }
}
