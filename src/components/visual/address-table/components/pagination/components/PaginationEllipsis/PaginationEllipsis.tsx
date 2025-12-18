import { h } from '@stencil/core';
import { ELLIPSIS } from 'constants/htmlStrings';

// prettier-ignore
const styles = {
  paginationEllipsis: 'pagination-ellipsis mvx:w-8 mvx:h-8 mvx:cursor-pointer mvx:flex mvx:items-center mvx:justify-center mvx:transition-all mvx:duration-200 mvx:rounded-full mvx:ease-in-out mvx:text-primary mvx:hover:bg-pagination-item-hover mvx:active:bg-pagination-item-hover',
  paginationEllipsisActive: 'pagination-ellipsis-active mvx:active:bg-pagination-item-hover'
} satisfies Record<string, string>;

interface PaginationEllipsisPropsType {
  isActive?: boolean;
}

export function PaginationEllipsis({ isActive = false }: PaginationEllipsisPropsType) {
  return (
    <div class={{ [styles.paginationEllipsis]: true, [styles.paginationEllipsisActive]: isActive }}>{ELLIPSIS}</div>
  );
}
