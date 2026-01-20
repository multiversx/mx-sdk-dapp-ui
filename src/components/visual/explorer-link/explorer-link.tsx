import { Component, Element, h, Prop } from '@stencil/core';
import { ExplorerLink as ExplorerLinkComponent } from 'common/ExplorerLink/ExplorerLink';

@Component({
  tag: 'mvx-explorer-link',
  styleUrl: 'explorer-link.scss',
  shadow: false,
})
export class ExplorerLink {
  @Element() hostElement: HTMLElement;

  @Prop() class?: string;
  @Prop() iconClass?: string;
  @Prop() 'data-testid'?: string;
  @Prop() link: string;

  render() {
    return (
      <ExplorerLinkComponent
        class={this.class}
        iconClass={this.iconClass}
        data-testid={this['data-testid']}
        link={this.link}
        hasIcon={Boolean(this.hostElement)}
      />
    );
  }
}
