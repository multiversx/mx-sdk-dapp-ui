import type { EventEmitter } from '@stencil/core';
import { Component, Event, h, Prop } from '@stencil/core';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import type { IAccountScreenData } from '../ledger-flow/ledger-flow.types';

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

  handleAccessWallet(event: MouseEvent) {
    event.preventDefault();
    this.accessWallet.emit();
  }

  render() {
    const isAddressesLoading = this.accountScreenData.isLoading || this.accountScreenData.accounts.length === 0;

    if (isAddressesLoading) {
      return <mvx-ledger-intro isAwaiting={true} />;
    }

    return (
      <div class="ledger-addresses">
        <div class="ledger-addresses-label">Choose the wallet you want to access</div>

        <button class="ledger-addresses-button" data-testid={DataTestIdsEnum.confirmBtn} onClick={this.handleAccessWallet.bind(this)}>
          Access Wallet
        </button>
      </div>
    );
  }
}
