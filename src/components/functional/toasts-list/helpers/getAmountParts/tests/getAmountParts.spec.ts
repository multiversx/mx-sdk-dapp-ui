import { getAmountParts } from '../getAmountParts';

describe('getAmountParts', () => {
  it('should return empty when amount is undefined', () => {
    const amountParts = getAmountParts(undefined);
    expect(amountParts).toEqual({
      amountInteger: '',
      amountDecimal: '',
      label: '',
    });
  });

  it('should return empty when amount is null', () => {
    const amountParts = getAmountParts(null);
    expect(amountParts).toEqual({
      amountInteger: '',
      amountDecimal: '',
      label: '',
    });
  });

  it('should return empty when amount is an empty string', () => {
    const amountParts = getAmountParts('');
    expect(amountParts).toEqual({
      amountInteger: '',
      amountDecimal: '',
      label: '',
    });
  });

  it('should return empty when amount is a wrong string', () => {
    const amountParts = getAmountParts('aaaaa');
    expect(amountParts).toEqual({
      amountInteger: '',
      amountDecimal: '',
      label: '',
    });
  });

  it('should return empty value and correct label when amount has only correct label', () => {
    const amountParts = getAmountParts('bbbb xEGLD');
    expect(amountParts).toEqual({
      amountInteger: '',
      amountDecimal: '',
      label: 'xEGLD',
    });
  });

  it('should return correct amount when amount is a correct string with separation dot', () => {
    const amountParts = getAmountParts('0.1 xEGLD');
    expect(amountParts).toEqual({
      amountInteger: '0',
      amountDecimal: '.1',
      label: 'xEGLD',
    });
  });

  it('should return correct integer value when amount is a correct string without separation dot', () => {
    const amountParts = getAmountParts('9999 xEGLD');
    expect(amountParts).toEqual({
      amountInteger: '9999',
      amountDecimal: '',
      label: 'xEGLD',
    });
  });
});
