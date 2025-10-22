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
  @Prop() dataTestId?: string;
  @Prop() link: string;

  render() {
    return (
      <ExplorerLinkComponent
        class={this.class}
        iconClass={this.iconClass}
        dataTestId={this.dataTestId}
        link={this.link}
        hasNoChildren={Boolean(this.hostElement)}
      />
    );
  }
}
