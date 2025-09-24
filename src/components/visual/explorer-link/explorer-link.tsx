import { Component, Element, h, Prop } from '@stencil/core';
import classNames from 'classnames';

// prettier-ignore
const styles = {
  explorerLink: 'explorer-link mvx:decoration-0 mvx:flex',
  explorerLinkIcon: 'explorer-link-icon mvx:flex mvx:justify-center mvx:transition-opacity mvx:duration-200 mvx:ease-in-out mvx:hover:opacity-80 mvx:w-4 mvx:h-4'
} satisfies Record<string, string>;

@Component({
  tag: 'mvx-explorer-link',
  styleUrl: 'explorer-link.scss',
  shadow: false,
})
export class ExplorerLink {
  @Element() hostElement: HTMLElement;

  @Prop() class?: string;
  @Prop() iconClass?: string;
  @Prop() dataTestId?: string;
  @Prop() link: string;

  render() {
    return (
      <a
        target="_blank"
        rel="noreferrer"
        href={this.link}
        data-testid={this.dataTestId}
        class={{ [styles.explorerLink]: true, [this.class]: Boolean(this.class) }}
      >
        <slot>
          <mvx-arrow-up-right-from-square-icon
            class={classNames({
              [styles.explorerLinkIcon]: true,
              [this.iconClass]: Boolean(this.iconClass),
            })}
          />
        </slot>
      </a>
    );
  }
}
