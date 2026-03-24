import type { EventEmitter } from '@stencil/core';
import { Component, Event, h, Prop, State } from '@stencil/core';
import { ShardIcon } from 'assets/icons/shard-icon/shard-icon';
import { SpinnerIcon } from 'assets/icons/spinner-icon/spinner-icon';
import classNames from 'classnames';
import { Tooltip } from 'common/Tooltip/Tooltip';
import { Trim } from 'common/Trim/Trim';
import { LedgerIntro } from 'components/functional/ledger-connect/components/ledger-intro/ledger-intro';
import { Preloader } from 'components/visual/preloader/preloader';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';
import type { IAddressTableData, IndexedAccountType } from 'types/address-table.types';

import { Pagination } from './components/pagination/Pagination';

const TOTAL_ADDRESSES_COUNT = 5000;
const addressTableClasses: Record<string, string> = {
  button: 'mvx:w-full',
};

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

  @State() activeTooltipIndex: number | null = null;
  @State() isTooltipOpen: boolean = false;
  @State() pageValue: string = '';
  @State() isButtonTooltipVisible: boolean = false;
  @State() shardTooltipVisibility: Record<number, boolean> = {};

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

  private processLedgerAddressIndex(accountDerivation: IndexedAccountType) {
    return Number(accountDerivation.index + 1).toLocaleString();
  }

  private handlePaginationTooltipStatusChange = (index: number | null, isOpen: boolean) => {
    this.activeTooltipIndex = index;
    this.isTooltipOpen = isOpen;
    if (!isOpen) {
      this.pageValue = '';
    }
  };

  private handlePageValueChange = (value: string) => {
    this.pageValue = value;
  };

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
      preloaderItemShard:
        'address-table-preloader-item-shard mvx:h-4! mvx:mr-2 mvx:min-w-4! mvx:w-4! mvx:rounded-full! mvx:bg-preloader!',
      preloaderItemAddress: 'mvx:w-40! mvx:h-4! mvx:bg-preloader! mvx:rounded-lg! mvx:mr-auto',
      preloaderItemBalance: 'mvx:w-24! mvx:h-4! mvx:bg-preloader! mvx:rounded-lg! mvx:ml-2',
      preloaderItemIndex: classNames('mvx:mr-2 mvx:h-4! mvx:bg-preloader! mvx:rounded-lg!', {
        'mvx:min-w-9!': isSingleDigitIndex,
        'mvx:min-w-10!': isIndexBelowOneHundred,
        'mvx:min-w-13!': isIndexInTheHundreds,
        'mvx:min-w-17!': isIndexInTheThousands,
      }),
    };

    if (isAddressesLoadingInitially) {
      return <LedgerIntro isAwaiting={true} />;
    }

    return (
      <div class="address-table">
        <div class="address-table-label-wrapper" part="label-wrapper">
          <div class="address-table-label">Choose the wallet you want to access</div>
        </div>

        <div class="address-table-wrapper">
          <div class={{ 'address-table-preloader': true, 'visible': isPageChanging }}>
            {Array.from({ length: this.accountScreenData.addressesPerPage }, () => (
              <Preloader class={classNames('address-table-preloader-item', addressClasses.preloaderItem)}>
                <Preloader
                  class={classNames('address-table-preloader-item-checkbox', addressClasses.preloaderItemCheckbox)}
                />

                <Preloader class={classNames(addressClasses.preloaderItemShard)} />

                <Preloader
                  class={classNames('address-table-preloader-item-index', addressClasses.preloaderItemIndex)}
                />

                <Preloader
                  class={classNames('address-table-preloader-item-address', addressClasses.preloaderItemAddress)}
                />

                <Preloader
                  class={classNames('address-table-preloader-item-balance', addressClasses.preloaderItemBalance)}
                />
              </Preloader>
            ))}
          </div>

          <div class={{ 'address-table-list': true, 'visible': !isPageChanging }}>
            {this.accountScreenData.accounts.map(accountDerivation => {
              const isChecked = accountDerivation.index === this.selectedIndex;
              return (
                <div
                  data-testid={`${DataTestIdsEnum.check}_${accountDerivation.address}`}
                  onClick={this.handleSelectAccount(accountDerivation.index)}
                  class={{
                    'address-table-list-item': true,
                    'checked': isChecked,
                  }}
                >
                  <input
                    type="radio"
                    name="address-table-selection"
                    checked={isChecked}
                    class={{
                      'address-table-list-item-checkbox': true,
                      'checked': isChecked,
                    }}
                  />

                  <div
                    class={{
                      'address-table-list-item-index': true,
                      'checked': isChecked,
                      'narrow': isSingleDigitIndex,
                      'middle': isIndexBelowOneHundred,
                      'larger': isIndexInTheHundreds,
                      'largest': isIndexInTheThousands,
                    }}
                  >
                    #{this.processLedgerAddressIndex(accountDerivation)}
                    {accountDerivation.shard != null && (
                      <Tooltip
                        position={accountDerivation.index === this.accountScreenData.startIndex ? 'bottom' : 'top'}
                        trigger={
                          <ShardIcon shard={accountDerivation.shard} class="address-table-list-item-shard-icon" />
                        }
                        isTooltipVisible={Boolean(this.shardTooltipVisibility[accountDerivation.index])}
                        onVisibilityChange={isVisible => {
                          this.shardTooltipVisibility = {
                            ...this.shardTooltipVisibility,
                            [accountDerivation.index]: isVisible,
                          };
                        }}
                      >
                        <div class="address-table-list-item-shard-tooltip">Shard {accountDerivation.shard}</div>
                      </Tooltip>
                    )}
                  </div>

                  <Trim text={accountDerivation.address} class="address-table-list-item-address" />
                  <div class="address-table-list-item-balance">{accountDerivation.usdValue}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div class="address-table-pagination" part="pagination-wrapper">
          <Pagination
            totalPages={totalPages}
            isDisabled={isPageChanging}
            class={addressClasses.pagination}
            onPageChange={(page: number) => this.pageChange.emit(page)}
            currentPage={Math.floor(this.accountScreenData.startIndex / this.accountScreenData.addressesPerPage) + 1}
            activeTooltipIndex={this.activeTooltipIndex}
            isTooltipOpen={this.isTooltipOpen}
            onTooltipStatusChange={this.handlePaginationTooltipStatusChange}
            pageValue={this.pageValue}
            onPageValueChange={this.handlePageValueChange}
          />
        </div>

        <div class="address-table-button-wrapper">
          {isAccessWalletDisabled && (
            <div class="address-table-button-tooltip-wrapper">
              <Tooltip
                trigger={<div class={{ 'address-table-button-tooltip': true, [addressClasses.buttonTooltip]: true }} />}
                isTooltipVisible={this.isButtonTooltipVisible}
                onVisibilityChange={isVisible => {
                  this.isButtonTooltipVisible = isVisible;
                }}
              >
                You have to select a wallet from the list that you want to access.
              </Tooltip>
            </div>
          )}

          <mvx-button
            data-testid={DataTestIdsEnum.confirmBtn}
            onButtonClick={this.handleAccessWallet.bind(this)}
            disabled={isPageChanging || isAccessWalletDisabled}
            class={classNames('address-table-button', addressTableClasses.button)}
            exportparts="button: access-button"
          >
            <span class="address-table-button-label">{isPageChanging ? 'Loading Wallets...' : 'Access Wallet'}</span>
            {isPageChanging && <SpinnerIcon />}
          </mvx-button>
        </div>
      </div>
    );
  }
}
