import { Component, Prop, h } from '@stencil/core';
import { CopyButton as CopyButtonComponent } from 'common/CopyButton/CopyButton';

@Component({
  tag: 'mvx-copy-button',
  shadow: false,
})
export class CopyButton {
  @Prop() iconClass?: string;
  @Prop() class?: string;
  @Prop() text: string;


  render() {
    return (
      <CopyButtonComponent
        iconClass={this.iconClass}
        class={this.class}
        text={this.text}
      />
    );
  }
}
