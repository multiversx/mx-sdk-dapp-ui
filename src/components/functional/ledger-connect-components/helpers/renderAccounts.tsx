import { h } from '@stencil/core';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import type { ILedgerAccount } from '../ledger-connect.types';

export function trimAddress(s: string): string {
  const firstFour = s.slice(0, 6);
  const lastFour = s.slice(-6);
  return `${firstFour}...${lastFour}`;
}

interface IRenderAccountsProps {
  shownAccounts?: ILedgerAccount[];
  onSelectAccount: (_index: number) => void;
  selectedIndex?: number;
}
export const renderAccounts = ({ shownAccounts = [], onSelectAccount, selectedIndex }: IRenderAccountsProps) => {
  return (
    <div class="account-list" data-testid={DataTestIdsEnum.addressTableContainer}>
      <div class="account-header">
        <div class="account-header-item">Address</div>
        <div class="account-header-item">Balance</div>
        <div class="account-header-item">#</div>
      </div>
      {shownAccounts.map(account => (
        <div class="account-row" onClick={() => onSelectAccount(account.index)}>
          <div class="address-row-item-data ">
            <input type="radio" name="account" checked={account.index === selectedIndex} value={account.index} />
            <span class="address">{trimAddress(account.address)}</span>
          </div>
          <div class="address-row-item-data">{account.balance}</div>
          <div class="address-row-item-data">{account.index}</div>
        </div>
      ))}
    </div>
  );
};
