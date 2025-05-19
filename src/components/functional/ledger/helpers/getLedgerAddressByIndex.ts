import type { ILedgerAccount } from '../ledger.types';

interface GetLedgerAddressByIndexType {
  accounts?: ILedgerAccount[];
  selectedIndex: number;
}

export const getLedgerAddressByIndex = ({ accounts, selectedIndex }: GetLedgerAddressByIndexType) => accounts?.find(({ index }) => index === selectedIndex)?.address || '';
