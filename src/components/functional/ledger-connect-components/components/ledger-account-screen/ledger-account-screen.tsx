import type { EventEmitter } from '@stencil/core';
import { Component, Event, Fragment, h, Prop } from '@stencil/core';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import { renderAccounts } from '../../helpers/renderAccounts';
import type { IAccountScreenData } from '../../ledger-connect.types';

@Component({
  tag: 'mvx-ledger-account-screen',
  styleUrl: 'ledger-account-screen.scss',
})
export class LedgerAccountScreen {
  @Prop() accountScreenData: IAccountScreenData;
  @Prop() selectedIndex: number;
  @Event() selectAccount: EventEmitter;
  @Event() nextPage: EventEmitter;
  @Event() prevPage: EventEmitter;
  @Event() goToPage: EventEmitter<number>;
  @Event() accessWallet: EventEmitter;

  private pageInputRef?: HTMLInputElement;

  handleGoToPage = () => {
    if (this.pageInputRef && this.pageInputRef.value) {
      const page = parseInt(this.pageInputRef.value);
      if (page >= 0) {
        this.goToPage.emit(page);
      }
    }
  };

  render() {
    const isSelectedIndexOnPage = this.accountScreenData.accounts.some(({ index }) => index === this.selectedIndex);
    const accountsList =
      this.accountScreenData.isLoading || this.accountScreenData.accounts.length === 0 ? (
        <mvx-generic-spinner data-testid={DataTestIdsEnum.ledgerLoading}></mvx-generic-spinner>
      ) : (
        renderAccounts({
          shownAccounts: this.accountScreenData.accounts,
          onSelectAccount: (index: number) => this.selectAccount.emit(index),
          selectedIndex: this.selectedIndex,
        })
      );

    return (
      <Fragment>
        {accountsList}
        {!this.accountScreenData.isLoading && this.accountScreenData.accounts.length !== 0 && (
          <Fragment>
            <div class="navigation">
              <button onClick={() => this.prevPage.emit()} disabled={this.accountScreenData.startIndex <= 0} data-testid={DataTestIdsEnum.prevBtn} class="navigation-button">
                {'< '} Prev
              </button>
              <input
                type="number"
                min="0"
                step="1"
                pattern="[0-9]*"
                inputmode="numeric"
                class="page-input"
                placeholder="Go to page"
                data-testid={DataTestIdsEnum.pageNumberInput}
                ref={el => (this.pageInputRef = el as HTMLInputElement)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    this.handleGoToPage();
                  }
                }}
              />
              <button onClick={() => this.handleGoToPage()} class="navigation-button page-go-button" data-testid={DataTestIdsEnum.goToPageBtn}>
                Go
              </button>
              <button
                onClick={() => {
                  console.log('nextPage emit in account screen');
                  this.nextPage.emit(1);
                }}
                data-testid={DataTestIdsEnum.nextBtn}
                class="navigation-button"
              >
                Next{' >'}
              </button>
            </div>
            <button data-testid={DataTestIdsEnum.confirmBtn} class="access-button" onClick={() => this.accessWallet.emit()} disabled={!isSelectedIndexOnPage}>
              Access Wallet
            </button>
          </Fragment>
        )}
      </Fragment>
    );
  }
}
