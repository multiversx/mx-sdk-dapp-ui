import { h } from '@stencil/core';
import classNames from 'classnames';

// prettier-ignore
const styles = {
  paginationEllipsisForm: 'pagination-ellipsis-form mvx:cursor-default mvx:flex mvx:flex-col mvx:text-left',
  paginationEllipsisFormFieldLabel: 'pagination-ellipsis-form-field-label mvx:cursor-pointer mvx:mb-2 mvx:text-xs mvx:text-secondary-text',
  paginationEllipsisFormField: 'pagination-ellipsis-form-field mvx:relative mvx:gap-2 mvx:flex',
  paginationEllipsisFormFieldInput: 'pagination-ellipsis-form-field-input mvx:w-22 mvx:h-11 mvx:p-3 mvx:text-center mvx:transition-all mvx:duration-200 mvx:ease-in-out mvx:pr-10 mvx:m-0 mvx:border mvx:shadow-none mvx:text-base mvx:rounded-lg mvx:border-transparent mvx:appearance-none mvx:outline-none mvx:bg-surface mvx:text-primary mvx:focus:border-accent mvx:no-spinner',
  paginationEllipsisFormButton: 'pagination-ellipsis-form-button mvx:group mvx:leading-none mvx:h-8 mvx:right-1 mvx:absolute mvx:cursor-pointer mvx:flex mvx:top-1/2 mvx:text-xs mvx:outline-none mvx:border-none mvx:bg-transparent mvx:transform mvx:-translate-y-1/2 mvx:translate-x-0',
  paginationEllipsisFormButtonIconHover: 'pagination-ellipsis-form-button-icon-hover mvx:group-hover:fill-accent',
  paginationEllipsisFormButtonIcon: 'pagination-ellipsis-form-button-icon mvx:p-[10px] mvx:hover:!fill-teal-400'
} satisfies Record<string, string>;

interface PaginationEllipsisFormPropsType {
  maxPageToSearchFor: number;
  isVisible?: boolean;
  pageValue: string;
  onSearch: (page: number) => void;
  onPageValueChange: (value: string) => void;
}

export function PaginationEllipsisForm({
  maxPageToSearchFor,
  isVisible = false,
  pageValue = '',
  onSearch,
  onPageValueChange,
}: PaginationEllipsisFormPropsType) {
  const handleInputRef = (el: HTMLInputElement | null) => {
    if (el && isVisible) {
      el.focus();
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === 'Enter') {
      event.preventDefault();
      console.log('event', event);
      handleSubmit(event);
    }

    if (['Equal', 'Minus', 'Period', 'KeyE', 'Comma'].includes(event.code)) {
      event.preventDefault();
      return;
    }
  };

  const handleInput = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const isBelowMax = parseFloat(input.value) <= maxPageToSearchFor;

    if (isBelowMax) {
      onPageValueChange(input.value);
    } else {
      input.value = pageValue;
    }
  };

  const handleSubmit = (event: Event) => {
    if (!pageValue) {
      return;
    }

    event.preventDefault();
    onSearch(parseInt(pageValue === '0' ? '1' : pageValue));
  };

  return (
    <div class={styles.paginationEllipsisForm} onClick={(event: MouseEvent) => event.stopPropagation()}>
      <label htmlFor="paginationSearch" class={styles.paginationEllipsisFormFieldLabel}>
        Page
      </label>

      <div class={styles.paginationEllipsisFormField}>
        <input
          type="number"
          autoFocus={true}
          autoComplete="off"
          id="paginationSearch"
          value={pageValue}
          name="paginationSearch"
          onInput={handleInput}
          max={maxPageToSearchFor}
          onKeyDown={handleKeyDown}
          ref={handleInputRef}
          class={styles.paginationEllipsisFormFieldInput}
        />

        <div class={styles.paginationEllipsisFormButton} onClick={handleSubmit}>
          <mvx-magnifying-glass-icon
            class={classNames(styles.paginationEllipsisFormButtonIconHover, styles.paginationEllipsisFormButtonIcon)}
          />
        </div>
      </div>
    </div>
  );
}
