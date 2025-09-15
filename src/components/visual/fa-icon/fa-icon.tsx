import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Component, h, Prop, State, Watch } from '@stencil/core';
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
  @State() private iconHtml?: string | null;

  async componentWillLoad() {
    await this.updateIconHtml(this.icon);
  }

  @Watch('icon')
  async onIconChange(newValue: IconDefinition | string) {
    await this.updateIconHtml(newValue);
  }

  private async updateIconHtml(icon: IconDefinition | string) {
    if (!icon) {
      this.iconHtml = null;
      return;
    }
    if (typeof icon === 'string') {
      this.iconHtml = await getIconHtmlFromIconName(icon);
      return;
    }
    this.iconHtml = getIconHtmlFromIconDefinition(icon);
  }

  render() {
    if (!this.icon) {
      return null;
    }

    return <i class={this.class} innerHTML={this.iconHtml} title={this.description}></i>;
  }
}
