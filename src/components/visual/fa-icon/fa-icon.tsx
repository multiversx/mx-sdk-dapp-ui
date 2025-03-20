import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Component, h, Prop } from '@stencil/core';
import classNames from 'classnames';
import { getIconHtmlFromIconDefinition } from 'utils/icons/getIconHtmlFromIconDefinition';
import { getIconHtmlFromIconName } from 'utils/icons/getIconHtmlFromIconName';

@Component({
  tag: 'fa-icon',
  styleUrl: 'fa-icon.css',
  shadow: false,
})
export class FaIcon {
  @Prop() class?: string;
  @Prop() icon: IconDefinition | string;
  @Prop() description?: string;

  render() {
    if (!this.icon) {
      return null;
    }

    const iconHtml = typeof this.icon === 'string' ? getIconHtmlFromIconName(this.icon) : getIconHtmlFromIconDefinition(this.icon);

    return <i class={classNames(this.class, 'fa-icon')} innerHTML={iconHtml} title={this.description}></i>;
  }
}
