import './button.css';

import { h } from '@stencil/core';

export interface ButtonProps {
  /** Is this the principal call to action on the page? */
  primary?: boolean;
  /** What background color to use */
  backgroundColor?: string;
  /** How large should the button be? */
  size?: 'small' | 'medium' | 'large';
  /** Button contents */
  label: string;
  /** Optional click handler */
  onClick?: () => void;
}
/** Primary UI component for user interaction */
export const Button = ({ primary, backgroundColor, size, label }: ButtonProps) => {
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';

  return (
    <button
      type="button"
      class={['storybook-button', `storybook-button--${size || 'medium'}`, mode].join(' ')}
      style={{ backgroundColor }}
    >
      {label}
    </button>
  );
};
