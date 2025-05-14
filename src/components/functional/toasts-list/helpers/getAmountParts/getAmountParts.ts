export const getAmountParts = (amount = '') => {
  const [value, label] = amount.split(' ');
  const [amountInteger, amountDecimal] = value.split('.');

  return {
    amountInteger,
    amountDecimal: `.${amountDecimal}`,
    label,
  };
};
