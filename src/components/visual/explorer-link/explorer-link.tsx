import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Component, Element, h, Prop, State } from '@stencil/core';
import { getIconHtmlFromIconDefinition } from 'utils/icons/getIconHtmlFromIconDefinition';
import { getIconHtmlFromIconName } from 'utils/icons/getIconHtmlFromIconName';

@Component({
  tag: 'mvx-explorer-link',
  styleUrl: 'explorer-link.css',
})
export class ExplorerLink {
  @Prop() class?: string;
  @Prop() iconClass?: string = 'explorer-link-icon';
  @Prop() dataTestId?: string;
  @Prop() icon?: IconDefinition | string;
  @Prop() link: string;
  @Prop() text?: string;

  @Element() hostElement: HTMLElement;
  @State() hasSlotContent: boolean = false;

  componentWillLoad() {
    this.hasSlotContent = !!this.hostElement.querySelector('[slot="content"]');
  }

  render() {
    let icon = 'faArrowUpRightFromSquare';

    if (this.icon) {
      icon = typeof this.icon === 'string' ? getIconHtmlFromIconName(this.icon) : getIconHtmlFromIconDefinition(this.icon);
    }

    return (
      <a data-testid={this.dataTestId} href={this.link} target="_blank" class={{ 'mvx:explorer-link': true, [this.class]: Boolean(this.class) }} rel="noreferrer">
        {this.hasSlotContent ? <slot name="content"></slot> : this.text ?? <mvx-fa-icon icon={icon} class={this.iconClass}></mvx-fa-icon>}
      </a>
    );
  }
}
