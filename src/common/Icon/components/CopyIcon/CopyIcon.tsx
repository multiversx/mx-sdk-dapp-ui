import { h } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';

export const CopyIcon = (properties: JSXBase.IntrinsicElements['svg']) => (
  <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg" width="16" height="16" {...properties}>
    <path
      fill="currentColor"
      d="M384 0C419.3 0 448 28.7 448 64L448 320C448 355.3 419.3 384 384 384L192 384C156.7 384 128 355.3 128 320L128 119.4C128 102 135.1 85.3 147.7 73.2L205.4 17.8C217.3 6.4 233.2 0 249.7 0L384 0zM64 128C28.7 128 0 156.7 0 192L0 448C0 483.3 28.7 512 64 512L256 512C291.3 512 320 483.3 320 448L320 432L256 432L256 448L64 448L64 192L80 192L80 128L64 128z"
    />
  </svg>
);
