import { Component, Prop, h } from '@stencil/core';
import { getIconHtmlFromIconDefinition } from 'utils/icons/getIconHtmlFromIconDefinition';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  tag: 'fontawesome-icon',
  styleUrl: 'fontawesome-icon.css',
  shadow: true,
})
export class FontawesomeIcon {
  @Prop() class?: string = 'fontawesome-icon';
  @Prop() icon: IconDefinition;
  @Prop() description?: string;

  render() {
    if (!this.icon) {
      return null;
    }

    const iconHtml = getIconHtmlFromIconDefinition(this.icon);

    return <div class={this.class} innerHTML={iconHtml} title={this.description}></div>;
  }
}
