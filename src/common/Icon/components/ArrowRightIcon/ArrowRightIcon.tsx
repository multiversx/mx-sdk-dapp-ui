import { h } from '@stencil/core';

const styles = {
  arrowRightIcon: 'arrow-right-icon mvx:w-4 mvx:h-4 mvx:text-inherit',
} satisfies Record<string, string>;

export const ArrowRightIcon = ({ class: className }: { class?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    width="16"
    height="16"
    class={{ [styles.arrowRightIcon]: true, [className]: Boolean(className) }}
  >
    <path
      fill="currentColor"
      d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
    />
  </svg>
);
