import { Component, Prop, h, State } from '@stencil/core';
import { faCheck, faCopy, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { copyToClipboard } from 'utils/copyToClipboard';

@Component({
  tag: 'copy-button',
  styleUrl: 'copy-button.css',
  shadow: true,
})
export class CopyButton {
  @Prop() class?: string = 'copy-button';
  @Prop() copyIcon: IconDefinition = faCopy;
  @Prop() successIcon: IconDefinition = faCheck;
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
        <fa-icon icon={this.isSuccess ? this.successIcon : this.copyIcon}></fa-icon>
      </a>
    );
  }
}
