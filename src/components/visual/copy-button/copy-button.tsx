import { Component, h, Prop, State } from '@stencil/core';
import classNames from 'classnames';
import { copyToClipboard } from 'utils/copyToClipboard';

// prettier-ignore
const styles = {
  copyButton: 'copy-button mvx:flex',
  copyButtonIcon: 'copy-button-icon mvx:flex mvx:cursor-pointer mvx:justify-center mvx:transition-opacity mvx:duration-200 mvx:ease-in-out mvx:hover:opacity-80',
} satisfies Record<string, string>;

@Component({
  tag: 'mvx-copy-button',
  styleUrl: 'copy-button.scss',
  shadow: false,
})
export class CopyButton {
  private timeoutId: number | null = null;

  @State() isSuccess: boolean = false;
  @Prop() iconClass?: string;
  @Prop() class?: string;
  @Prop() text: string;

  async handleClick(event: MouseEvent) {
    const trimmedText = this.text ? this.text.trim() : this.text;
    const success = await copyToClipboard(trimmedText);

    const setSuccessStateTo = (newSuccessState: boolean) => {
      this.isSuccess = newSuccessState;
    };

    event.preventDefault();
    event.stopPropagation();
    setSuccessStateTo(success);

    if (success) {
      this.timeoutId = window.setTimeout(() => setSuccessStateTo(false), 2000);
    }
  }

  disconnectedCallback() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  render() {
    return (
      <div
        onClick={this.handleClick.bind(this)}
        class={{
          'copy-button': true,
          [this.class]: Boolean(this.class),
        }}
      >
        {this.isSuccess ? (
          <mvx-check-icon
            class={classNames({
              'copy-button-icon': true,
              'check': true,
              [this.iconClass]: Boolean(this.iconClass),
            })}
          />
        ) : (
          <mvx-copy-icon
            class={classNames({
              'copy-button-icon': true,
              [this.iconClass]: Boolean(this.iconClass),
            })}
          />
        )}
      </div>
    );
  }
}
