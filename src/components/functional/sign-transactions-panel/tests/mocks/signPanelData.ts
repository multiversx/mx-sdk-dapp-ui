import { NftEnumType } from 'types/tokens.types';

import type { ISignTransactionsPanelCommonData, ISignTransactionsPanelData } from '../../sign-transactions-panel.types';
import { DecodeMethodEnum } from '../../sign-transactions-panel.types';

const RECEIVER = 'erd1qqqqqqqqqqqqqpgqzqvm5ywqqf524efwrhr039tjs29w0qltkklsa05pk7';
const SENDER = 'erd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th';
/** Inline so stories never depend on a network fetch. */
export const PLACEHOLDER_IMAGE = 'data:image/svg+xml;utf8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 32 32%22%3E%3Ccircle cx=%2216%22 cy=%2216%22 r=%2216%22 fill=%22%2323f7dd%22/%3E%3C/svg%3E';

const RAW_DATA = 'ESDTTransfer@5745474c442d626434643739@0de0b6b3a7640000';

export const createCommonData = (
  overrides: Partial<ISignTransactionsPanelCommonData> = {},
): ISignTransactionsPanelCommonData => ({
  receiver: RECEIVER,
  address: SENDER,
  username: 'alice',
  origin: 'https://devnet.xexchange.com',
  explorerLink: `https://devnet-explorer.multiversx.com/accounts/${RECEIVER}`,
  data: RAW_DATA,
  decodedData: {
    [DecodeMethodEnum.raw]: { displayValue: RAW_DATA, validationWarnings: [], highlight: null },
    [DecodeMethodEnum.text]: { displayValue: 'ESDTTransfer WEGLD-bd4d79 1', validationWarnings: [], highlight: null },
  },
  gasPrice: '0.000000001 EGLD',
  gasPriceOption: 1,
  gasPriceOptions: [
    { label: 'Standard', value: 1 },
    { label: 'Fast', value: 2 },
    { label: 'Faster', value: 3 },
  ],
  gasLimit: '4,200,000',
  transactionsCount: 1,
  currentIndex: 0,
  currentIndexToSign: 0,
  needsSigning: true,
  isEditable: true,
  egldLabel: 'EGLD',
  feeLimit: '0.0042 EGLD',
  feeInFiatLimit: '$0.09',
  providerName: 'MultiversX DeFi Wallet',
  highlight: null,
  scCall: null,
  ...overrides,
});

export const createSignPanelData = (overrides: Partial<ISignTransactionsPanelData> = {}): ISignTransactionsPanelData => ({
  isLoading: false,
  commonData: createCommonData(),
  tokenTransaction: {
    identifier: 'WEGLD-bd4d79',
    amount: '1.00',
    usdValue: '$25.10',
    imageURL: PLACEHOLDER_IMAGE,
  },
  nftTransaction: null,
  sftTransaction: null,
  ...overrides,
});

export const createEgldTransferData = (): ISignTransactionsPanelData =>
  createSignPanelData({
    commonData: createCommonData({ data: undefined, decodedData: undefined, tokenType: undefined }),
    tokenTransaction: { amount: '1.50', usdValue: '$37.65', identifier: 'EGLD' },
  });

export const createNftTransferData = (): ISignTransactionsPanelData =>
  createSignPanelData({
    commonData: createCommonData({ tokenType: NftEnumType.NonFungibleESDT }),
    tokenTransaction: null,
    nftTransaction: {
      amount: '1',
      identifier: 'MVXPUNK-1a2b3c-01',
      imageURL: PLACEHOLDER_IMAGE,
    },
  });
