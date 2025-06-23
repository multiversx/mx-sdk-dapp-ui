import type { EventEmitter } from '@stencil/core';
import { Component, Event, h, Prop, State, Watch } from '@stencil/core';

import { getPagination } from './helpers';

@Component({
  tag: 'mvx-pagination',
  styleUrl: 'pagination.scss',
  shadow: true,
})
export class Pagination {
  @Prop() currentPage: number = 1;
  @Prop() totalPages: number;
  @Prop() isDisabled?: boolean = false;
  @Prop() class?: string;

  @Event({ bubbles: false, composed: false }) pageChange: EventEmitter<number>;
  @State() activeTooltipIndex: number | null = null;
  @State() isTooltipOpen: boolean = false;
  @State() currentPageIndex: number;

  @Watch('currentPage')
  watchCurrentPage(newValue: number) {
    if (newValue !== this.currentPageIndex) {
      this.currentPageIndex = newValue;
    }
  }

  private handleTooltipStatus(isOpen: boolean) {
    this.isTooltipOpen = isOpen;
  }

  private handlePageClick(newPageIndex: number) {
    if (newPageIndex === this.currentPageIndex) {
      return;
    }

    this.currentPageIndex = newPageIndex;
    this.pageChange.emit(newPageIndex);
  }

  private handleEdgePageClick(pageToNavigateTo: number) {
    return (event: MouseEvent) => {
      event.preventDefault();
      this.handlePageClick(pageToNavigateTo);
    };
  }

  private isCurrentPageActive(paginationItem: string) {
    return parseFloat(paginationItem) === this.currentPageIndex;
  }

  private isInTheHundreds(paginationItem: string) {
    return parseFloat(paginationItem) && parseFloat(paginationItem) >= 100;
  }

  componentWillLoad() {
    this.currentPageIndex = this.currentPage;
  }

  render() {
    const isLeftToggleDisabled = this.currentPageIndex === 1;
    const isRightToggleDisabled = this.currentPageIndex === this.totalPages;
    const paginationItems = getPagination({ currentPage: this.currentPageIndex, totalPages: this.totalPages });

    return (
      <div class={{ pagination: true, [this.class]: Boolean(this.class) }}>
        <span
          onClick={this.handleEdgePageClick(1)}
          class={{ 'pagination-angle': true, 'disabled': this.isDisabled, 'inactive': isLeftToggleDisabled }}
        >
          <mvx-angles-left-icon class="pagination-angle-icon" />
        </span>

        <div
          onClick={this.handleEdgePageClick(this.currentPageIndex - 1)}
          class={{ 'pagination-edge-button': true, 'disabled': this.isDisabled, 'inactive': isLeftToggleDisabled }}
        >
          <mvx-single-angle-left-icon class="pagination-edge-button-icon" />
        </div>

        <div class="pagination-items">
          {paginationItems.map((paginationItem, paginationItemIndex) => (
            <div class={{ 'pagination-item-wrapper': true, 'disabled': this.isDisabled }}>
              {parseFloat(paginationItem) ? (
                <div
                  onClick={() => this.handlePageClick(Number(paginationItem))}
                  class={{
                    'pagination-item': true,
                    'active': this.isCurrentPageActive(paginationItem),
                    'hundreds': this.isInTheHundreds(paginationItem),
                  }}
                >
                  <span class="pagination-item-text">{paginationItem}</span>
                </div>
              ) : (
                <mvx-tooltip
                  triggerOnClick
                  trigger={
                    <mvx-pagination-ellipsis
                      isActive={this.isTooltipOpen && this.activeTooltipIndex === paginationItemIndex}
                    />
                  }
                  onTriggerRender={(event: CustomEvent) => {
                    this.activeTooltipIndex = paginationItemIndex;
                    this.handleTooltipStatus(event.detail);
                  }}
                >
                  {!this.isDisabled && (
                    <mvx-pagination-ellipsis-form
                      isVisible={this.isTooltipOpen}
                      maxPageToSearchFor={this.totalPages}
                      onSearch={(event: CustomEvent) => this.handlePageClick(event.detail)}
                    />
                  )}
                </mvx-tooltip>
              )}
            </div>
          ))}
        </div>

        <div
          onClick={this.handleEdgePageClick(this.currentPageIndex + 1)}
          class={{ 'pagination-edge-button': true, 'disabled': this.isDisabled, 'inactive': isRightToggleDisabled }}
        >
          <mvx-single-angle-right-icon class="pagination-edge-button-icon" />
        </div>

        <span
          onClick={this.handleEdgePageClick(this.totalPages)}
          class={{ 'pagination-angle': true, 'disabled': this.isDisabled, 'inactive': isRightToggleDisabled }}
        >
          <mvx-angles-right-icon class="pagination-angle-icon" />
        </span>
      </div>
    );
  }
}
