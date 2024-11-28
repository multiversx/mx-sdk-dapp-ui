import { h } from '@stencil/core';
import { ILedgerAccount } from '../ledger-connect-modal.types';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

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
        <span>Address</span>
        <span>Balance</span>
        <span>#</span>
      </div>
      {shownAccounts.map(account => (
        <div class="account-row" onClick={() => onSelectAccount(account.index)}>
          <input type="radio" name="account" checked={account.index === selectedIndex} value={account.index} />
          <span class="address">{trimAddress(account.address)}</span>
          <span class="balance">{account.balance}</span>
          <span class="index">{account.index}</span>
        </div>
      ))}
    </div>
  );
};
