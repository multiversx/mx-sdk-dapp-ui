/** @jsx h */
import { h } from '@stencil/core';
import type { Preview } from '@storybook/html-vite';
import { renderJsxToHtml } from './jsxToHtml';

import { defineCustomElements } from '../dist/web-components';

import '../src/global/variables.css';
import './styles.css';
import './tailwind.css';

defineCustomElements();

const upgradeAddressTables = () => {
  if (typeof document === 'undefined') {
    return;
  }

  const elements = Array.from(
    document.querySelectorAll<HTMLElement>('mvx-address-table[data-account-screen-data]'),
  );

  elements.forEach(element => {
    const raw = element.getAttribute('data-account-screen-data');

    if (!raw) {
      return;
    }

    try {
      const parsed = JSON.parse(raw);
      (element as unknown as { accountScreenData?: unknown }).accountScreenData = parsed;
    } catch {
      // Ignore parse errors in Storybook only.
    }
  });
};

if (typeof window !== 'undefined' && 'MutationObserver' in window) {
  const observer = new MutationObserver(() => {
    upgradeAddressTables();
  });

  window.addEventListener('load', () => {
    upgradeAddressTables();
    observer.observe(document.documentElement, { childList: true, subtree: true });
  });
}

export const decorators: Preview['decorators'] = [
  (Story, context) =>
    renderJsxToHtml(
      <div data-mvx-theme={`mvx:${context.globals.backgrounds.value}-theme`}>
        <Story />
      </div>,
    ),
];

export const initialGlobals: Preview['initialGlobals'] = {
  backgrounds: { value: 'dark' },
};

export const parameters: Preview['parameters'] = {
  backgrounds: {
    default: 'dark',
    values: [
      { name: 'Dark', value: '#171717' },
      { name: 'Light', value: '#f3efed' },
    ],
  },
};
