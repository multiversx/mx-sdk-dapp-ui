import type { ITransactionListItem } from 'components/visual/transaction-list-item/transaction-list-item.types';

export const getAmount = (transaction: ITransactionListItem) => {
  const [amount, label] = transaction.amount.split(' ');
  const [amountInteger, amountDecimal] = amount.split('.');

  return {
    amountInteger,
    amountDecimal: `.${amountDecimal}`,
    label,
  };
};
