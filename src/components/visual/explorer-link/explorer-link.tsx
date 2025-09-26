import { Component, Element, h, Prop } from '@stencil/core';
import { Icon } from 'common/Icon';

// prettier-ignore
const styles = {
  explorerLink: 'explorer-link mvx:decoration-0 mvx:flex',
  explorerLinkIcon: 'explorer-link-icon mvx:flex mvx:justify-center mvx:transition-opacity mvx:duration-200 mvx:ease-in-out mvx:hover:opacity-80'
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
          <Icon
            name="arrow-up-right-from-square-icon"
            class={{ [styles.explorerLinkIcon]: true, [this.iconClass]: Boolean(this.iconClass) }}
          />
        </slot>
      </a>
    );
  }
}
