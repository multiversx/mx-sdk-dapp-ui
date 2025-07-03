export interface IIndexedAccount {
  address: string;
  balance: string;
  usdValue?: string;
  index: number;
}

export interface IAccountScreenData {
  accounts: IIndexedAccount[];
  startIndex: number;
  addressesPerPage: number;
  isLoading: boolean;
}
