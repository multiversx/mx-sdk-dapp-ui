import { Component, Prop, h } from '@stencil/core';
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

  render() {
    const icon = getIconHtmlFromIconDefinition(this.icon ?? faArrowUpRightFromSquare);

    return (
      <a data-testid={this.dataTestId} href={this.link} target="_blank" class={this.class} rel="noreferrer">
        {this.text ?? <span innerHTML={icon}></span>}
      </a>
    );
  }
}
