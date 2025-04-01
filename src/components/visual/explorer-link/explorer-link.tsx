import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { Component, Element, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'mvx-explorer-link',
  styleUrl: 'explorer-link.css',
})
export class ExplorerLink {
  @Prop() class?: string = 'explorer-link';
  @Prop() iconClass?: string = 'explorer-link-icon';
  @Prop() dataTestId?: string;
  @Prop() icon?: IconDefinition;
  @Prop() link: string;
  @Prop() text?: string;

  @Element() hostElement: HTMLElement;
  @State() hasSlotContent: boolean = false;

  componentWillLoad() {
    this.hasSlotContent = !!this.hostElement.querySelector('[slot="content"]');
  }

  render() {
    return (
      <a data-testid={this.dataTestId} href={this.link} target="_blank" class={this.class} rel="noreferrer">
        {this.hasSlotContent ? <slot name="content"></slot> : this.text ?? <mvx-fa-icon icon={this.icon ?? faArrowUpRightFromSquare} class={this.iconClass}></mvx-fa-icon>}
      </a>
    );
  }
}
