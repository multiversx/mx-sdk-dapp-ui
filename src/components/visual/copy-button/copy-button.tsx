import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faCheck, faCopy } from '@fortawesome/free-solid-svg-icons';
import { Component, h, Prop, State } from '@stencil/core';
import classNames from 'classnames';
import { copyToClipboard } from 'utils/copyToClipboard';

@Component({
  tag: 'copy-button',
  styleUrl: 'copy-button.css',
  shadow: true,
})
export class CopyButton {
  @Prop() class?: string;
  @Prop() copyIcon?: IconDefinition;
  @Prop() successIcon?: IconDefinition;
  @Prop() text: string;

  @State() isSuccess: boolean = false;

  private timeoutId: number | undefined;

  private handleClick = async (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const trimmedText = this.text ? this.text.trim() : this.text;
    const success = await copyToClipboard(trimmedText);

    this.isSuccess = success;

    if (success) {
      this.timeoutId = window.setTimeout(() => {
        this.isSuccess = false;
      }, 1000);
    }
  };

  disconnectedCallback() {
    // Clear the timeout if the component is unmounted
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = undefined; // Reset the timeout ID
    }
  }

  render() {
    const copyIcon = this.copyIcon ?? faCopy;
    const successIcon = this.successIcon ?? faCheck;

    return (
      <a href="/#" class={classNames(this.class, 'copy-button')} onClick={this.handleClick}>
        <fa-icon icon={this.isSuccess ? successIcon : copyIcon}></fa-icon>
      </a>
    );
  }
}
