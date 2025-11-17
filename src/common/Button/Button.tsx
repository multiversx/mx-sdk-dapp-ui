import { h } from '@stencil/core';
import { ButtonSizeEnum, ButtonVariantEnum } from './button.types';

// prettier-ignore
const styles = {
    button: 'button mvx:flex mvx:items-center mvx:justify-center mvx:font-bold mvx:leading-none mvx:px-4 mvx:max-h-full mvx:rounded-xl mvx:cursor-pointer mvx:transition-all mvx:duration-200 mvx:ease-in-out mvx:gap-2',
    buttonLarge: 'button-large mvx:h-12 mvx:text-base mvx:px-6',
    buttonSmall: 'button-small mvx:h-10 mvx:text-xs mvx:rounded-xl',
    buttonPrimary: 'button-primary mvx:text-button-primary mvx:bg-button-bg-primary mvx:border mvx:border-button-bg-primary',
    buttonSecondary: 'button-secondary mvx:relative mvx:text-button-secondary mvx:border mvx:border-transparent mvx:after:absolute mvx:after:inset-0 mvx:after:rounded-lg mvx:after:opacity-40 mvx:after:transition-all mvx:after:duration-200 mvx:after:ease-in-out mvx:after:bg-button-bg-secondary mvx:after:content-[""] mvx:after:-z-1 mvx:hover:opacity-100 mvx:hover:text-button-primary mvx:hover:after:opacity-100 mvx:hover:after:bg-button-bg-primary',
    buttonSecondarySmall: 'button-secondary-small mvx:after:rounded-xl',
    buttonNeutral: 'button-neutral mvx:text-neutral-925 mvx:bg-white mvx:hover:opacity-75',
    buttonDisabled: 'button-disabled mvx:pointer-events-none mvx:bg-transparent mvx:cursor-default mvx:border mvx:border-secondary-text mvx:text-secondary-text mvx:hover:opacity-100'
} satisfies Record<string, string>;

interface ButtonPropsType {
    class?: string;
    dataTestId?: string;
    disabled?: boolean;
    size?: `${ButtonSizeEnum}`;
    variant?: `${ButtonVariantEnum}`;
    onClick?: (event: MouseEvent) => void;
}

export function Button({ class: className = '', dataTestId = '', disabled = false, size = 'large', variant = 'primary', onClick }: ButtonPropsType, children?: any) {
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
