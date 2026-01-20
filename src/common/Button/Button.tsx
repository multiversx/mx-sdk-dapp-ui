import { h } from '@stencil/core';

import styles from './button.styles';
import { ButtonSizeEnum, ButtonVariantEnum } from './button.types';

interface ButtonPropsType {
  'class'?: string;
  'data-testid'?: string;
  'disabled'?: boolean;
  'size'?: `${ButtonSizeEnum}`;
  'variant'?: `${ButtonVariantEnum}`;
  'onClick'?: (event: MouseEvent) => void;
}

export function Button(
  {
    'class': className = '',
    'data-testid': dataTestId = '',
    disabled = false,
    size = 'large',
    variant = 'primary',
    onClick,
  }: ButtonPropsType,
  children?: any,
) {
  return (
    <button
      data-testid={dataTestId}
      onClick={onClick}
      disabled={disabled}
      class={{
        [styles.button]: true,
        [styles.buttonDisabled]: disabled,
        [size]: Boolean(size),
        [styles.buttonLarge]: size === ButtonSizeEnum.large,
        [styles.buttonSmall]: size === ButtonSizeEnum.small,
        [variant]: Boolean(variant),
        [styles.buttonPrimary]: variant === ButtonVariantEnum.primary,
        [styles.buttonSecondary]: variant === ButtonVariantEnum.secondary,
        [styles.buttonSecondarySmall]: variant === ButtonVariantEnum.secondary && size === ButtonSizeEnum.small,
        [styles.buttonNeutral]: variant === ButtonVariantEnum.neutral,
        [className]: Boolean(className),
      }}
    >
      {children}
    </button>
  );
}
