import { IconNamesEnum } from 'common/Icon/icon.types';

import type { TransactionAccountType, TransactionRowType } from '../../transactions-table.type';

const SENDER = 'erd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th';
const RECEIVER = 'erd1qqqqqqqqqqqqqpgqzqvm5ywqqf524efwrhr039tjs29w0qltkklsa05pk7';
const BASE_HASH = 'd1c9f0b0e8a44a5d9c2a1f3b7e6d5c4b3a291807f6e5d4c3b2a190807f6e5d4c';

const createAccount = (overrides: Partial<TransactionAccountType> = {}): TransactionAccountType => ({
  address: SENDER,
  description: '',
  isContract: false,
  isTokenLocked: false,
  link: `https://devnet-explorer.multiversx.com/accounts/${SENDER}`,
  name: '',
  shard: 'Shard 1',
  shardLink: 'https://devnet-explorer.multiversx.com/shards/1',
  showLink: true,
  ...overrides,
});

export const createTransactionRow = (overrides: Partial<TransactionRowType> = {}): TransactionRowType => ({
  txHash: BASE_HASH,
  link: `https://devnet-explorer.multiversx.com/transactions/${BASE_HASH}`,
  age: { timeAgo: '2 mins ago', tooltip: 'Jan 1, 2025 12:00:00 AM' },
  direction: 'out',
  method: { name: 'transfer', actionDescription: 'Transfer EGLD' },
  iconInfo: { icon: IconNamesEnum.circleCheck, tooltip: 'Success' },
  sender: createAccount(),
  receiver: createAccount({
    address: RECEIVER,
    isContract: true,
    name: 'xExchange',
    link: `https://devnet-explorer.multiversx.com/accounts/${RECEIVER}`,
    shard: 'Shard 2',
  }),
  value: {
    egldLabel: 'EGLD',
    valueInteger: '1',
    valueDecimal: '250000',
    showFormattedAmount: true,
    ticker: 'EGLD',
  },
  ...overrides,
});

export const createTransactionRows = (count: number): TransactionRowType[] =>
  Array.from({ length: count }, (_, index) => {
    const txHash = `${index}`.padStart(2, '0') + BASE_HASH.slice(2);

    return createTransactionRow({
      txHash,
      link: `https://devnet-explorer.multiversx.com/transactions/${txHash}`,
      age: { timeAgo: `${index + 1} mins ago`, tooltip: 'Jan 1, 2025 12:00:00 AM' },
      direction: index % 2 === 0 ? 'out' : 'in',
      iconInfo:
        index % 3 === 0
          ? { icon: IconNamesEnum.circleCheck, tooltip: 'Success' }
          : { icon: IconNamesEnum.hourglass, tooltip: 'Pending' },
      value: {
        egldLabel: 'EGLD',
        valueInteger: `${index + 1}`,
        valueDecimal: '500000',
        showFormattedAmount: true,
        ticker: 'EGLD',
      },
    });
  });
