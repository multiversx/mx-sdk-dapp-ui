/** @jsx h */
import { h } from '@stencil/core';
import type { Preview } from '@storybook/web-components-vite';
import { renderJsxToHtml } from './jsxToHtml';

import { defineCustomElements } from '../dist/web-components';

import '../src/global/variables.css';
import './styles.css';
import './tailwind.css';

defineCustomElements();

export const decorators: Preview['decorators'] = [
  (Story, context) => {
    const vnode = (
      <div data-mvx-theme={`mvx:${context.globals.backgrounds.value}-theme`}>
        <Story />
      </div>
    );
    // Convert Stencil JSX vnode to HTML string for web-components renderer
    return renderJsxToHtml(vnode);
  },
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
