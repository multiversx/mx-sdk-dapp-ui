import type { IndexedAccountType } from 'types/address-table.types';

interface GetLedgerAddressByIndexType {
  accounts?: IndexedAccountType[];
  selectedIndex: number;
}

export const getLedgerAddressByIndex = ({ accounts, selectedIndex }: GetLedgerAddressByIndexType) =>
  accounts?.find(({ index }) => index === selectedIndex)?.address || '';
