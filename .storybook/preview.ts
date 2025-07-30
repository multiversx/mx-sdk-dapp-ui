/** @jsx h */
import type { Preview, StencilRenderer, StoryContext } from '@stencil/storybook-plugin';
import { PartialStoryFn } from 'storybook/internal/csf';
import { h } from '@stencil/core';

import { defineCustomElements } from '../dist/web-components';

import '../src/global/variables.css';
import '../src/global/style.css';

defineCustomElements();

export const parameters: Preview['parameters'] = {
  backgrounds: {
    default: 'dark',
    options: {
      dark: { name: 'Dark', value: '#171717' },
      light: { name: 'Light', value: '#f3efed' },
    },
  },
};
