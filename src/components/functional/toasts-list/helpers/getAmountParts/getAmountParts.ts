export const getAmountParts = (amount = '') => {
  if (amount == null) {
    return { amountInteger: '', amountDecimal: '', label: '' };
  }

  let [value, label = ''] = amount.split(' ');

  if (isNaN(Number(value?.replace(',', '')))) {
    return { amountInteger: '', amountDecimal: '', label };
  }

  const [amountInteger, amountDecimal] = value.split('.');

  return {
    amountInteger,
    amountDecimal: amountDecimal ? `.${amountDecimal}` : '',
    label,
  };
};
