import type { ILedgerAccount } from '../ledger-connect.types';

export const getLedgerAddressByIndex = ({ accounts, selectedIndex }: { accounts?: ILedgerAccount[]; selectedIndex: number }) => {
  return accounts?.find(({ index }) => index === selectedIndex)?.address || '';
};
