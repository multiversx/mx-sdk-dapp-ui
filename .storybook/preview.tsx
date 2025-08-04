/** @jsx h */
import { h } from '@stencil/core';
import type { Preview } from '@stencil/storybook-plugin';

import { defineCustomElements } from '../dist/web-components';

import '../src/global/variables.css';
import './storybook-styles.css';

defineCustomElements();

export const decorators: Preview['decorators'] = [
  (Story, context) => (
    <div data-mvx-theme={`mvx:${context.globals.backgrounds.value}-theme`}>
      <Story />
    </div>
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
