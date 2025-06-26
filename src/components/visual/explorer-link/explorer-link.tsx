import { Component, Element, h, Prop, State } from '@stencil/core';
import classNames from 'classnames';

const explorerLinkClasses: Record<string, string> = {
  icon: 'mvx:flex mvx:justify-center mvx:transition-opacity mvx:duration-200 mvx:ease-in-out mvx:hover:opacity-80',
};

@Component({
  tag: 'mvx-explorer-link',
  styleUrl: 'explorer-link.scss',
  shadow: true,
})
export class ExplorerLink {
  @Prop() class?: string;
  @Prop() iconClass?: string;
  @Prop() dataTestId?: string;
  @Prop() link: string;

  @Element() hostElement: HTMLElement;
  @State() hasSlotContent: boolean = false;

  componentDidLoad() {
    this.hasSlotContent = this.hostElement.childNodes.length > 0;
  }

  render() {
    return (
      <a
        target="_blank"
        rel="noreferrer"
        href={this.link}
        data-testid={this.dataTestId}
        class={{ 'explorer-link': true, [this.class]: Boolean(this.class) }}
      >
        {this.hasSlotContent ? (
          <slot />
        ) : (
          <mvx-arrow-up-right-from-square-icon
            class={classNames('explorer-link-icon', {
              [explorerLinkClasses.icon]: true,
              [this.iconClass]: Boolean(this.iconClass),
            })}
          />
        )}
      </a>
    );
  }
}
