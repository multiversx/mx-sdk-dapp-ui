import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Component, h, Prop } from '@stencil/core';
import { getIconHtmlFromIconDefinition } from 'utils/icons/getIconHtmlFromIconDefinition';
import { getIconHtmlFromIconName } from 'utils/icons/getIconHtmlFromIconName';

@Component({
  tag: 'mvx-fa-icon',
  styleUrl: 'fa-icon.scss',
})
export class FaIcon {
  @Prop() class?: string = 'fa-icon';
  @Prop() icon: IconDefinition | string;
  @Prop() description?: string;

  render() {
    if (!this.icon) {
      return null;
    }

    const iconHtml =
      typeof this.icon === 'string' ? getIconHtmlFromIconName(this.icon) : getIconHtmlFromIconDefinition(this.icon);

    return <i class={this.class} innerHTML={iconHtml} title={this.description}></i>;
  }
}
