import { h } from '@stencil/core';

import { InvalidFormatAmount, ValidFormatAmount } from './components';

interface FormatAmountPropsType {
  class?: string;
  'data-testid'?: string;
  isValid: boolean;
  label?: string;
  labelClass?: string;
  showLabel?: boolean;
  valueDecimal: string;
  valueInteger: string;
  decimalClass?: string;
}

export function FormatAmount({
  class: className,
  'data-testid': dataTestId,
  isValid,
  label,
  labelClass,
  showLabel = true,
  valueDecimal,
  valueInteger,
  decimalClass,
}: FormatAmountPropsType) {

  if (isValid) {
    return <ValidFormatAmount 
      data-testid={dataTestId} 
      class={className} 
      valueInteger={valueInteger} 
      valueDecimal={valueDecimal} 
      decimalClass={decimalClass} 
      showLabel={showLabel} 
      label={label} 
      labelClass={labelClass} 
    />;
  }

  return <InvalidFormatAmount data-testid={dataTestId} class={className} />;
}
