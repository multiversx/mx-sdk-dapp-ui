import { Component, h, Prop } from '@stencil/core';
import { ELLIPSIS } from 'constants/htmlStrings';

@Component({
  tag: 'mvx-pagination-ellipsis',
  styleUrl: 'pagination-ellipsis.scss',
  shadow: true,
})
export class PaginationEllipsis {
  @Prop() isActive: boolean = false;

  render() {
    return <div class={{ 'pagination-ellipsis': true, 'active': this.isActive }}>{ELLIPSIS}</div>;
  }
}
