import { Component, Prop, h } from '@stencil/core';
import { getIconHtmlFromIconDefinition } from 'utils/icons/getIconHtmlFromIconDefinition';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  tag: 'fa-icon',
  shadow: true,
})
export class FaIcon {
  @Prop() class?: string = 'fa-icon';
  @Prop() icon: IconDefinition;
  @Prop() description?: string;

  render() {
    if (!this.icon) {
      return null;
    }

    const iconHtml = getIconHtmlFromIconDefinition(this.icon);

    return <i class={this.class} innerHTML={iconHtml} title={this.description}></i>;
  }
}
