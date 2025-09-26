import type { EventEmitter } from '@stencil/core';
import { Component, Event, h, Prop, State, Watch } from '@stencil/core';
import { Icon } from 'common/Icon';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import { getPagination } from './helpers';
import styles from './pagination.styles';

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

  /**
   * Generates CSS classes for pagination edge buttons (previous/next)
   * @param isInactive - Whether the button should be inactive
   * @returns Object with CSS class mappings
   */

  private getPaginationEdgeButtonClasses(isInactive: boolean) {
    return {
      [styles.paginationEdgeButton]: true,
      [styles.paginationEdgeButtonDisabled]: this.isDisabled,
      [styles.paginationEdgeButtonInactive]: isInactive,
    };
  }

  /**
   * Generates CSS classes for pagination angle buttons (first/last)
   * @param isInactive - Whether the button should be inactive/disabled
   * @returns Object with CSS class mappings
   */

  private getPaginationAngleClasses(isInactive: boolean) {
    return {
      [styles.paginationAngle]: true,
      [styles.paginationAngleDisabled]: this.isDisabled,
      [styles.paginationAngleInactive]: isInactive,
    };
  }

  render() {
    const isLeftToggleDisabled = this.currentPageIndex === 1;
    const isRightToggleDisabled = this.currentPageIndex === this.totalPages;
    const paginationItems = getPagination({ currentPage: this.currentPageIndex, totalPages: this.totalPages });

    return (
      <div class={{ [styles.pagination]: true, [this.class]: Boolean(this.class) }}>
        <span
          onClick={this.handleEdgePageClick(1)}
          data-testid={DataTestIdsEnum.firstBtn}
          class={this.getPaginationAngleClasses(isLeftToggleDisabled)}
        >
          <Icon name="angles-left" class={styles.paginationAngleIcon} />
        </span>

        <div
          data-testid={DataTestIdsEnum.prevBtn}
          onClick={this.handleEdgePageClick(this.currentPageIndex - 1)}
          class={this.getPaginationEdgeButtonClasses(isLeftToggleDisabled)}
        >
          <Icon name="angle-left" class={styles.paginationEdgeButtonIcon} />
        </div>

        <div class={styles.paginationItems}>
          {paginationItems.map((paginationItem, paginationItemIndex) => (
            <div
              class={{
                [styles.paginationItemWrapper]: true,
                [styles.paginationItemWrapperDisabled]: this.isDisabled,
              }}
            >
              {parseFloat(paginationItem) ? (
                <div
                  onClick={() => this.handlePageClick(Number(paginationItem))}
                  data-testid={`${DataTestIdsEnum.paginationItem}-${paginationItem}`}
                  class={{
                    [styles.paginationItem]: true,
                    [styles.paginationItemBefore]: true,
                    [styles.paginationItemActive]: this.isCurrentPageActive(paginationItem),
                    [styles.paginationItemHundreds]: this.isInTheHundreds(paginationItem),
                  }}
                >
                  <span class={styles.paginationItemText}>{paginationItem}</span>
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
          data-testid={DataTestIdsEnum.nextBtn}
          onClick={this.handleEdgePageClick(this.currentPageIndex + 1)}
          class={this.getPaginationEdgeButtonClasses(isRightToggleDisabled)}
        >
          <Icon name="angle-right" class={styles.paginationEdgeButtonIcon} />
        </div>

        <span
          data-testid={DataTestIdsEnum.lastBtn}
          onClick={this.handleEdgePageClick(this.totalPages)}
          class={this.getPaginationAngleClasses(isRightToggleDisabled)}
        >
          <Icon name="angles-right" class={styles.paginationAngleIcon} />
        </span>
      </div>
    );
  }
}
