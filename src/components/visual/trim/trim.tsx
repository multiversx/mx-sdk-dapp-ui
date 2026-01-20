import { Component, h, Prop } from '@stencil/core';
import { Trim as TrimComponent } from 'common/Trim/Trim';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

@Component({
  tag: 'mvx-trim',
  styleUrl: 'trim.scss',
  shadow: false,
})
export class Trim {
  @Prop({ attribute: 'data-testid' }) dataTestId?: string = DataTestIdsEnum.trim;
  @Prop() class?: string;
  @Prop() text: string;

  render() {
    return <TrimComponent class={this.class} data-testid={this.dataTestId} text={this.text} />;
  }
}
