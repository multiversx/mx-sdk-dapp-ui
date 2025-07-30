import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Component, h, Prop, State } from '@stencil/core';
import { copyToClipboard } from 'utils/copyToClipboard';

@Component({
  tag: 'mvx-copy-button',
  styleUrl: 'copy-button.scss',
})
export class CopyButton {
  @Prop() class?: string = 'copy-button';
  @Prop() iconClass?: string = 'copy-button-icon';
  @Prop() copyIcon?: IconDefinition | string = 'faCopy';
  @Prop() successIcon?: IconDefinition | string = 'faCheck';
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
    return (
      <a href="/#" class={this.class} onClick={this.handleClick}>
        <mvx-fa-icon icon={this.isSuccess ? this.successIcon : this.copyIcon} class={this.iconClass}></mvx-fa-icon>
      </a>
    );
  }
}
