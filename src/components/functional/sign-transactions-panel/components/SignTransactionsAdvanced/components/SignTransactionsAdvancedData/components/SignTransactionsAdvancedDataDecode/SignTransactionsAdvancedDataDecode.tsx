import { h } from '@stencil/core';
import classNames from 'classnames';
import { Icon } from 'common/Icon';
import { DecodeMethodEnum } from 'components/functional/sign-transactions-panel/sign-transactions-panel.types';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

// prettier-ignore
const styles = {
  signTransactionsAdvancedDataDecode: 'sign-transactions-advanced-data-decode mvx:relative mvx:flex mvx:justify-center mvx:items-end mvx:gap-1 mvx:px-3 mvx:pt-4 mvx:-mt-4 mvx:mb-2 mvx:w-22 mvx:cursor-pointer mvx:capitalize mvx:leading-none mvx:before:absolute mvx:before:left-0 mvx:before:right-0 mvx:before:top-2.5 mvx:before:h-6 mvx:before:opacity-90 mvx:before:rounded-3xl mvx:before:bg-select mvx:before:content-[""]',
  signTransactionsAdvancedDataDecodeLabel: 'sign-transactions-advanced-data-decode-label mvx:relative mvx:text-xs mvx:capitalize mvx:m-auto mvx:z-1 mvx:text-select-tx',
  signTransactionsAdvancedDataDecodeIcon: 'sign-transactions-advanced-data-decode-icon mvx:ml-auto mvx:flex mvx:w-4 mvx:h-2.5 mvx:text-secondary-text',
  icon: 'mvx:transition-all mvx:duration-200 mvx:ease-in-out mvx:relative mvx:h-3! mvx:w-auto!',
  iconRotated: 'mvx:rotate-90',
} satisfies Record<string, string>;

interface SignTransactionsAdvancedDataDecodePropsType {
  isToggled: boolean;
  currentDecodeMethod: DecodeMethodEnum;
}

export function SignTransactionsAdvancedDataDecode({ isToggled = false, currentDecodeMethod = DecodeMethodEnum.decimal }: SignTransactionsAdvancedDataDecodePropsType) {
  return (
    <div
      class={styles.signTransactionsAdvancedDataDecode}
      data-testid={DataTestIdsEnum.signTransactionsAdvancedDataDecode}
    >
      <div
        class={styles.signTransactionsAdvancedDataDecodeLabel}
        data-testid={DataTestIdsEnum.signTransactionsAdvancedDataDecodeLabel}
      >
        {currentDecodeMethod}
      </div>

      <Icon
        name="angle-down"
        class={classNames(styles.signTransactionsAdvancedDataDecodeIcon, {
          [styles.icon]: true,
          [styles.iconRotated]: isToggled,
        })}
      />
    </div>
  );
}

