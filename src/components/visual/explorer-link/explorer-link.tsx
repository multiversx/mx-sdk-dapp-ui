import { Component, Element, h, Prop } from '@stencil/core';
import classNames from 'classnames';

@Component({
  tag: 'mvx-explorer-link',
  styleUrl: 'explorer-link.scss',
  shadow: false,
})
export class ExplorerLink {
  @Prop() class?: string;
  @Prop() iconClass?: string;
  @Prop() dataTestId?: string;
  @Prop() link: string;

  @Element() hostElement: HTMLElement;

  render() {
    return (
      <a
        target="_blank"
        rel="noreferrer"
        href={this.link}
        data-testid={this.dataTestId}
        class={{ 'explorer-link': true, [this.class]: Boolean(this.class) }}
      >
        <slot>
          <mvx-arrow-up-right-from-square-icon
            class={classNames({
              'explorer-link-icon': true,
              [this.iconClass]: Boolean(this.iconClass),
            })}
          />
        </slot>
      </a>
    );
  }
}
