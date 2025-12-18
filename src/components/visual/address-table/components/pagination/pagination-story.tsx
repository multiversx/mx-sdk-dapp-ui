import type { EventEmitter } from '@stencil/core';
import { Component, Event, h, Prop, State, Watch } from '@stencil/core';

import { Pagination } from './Pagination';

@Component({
  tag: 'mvx-pagination',
  styleUrl: 'pagination.scss',
  shadow: true,
})
export class PaginationComponent {
  @Prop() currentPage: number = 1;
  @Prop() totalPages: number;
  @Prop() isDisabled?: boolean = false;
  @Prop() class?: string;

  @Event({ bubbles: false, composed: false }) pageChange: EventEmitter<number>;
  @State() activeTooltipIndex: number | null = null;
  @State() isTooltipOpen: boolean = false;
  @State() currentPageIndex: number;
  @State() pageValue: string = '';

  @Watch('currentPage')
  watchCurrentPage(newValue: number) {
    if (newValue !== this.currentPageIndex) {
      this.currentPageIndex = newValue;
    }
  }

  componentWillLoad() {
    this.currentPageIndex = this.currentPage;
  }

  private handleTooltipStatus = (index: number | null, isOpen: boolean) => {
    this.activeTooltipIndex = index;
    this.isTooltipOpen = isOpen;
  };

  private handlePageClick = (newPageIndex: number) => {
    this.currentPageIndex = newPageIndex;
    this.pageChange.emit(newPageIndex);
  };

  private handlePageValueChange = (value: string) => {
    this.pageValue = value;
  };

  render() {
    return (
      <Pagination
        currentPage={this.currentPageIndex}
        totalPages={this.totalPages}
        isDisabled={this.isDisabled}
        class={this.class}
        onPageChange={this.handlePageClick}
        activeTooltipIndex={this.activeTooltipIndex}
        isTooltipOpen={this.isTooltipOpen}
        onTooltipStatusChange={this.handleTooltipStatus}
        pageValue={this.pageValue}
        onPageValueChange={this.handlePageValueChange}
      />
    );
  }
}
