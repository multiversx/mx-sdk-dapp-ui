import { Component, h, Prop } from '@stencil/core';
import { Trim as TrimComponent } from 'common/Trim/Trim';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

@Component({
  tag: 'mvx-trim',
  styleUrl: 'trim.scss',
  shadow: false,
})
export class Trim {
  @Prop() 'data-testid'?: string = DataTestIdsEnum.trim;
  @Prop() class?: string;
  @Prop() text: string;

  render() {
    return <TrimComponent class={this.class} data-testid={this['data-testid']} text={this.text} />;
  }
}
