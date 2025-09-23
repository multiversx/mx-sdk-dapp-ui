import type { EventEmitter } from '@stencil/core';
import { Component, Event, h, Prop, State, Watch } from '@stencil/core';
import { Icon } from 'common/Icon';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import { getPagination } from './helpers';

// prettier-ignore
const styles = {
  pagination: 'pagination mvx:flex mvx:items-center mvx:gap-2 mvx:leading-none mvx:select-none mvx:justify-center mvx:text-base mvx:max-w-120',
  paginationAngle: 'pagination-angle mvx:hidden mvx:text-primary mvx:transition-all mvx:duration-200 mvx:ease-in-out mvx:cursor-pointer mvx:hover:text-accent mvx:mobile-lg:flex',
  paginationAngleDisabled: 'pagination-angle-disabled mvx:pointer-events-none mvx:text-secondary-text mvx:opacity-50',
  paginationAngleInactive: 'pagination-angle-inactive mvx:pointer-events-none mvx:text-secondary-text',
  paginationAngleIcon: 'pagination-angle-icon mvx:text-xs mvx:xxs:text-base mvx:xxs:leading-none',
  paginationEdgeButton: 'pagination-edge-button mvx:text-primary mvx:hidden mvx:gap-2 mvx:items-center mvx:cursor-pointer mvx:transition-all mvx:duration-200 mvx:ease-in-out mvx:hover:text-accent mvx:mobile-lg:p-0 mvx:mobile-lg:my-0 mvx:mobile-lg:mx-1 mvx:mobile-lg:flex',
  paginationEdgeButtonDisabled: 'pagination-edge-button-disabled mvx:pointer-events-none mvx:text-secondary-text mvx:opacity-50',
  paginationEdgeButtonInactive: 'pagination-edge-button-inactive mvx:pointer-events-none mvx:text-secondary-text',
  paginationEdgeButtonIcon: 'pagination-edge-button-icon mvx:transition-all mvx:duration-200 mvx:ease-in-out mvx:text-xs mvx:xxs:text-base',
  paginationItems: 'pagination-items mvx:flex mvx:gap-2 mvx:my-0 mvx:mx-1 mvx:items-center',
  paginationItemWrapper: 'pagination-item-wrapper mvx:cursor-pointer mvx:text-center mvx:h-7 mvx:w-7 mvx:flex mvx:items-center mvx:justify-center mvx:transition-all mvx:duration-200 mvx:ease-in-out mvx:md:h-8 mvx:md:w-8',
  paginationItemWrapperDisabled: 'pagination-item-wrapper-disabled mvx:pointer-events-none mvx:cursor-default mvx:opacity-50',
  paginationItem: 'pagination-item mvx:text-primary mvx:relative mvx:flex mvx:justify-center mvx:items-center mvx:py-2 mvx:px-0 mvx:text-center mvx:w-7 mvx:h-7 mvx:transition-colors mvx:duration-200 mvx:ease-in-out mvx:rounded mvx:text-xs mvx:hover:text-accent mvx:md:text-base mvx:md:h-8 mvx:md:w-8',
  paginationItemBefore: 'pagination-item-before mvx:before:absolute mvx:before:transition-all mvx:before:duration-200 mvx:before:ease-in-out mvx:before:pointer-events-none mvx:before:transform mvx:before:w-7 mvx:before:left-1/2 mvx:before:top-1/2 mvx:before:h-7 mvx:before:z-1 mvx:before:rounded-full mvx:before:opacity-20 mvx:before:-translate-y-1/2 mvx:before:-translate-x-1/2 mvx:before:bg-pagination-item mvx:hover:before:opacity-100 mvx:hover:before:bg-pagination-item-hover mvx:md:before:h-8 mvx:md:before:w-8',
  paginationItemActive: 'pagination-item-active mvx:text-accent mvx:before:opacity-100 mvx:before:bg-pagination-item-hover',
  paginationItemHundreds: 'pagination-item-hundreds mvx:text-tiny! mvx:md:text-xxs!',
  paginationItemText: 'pagination-item-text mvx:z-2 mvx:relative'
} satisfies Record<string, string>;

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
