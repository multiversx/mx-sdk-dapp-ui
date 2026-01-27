export interface IndexedAccountType {
  address: string;
  balance: string;
  usdValue?: string;
  index: number;
  shard?: number | null;
}

export interface IAddressTableData {
  accounts: IndexedAccountType[];
  startIndex: number;
  addressesPerPage: number;
  isLoading: boolean;
}
