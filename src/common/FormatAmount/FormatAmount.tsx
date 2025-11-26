import { InvalidFormatAmount, ValidFormatAmount } from './components';

interface FormatAmountPropsType {
  class?: string;
  dataTestId?: string;
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
  dataTestId,
  isValid,
  label,
  labelClass,
  showLabel = true,
  valueDecimal,
  valueInteger,
  decimalClass,
}: FormatAmountPropsType) {
  return isValid
    ? ValidFormatAmount({
        dataTestId,
        class: className,
        valueInteger,
        valueDecimal,
        decimalClass,
        showLabel,
        label,
        labelClass,
      })
    : InvalidFormatAmount({ dataTestId, class: className });
}
