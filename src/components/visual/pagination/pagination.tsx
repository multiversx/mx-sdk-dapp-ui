import { h } from '@stencil/core';
import { Icon } from 'common/Icon';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import { getPagination } from './helpers';
import styles from './pagination.styles';
import { PaginationEllipsisForm } from './components/PaginationEllipsisForm/PaginationEllipsisForm';
import { Tooltip } from 'common/Tooltip/Tooltip';
import { PaginationEllipsis } from './components/PaginationEllipsis/PaginationEllipsis';

export interface PaginationPropsType {
  currentPage: number;
  totalPages: number;
  isDisabled?: boolean;
  class?: string;
  onPageChange?: (page: number) => void;
  activeTooltipIndex?: number | null;
  isTooltipOpen?: boolean;
  onTooltipStatusChange?: (index: number | null, isOpen: boolean) => void;
  pageValue?: string;
  onPageValueChange?: (value: string) => void;
}

export function Pagination({ activeTooltipIndex = null, isTooltipOpen = false, onTooltipStatusChange, currentPage = 1, totalPages, isDisabled = false, class: className, onPageChange, pageValue = '', onPageValueChange }: PaginationPropsType) {
  const handleTooltipStatus = (index: number | null, isOpen: boolean) => {
    onTooltipStatusChange?.(index, isOpen);
  }

  const handlePageClick = (newPageIndex: number) => {
    if (newPageIndex === currentPage) {
      return;
    }
    onPageChange?.(newPageIndex);
  }

  const handleEdgePageClick = (pageToNavigateTo: number) => {
    return (event: MouseEvent) => {
      event.preventDefault();
      handlePageClick(pageToNavigateTo);
    };
  }

  const isCurrentPageActive = (paginationItem: string) => {
    return parseFloat(paginationItem) === currentPage;
  }

  const isInTheHundreds = (paginationItem: string) => {
    return parseFloat(paginationItem) && parseFloat(paginationItem) >= 100;
  }

  /**
   * Generates CSS classes for pagination edge buttons (previous/next)
   * @param isInactive - Whether the button should be inactive
   * @returns Object with CSS class mappings
   */

  const getPaginationEdgeButtonClasses = (isInactive: boolean) => {
    return {
      [styles.paginationEdgeButton]: true,
      [styles.paginationEdgeButtonDisabled]: isDisabled,
      [styles.paginationEdgeButtonInactive]: isInactive,
    };
  }

  /**
   * Generates CSS classes for pagination angle buttons (first/last)
   * @param isInactive - Whether the button should be inactive/disabled
   * @returns Object with CSS class mappings
   */

  const getPaginationAngleClasses = (isInactive: boolean) => {
    return {
      [styles.paginationAngle]: true,
      [styles.paginationAngleDisabled]: isDisabled,
      [styles.paginationAngleInactive]: isInactive,
    };
  }

  const isLeftToggleDisabled = currentPage === 1;
  const isRightToggleDisabled = currentPage === totalPages;
  const paginationItems = getPagination({ currentPage, totalPages });

  return (
    <div class={{ [styles.pagination]: true, [className]: Boolean(className) }}>
      <span
        onClick={handleEdgePageClick(1)}
        data-testid={DataTestIdsEnum.firstBtn}
        class={getPaginationAngleClasses(isLeftToggleDisabled)}
      >
        <Icon name="angles-left" class={styles.paginationAngleIcon} />
      </span>

      <div
        data-testid={DataTestIdsEnum.prevBtn}
        onClick={handleEdgePageClick(currentPage - 1)}
        class={getPaginationEdgeButtonClasses(isLeftToggleDisabled)}
      >
        <Icon name="angle-left" class={styles.paginationEdgeButtonIcon} />
      </div>

      <div class={styles.paginationItems}>
        {paginationItems.map((paginationItem, paginationItemIndex) => (
          <div
            class={{
              [styles.paginationItemWrapper]: true,
              [styles.paginationItemWrapperDisabled]: isDisabled,
            }}
          >
            {parseFloat(paginationItem) ? (
              <div
                onClick={() => handlePageClick(Number(paginationItem))}
                data-testid={`${DataTestIdsEnum.paginationItem}-${paginationItem}`}
                class={{
                  [styles.paginationItem]: true,
                  [styles.paginationItemBefore]: true,
                  [styles.paginationItemActive]: isCurrentPageActive(paginationItem),
                  [styles.paginationItemHundreds]: isInTheHundreds(paginationItem),
                }}
              >
                <span class={styles.paginationItemText}>{paginationItem}</span>
              </div>
            ) : (
              <Tooltip
                triggerOnClick
                isTooltipVisible={isTooltipOpen && activeTooltipIndex === paginationItemIndex}
                trigger={
                  <PaginationEllipsis
                    isActive={isTooltipOpen && activeTooltipIndex === paginationItemIndex}
                  />
                }
                onVisibilityChange={(isVisible: boolean) => {
                  handleTooltipStatus(paginationItemIndex, isVisible);
                }}
              >
                {!isDisabled && (
                  <PaginationEllipsisForm
                    isVisible={isTooltipOpen}
                    maxPageToSearchFor={totalPages}
                    pageValue={pageValue}
                    onPageValueChange={(value) => onPageValueChange?.(value)}
                    onSearch={(page) => handlePageClick(page)}
                  />
                )}
              </Tooltip>
            )}
          </div>
        ))}
      </div>

      <div
        data-testid={DataTestIdsEnum.nextBtn}
        onClick={handleEdgePageClick(currentPage + 1)}
        class={getPaginationEdgeButtonClasses(isRightToggleDisabled)}
      >
        <Icon name="angle-right" class={styles.paginationEdgeButtonIcon} />
      </div>

      <span
        data-testid={DataTestIdsEnum.lastBtn}
        onClick={handleEdgePageClick(totalPages)}
        class={getPaginationAngleClasses(isRightToggleDisabled)}
      >
        <Icon name="angles-right" class={styles.paginationAngleIcon} />
      </span>
    </div>
  );
}

