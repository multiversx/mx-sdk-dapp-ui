import { ELLIPSIS } from 'constants/htmlStrings';
import inRange from 'lodash.inrange';
import range from 'lodash.range';

import { MAX_PAGINATION_BATCH_LENGTH, MAX_PAGINATION_SLOTS, MIN_PAGINATION_BATCH_LENGTH } from './getPagination.constants';

interface GetPaginationType {
  currentPage: number;
  totalPages: number;
}

export const getPagination = ({ currentPage, totalPages }: GetPaginationType): string[] => {
  const trimBatch = (batch: number[], comparableBatch: number[]) => (batch.includes(currentPage) ? batch : batch.slice(0, MAX_PAGINATION_SLOTS - comparableBatch.length - 1));

  const previousPage = currentPage - 1;
  const nextPage = currentPage + 1;

  if (totalPages <= MAX_PAGINATION_SLOTS) {
    return range(1, totalPages + 1).map(paginationItem => String(paginationItem));
  }

  const isLeftBatchInRange = inRange(nextPage - 1, MIN_PAGINATION_BATCH_LENGTH, MAX_PAGINATION_BATCH_LENGTH);
  const isRightBatchInRange = inRange(previousPage + 1, totalPages - MIN_PAGINATION_BATCH_LENGTH, totalPages - 1);
  const leftBatch = isLeftBatchInRange ? range(1, nextPage + 1) : range(1, MAX_PAGINATION_BATCH_LENGTH - 1);
  const rightBatch = isRightBatchInRange ? range(previousPage, totalPages + 1) : range(totalPages - MIN_PAGINATION_BATCH_LENGTH + 1, totalPages + 1);

  const trimmedLeftBatch = trimBatch(leftBatch, rightBatch);
  const trimmedRightBatch = trimBatch(rightBatch.reverse(), leftBatch);
  const mergedEdgeBatches = trimmedLeftBatch.concat(trimmedRightBatch);
  const middleBatch = [ELLIPSIS, previousPage, currentPage, nextPage, ELLIPSIS];

  const [firstLeftBatchItem] = trimmedLeftBatch;
  const [firstRightBatchItem] = trimmedRightBatch;

  const paginationItems = mergedEdgeBatches.includes(currentPage)
    ? [...trimmedLeftBatch, ELLIPSIS, ...trimmedRightBatch.reverse()]
    : [firstLeftBatchItem, ...middleBatch, firstRightBatchItem];

  return paginationItems.map(paginationItem => String(paginationItem));
};
