import { Component, Prop, h, Element, State } from '@stencil/core';
import { getIconHtmlFromIconDefinition } from 'utils/icons/getIconHtmlFromIconDefinition';
import { IconDefinition, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  tag: 'explorer-link',
  styleUrl: 'explorer-link.css',
  shadow: true,
})
export class ExplorerLink {
  @Prop() class: string = 'explorer-link';
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
    const icon = getIconHtmlFromIconDefinition(this.icon ?? faArrowUpRightFromSquare);

    return (
      <a data-testid={this.dataTestId} href={this.link} target="_blank" class={this.class} rel="noreferrer">
        {this.hasSlotContent ? <slot name="content"></slot> : this.text ?? <span innerHTML={icon}></span>}
      </a>
    );
  }
}
