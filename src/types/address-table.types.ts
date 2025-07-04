export interface IndexedAccountType {
  address: string;
  balance: string;
  usdValue?: string;
  index: number;
}

export interface IAddressTableData {
  accounts: IndexedAccountType[];
  startIndex: number;
  addressesPerPage: number;
  isLoading: boolean;
}
