import type { IAddressTableData } from 'types/address-table.types';

import type { IConfirmScreenData, IConnectScreenData, ILedgerConnectPanelData } from '../../ledger-connect.types';

const EXAMPLE_ADDRESS = 'erd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th';

export const createAccountScreenData = (overrides: Partial<IAddressTableData> = {}): IAddressTableData => ({
  startIndex: 0,
  addressesPerPage: 10,
  isLoading: false,
  accounts: Array.from({ length: 5 }, (_, index) => ({
    address: `erd1${index}${EXAMPLE_ADDRESS.slice(5)}`,
    balance: `${(index + 1) * 1.25} EGLD`,
    usdValue: `$${((index + 1) * 1.25 * 25).toFixed(2)}`,
    index,
    shard: index % 3,
  })),
  ...overrides,
});

export const createConnectScreenData = (overrides: Partial<IConnectScreenData> = {}): IConnectScreenData => ({
  disabled: false,
  ...overrides,
});

export const createConfirmScreenData = (overrides: Partial<IConfirmScreenData> = {}): IConfirmScreenData => ({
  selectedAddress: EXAMPLE_ADDRESS,
  confirmAddressText: 'Confirm the address on your Ledger device',
  authText: 'Check that the address matches the one shown on your device.',
  explorerLink: `https://devnet-explorer.multiversx.com/accounts/${EXAMPLE_ADDRESS}`,
  ...overrides,
});

export const createLedgerPanelData = (
  overrides: Partial<ILedgerConnectPanelData> = {},
): ILedgerConnectPanelData => ({
  connectScreenData: createConnectScreenData(),
  accountScreenData: null,
  confirmScreenData: null,
  ...overrides,
});
