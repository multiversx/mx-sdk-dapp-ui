import { h } from '@stencil/core';

const styles = {
  maximizeIcon: 'mvx:text-inherit',
} satisfies Record<string, string>;

export const MaximizeIcon = ({ class: className }: { class?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class={{ [styles.maximizeIcon]: true, [className]: Boolean(className) }}
  >
    <path
      d="M10 5.28125L14.2812 1H11C10.7188 1 10.5 0.78125 10.5 0.5C10.5 0.25 10.7188 0 11 0H15.5C15.75 0 16 0.25 16 0.5V5C16 5.28125 15.75 5.5 15.5 5.5C15.2188 5.5 15 5.28125 15 5V1.71875L10.7188 6C10.5312 6.1875 10.1875 6.1875 10 6C9.8125 5.8125 9.8125 5.46875 10 5.28125ZM6 10.7188L1.6875 15H5C5.25 15 5.5 15.25 5.5 15.5C5.5 15.7812 5.25 16 5 16H0.5C0.21875 16 0 15.7812 0 15.5V11C0 10.75 0.21875 10.5 0.5 10.5C0.75 10.5 1 10.75 1 11V14.3125L5.28125 10C5.46875 9.8125 5.8125 9.8125 6 10C6.1875 10.1875 6.1875 10.5312 6 10.7188Z"
      fill="white"
    />
  </svg>
);
