// .storybook/preview.tsx
import { defineCustomElements } from '../dist/web-components';

import '../src/global/style.css';
import '../src/global/variables.css';
import '../src/global/tailwind.css';

// Import Google Fonts for Storybook
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

/**
 * Registers all custom elements in the Storybook preview.
 * This is useful if your components rely on other nested Stencil components.
 */

defineCustomElements();
