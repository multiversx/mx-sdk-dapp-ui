import type { IAccount } from 'types/addresses-table.types';

interface GetLedgerAddressByIndexType {
  accounts?: IAccount[];
  selectedIndex: number;
}

export const getLedgerAddressByIndex = ({ accounts, selectedIndex }: GetLedgerAddressByIndexType) =>
  accounts?.find(({ index }) => index === selectedIndex)?.address || '';
