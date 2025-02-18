import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Component, h,Prop } from '@stencil/core';
import classNames from 'classnames';
import { getIconHtmlFromIconDefinition } from 'utils/icons/getIconHtmlFromIconDefinition';

@Component({
  tag: 'fa-icon',
  styleUrl: 'fa-icon.css',
  shadow: true,
})
export class FaIcon {
  @Prop() class?: string;
  @Prop() icon: IconDefinition;
  @Prop() description?: string;

  render() {
    if (!this.icon) {
      return null;
    }

    const iconHtml = getIconHtmlFromIconDefinition(this.icon);

    return <i class={classNames(this.class, 'fa-icon')} innerHTML={iconHtml} title={this.description}></i>;
  }
}
