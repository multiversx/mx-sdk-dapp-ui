import { Component, Prop, State, h } from '@stencil/core';
import { CopyButton as CopyButtonComponent } from 'common/CopyButton/CopyButton';
import { getCopyClickAction } from 'common/CopyButton/getCopyClickAction';

@Component({
  tag: 'mvx-copy-button',
  shadow: false,
})
export class CopyButton {
  @State() isSuccess: boolean = false;
  @Prop() iconClass?: string;
  @Prop() class?: string;
  @Prop() text: string;

  private handleClick = getCopyClickAction({
    onSuccessChange: (isSuccess) => (this.isSuccess = isSuccess),
  });

  render() {
    return (
      <CopyButtonComponent
        iconClass={this.iconClass}
        class={this.class}
        text={this.text}
        isSuccessOnCopy={this.isSuccess}
        handleCopyButtonClick={this.handleClick}
      />
    );
  }
}
