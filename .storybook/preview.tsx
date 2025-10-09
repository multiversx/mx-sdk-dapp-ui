import type { Preview } from '@storybook/web-components';
import { html } from 'lit';

import { defineCustomElements } from '../dist/web-components';

import '../src/global/variables.css';
import './styles.css';
import './tailwind.css';

defineCustomElements();

export const decorators: Preview['decorators'] = [
  (story, context) => {
    return html`
      <div data-mvx-theme="mvx:${context.globals.backgrounds.value}-theme">
        ${story()}
      </div>
    `;
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
