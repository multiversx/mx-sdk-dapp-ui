export interface IAccount {
  address: string;
  balance: string;
  usdValue?: string;
  index: number;
}

export interface IAccountScreenData {
  accounts: IAccount[];
  startIndex: number;
  addressesPerPage: number;
  isLoading: boolean;
}
