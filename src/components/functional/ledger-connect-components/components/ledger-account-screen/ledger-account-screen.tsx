import type { EventEmitter } from '@stencil/core';
import { Component, Event, Fragment, h, Prop } from '@stencil/core';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import { renderAccounts } from '../../helpers/renderAccounts';
import type { IAccountScreenData } from '../../ledger-connect.types';

@Component({
  tag: 'mvx-ledger-account-screen',
  styleUrl: 'ledger-account-screen.scss',
  shadow: true,
})
export class LedgerAccountScreen {
  @Prop() accountScreenData: IAccountScreenData;
  @Prop() selectedIndex: number;
  @Event() selectAccount: EventEmitter;
  @Event() nextPage: EventEmitter;
  @Event() prevPage: EventEmitter;
  @Event() accessWallet: EventEmitter;

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
              <button onClick={() => this.nextPage.emit()} data-testid={DataTestIdsEnum.nextBtn} class="navigation-button">
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
