export interface IndexedAccountType {
  address: string;
  balance: string;
  usdValue?: string;
  index: number;
}

export interface IAccountScreenData {
  accounts: IndexedAccountType[];
  startIndex: number;
  addressesPerPage: number;
  isLoading: boolean;
}
