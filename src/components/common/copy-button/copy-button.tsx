import { Component, Prop, State, h } from '@stencil/core';
import { CopyButton as CopyButtonComponent } from 'common/CopyButton/CopyButton';
import { CopyButtonHandler } from 'common/CopyButton/CopyButtonHandler';

@Component({
  tag: 'mvx-copy-button',
  shadow: false,
})
export class CopyButton {
  @State() isSuccess: boolean = false;
  @Prop() iconClass?: string;
  @Prop() class?: string;
  @Prop() text: string;

  private handleClick = CopyButtonHandler({
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
