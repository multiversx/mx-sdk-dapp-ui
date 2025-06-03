import { Component, h, Prop } from '@stencil/core';
import classNames from 'classnames';
import { DecodeMethodEnum } from 'components/functional/sign-transactions-panel/sign-transactions-panel.types';

const signTransactionsAdvancedDataDecodeClasses: Record<string, string> = {
  icon: 'mvx:transition-all mvx:duration-200 mvx:ease-in-out mvx:relative mvx:h-3! mvx:w-auto!',
  iconRotated: 'mvx:rotate-90',
};

@Component({
  tag: 'mvx-sign-transactions-advanced-data-decode',
  styleUrl: 'sign-transactions-advanced-data-decode.scss',
  shadow: true,
})
export class SignTransactionsAdvancedDataDecode {
  @Prop() isToggled: boolean = false;
  @Prop() currentDecodeMethod: DecodeMethodEnum = DecodeMethodEnum.decimal;

  render() {
    return (
      <div class="sign-transactions-advanced-data-decode">
        <div class="sign-transactions-advanced-data-decode-label">{this.currentDecodeMethod}</div>

        <mvx-single-angle-down-icon
          class={classNames('sign-transactions-advanced-data-decode-icon', {
            [signTransactionsAdvancedDataDecodeClasses.icon]: true,
            [signTransactionsAdvancedDataDecodeClasses.iconRotated]: this.isToggled,
          })}
        />
      </div>
    );
  }
}
