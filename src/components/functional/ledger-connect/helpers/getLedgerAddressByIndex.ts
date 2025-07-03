import type { IIndexedAccount } from 'types/addresses-table.types';

interface GetLedgerAddressByIndexType {
  accounts?: IIndexedAccount[];
  selectedIndex: number;
}

export const getLedgerAddressByIndex = ({ accounts, selectedIndex }: GetLedgerAddressByIndexType) =>
  accounts?.find(({ index }) => index === selectedIndex)?.address || '';
